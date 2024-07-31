import firebase_admin
from firebase_admin import credentials, firestore, storage
from Models import Artist
import os


class API:
    def __init__(self, config=None) -> None:
        # Define the path to the Firebase service account key
        cred_path = 'secrets/serviceAccountKey.json'
        if not os.path.exists(cred_path):
            raise ValueError(
                "ERROR: Service account key file not found at 'secrets/serviceAccountKey.json'")

        # Check if Firebase is already initialized
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'artist-awards.appspot.com'
            })

        self.db = firestore.client()
        self.bucket = storage.bucket()

    def add_artist(self, artist: Artist):
        artist_data = artist.to_dict()
        self.db.collection("artists").add(artist_data)
        return True

    def get_artists(self):
        artists_ref = self.db.collection("artists")
        artists = artists_ref.stream()
        return [Artist.from_dict(artist.to_dict(), artist.id) for artist in artists]

    def update_votes(self, artist_id: str, votes: int) -> bool:
        artist_ref = self.db.collection("artists").document(artist_id)
        artist_ref.update({"votes": votes})
        return True

    def upload_image(self, image_file):
        image_blob = self.bucket.blob(f"artists/{image_file.name}")
        image_blob.upload_from_file(image_file, content_type=image_file.type)

        image_blob.make_public()
        image_url = image_blob.public_url
        return image_url

    def delete_artist(self, artist_id: str) -> bool:
        try:
            artist_ref = self.db.collection("artists").document(artist_id)
            artist_ref.delete()
            return True

        except Exception as e:
            print(f"An error occurred while deleting the artist: {e}")
            return False

    def get_single_artist(self, artist_id: str):
        try:
            artist_ref = self.db.collection("artists").document(artist_id)
            artist = artist_ref.get()
            if artist.exists:
                return Artist.from_dict(artist.to_dict(), artist.id)
            else:
                return None
        except Exception as e:
            print(f"An error occurred while retrieving the artist: {e}")
            return None

    def update_artist(self, artist) -> bool:
        try:
            artist_ref = self.db.collection("artists").document(artist.id)
            if not artist_ref.get().exists:
                return False

            artist_data = artist.to_dict()
            artist_ref.update(artist_data)
            return True

        except Exception as e:
            print(f"An error occurred while updating the artist: {e}")
            return False
