from API import api_instance
from Models import Artist
from firebase_admin import firestore


def add_artist(name: str, image_url, bio: str, votes: int) -> bool:
    image_url = api_instance.upload_image(image_url)

    artist = Artist(
        id="",
        name=name,
        image_url=image_url,
        bio=bio,
        votes=votes
    )
    return api_instance.add_artist(artist)
