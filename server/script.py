import streamlit as st
from PIL import Image
from io import BytesIO
import firebase_admin
from firebase_admin import credentials, firestore, storage
import time

# Initialize Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'artist-awards.appspot.com'
    })

db = firestore.client()
bucket = storage.bucket()

st.title("Add New Artist")

name = st.text_input("Name", "")
bio = st.text_area("Bio", "")
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if st.button("Add Artist"):
    if name and bio and uploaded_file:
        with st.spinner("Uploading..."):
            try:
                # Upload image to Firebase Storage
                image_blob = bucket.blob(f"artists/{uploaded_file.name}")
                image_blob.upload_from_file(uploaded_file, content_type=uploaded_file.type)
                
                # Make the image publicly accessible
                image_blob.make_public()
                
                # Get the public URL
                image_url = image_blob.public_url

                # Add artist data to Firestore
                artist_data = {
                    "name": name,
                    "bio": bio,
                    "image_url": image_url,
                    "votes": 0,
                    "timestamp": firestore.SERVER_TIMESTAMP
                }
                db.collection("artists").add(artist_data)
                
                st.success("Artist added successfully!")
            except Exception as e:
                st.error(f"Error adding artist: {e}")
    else:
        st.warning("Please fill out all fields and upload an image.")