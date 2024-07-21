import streamlit as st
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Streamlit UI
st.title("Admin Page")
st.header("Manage Artists")

# Function to add a new artist to Firestore


def add_artist(name, image_url, bio, votes):
    artist_data = {
        "name": name,
        "image_url": image_url,
        "bio": bio,
        "votes": votes
    }
    db.collection("artists").add(artist_data)
    st.success("Artist added successfully")


# Fetch and display artists
artists_ref = db.collection("artists")
artists = artists_ref.stream()

st.subheader("Artists List")
for artist in artists:
    artist_data = artist.to_dict()
    st.subheader(artist_data["name"])
    st.image(artist_data["image_url"], width=50)
    st.write(artist_data["bio"])
    st.write(f"Votes: {artist_data['votes']}")

# Form to add a new artist
st.subheader("Add New Artist")
with st.form(key='add_artist_form'):
    name = st.text_input("Artist Name")
    image_url = st.text_input("Image URL")
    bio = st.text_area("Bio")
    votes = st.number_input("Votes", min_value=0)
    submit_button = st.form_submit_button(label="Add Artist")

    if submit_button:
        add_artist(name, image_url, bio, votes)

# Function to update artist's votes


def update_votes(artist_id, votes):
    artist_ref = db.collection("artists").document(artist_id)
    artist_ref.update({"votes": votes})
    st.success("Votes updated successfully")


# Update artist votes
st.subheader("Update Artist Votes")
artists = artists_ref.stream()
artist_ids = {artist.id: artist.to_dict()["name"] for artist in artists}
artist_id_to_update = st.selectbox("Select Artist to Update", list(
    artist_ids.keys()), format_func=lambda x: artist_ids[x])
new_votes = st.number_input("New Votes", min_value=0)
update_button = st.button("Update Votes")

if update_button:
    update_votes(artist_id_to_update, new_votes)
