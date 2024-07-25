import streamlit as st
from typing import Callable


class ArtistsListView:
    def __init__(self, get_artists_func: Callable[[], list]):
        st.subheader("Artists List")
        artists = get_artists_func()

        for artist in artists:
            st.subheader(artist.name)
            st.image(artist.image_url, width=50)
            st.write(artist.bio)
            st.write(f"Votes: {artist.votes}")