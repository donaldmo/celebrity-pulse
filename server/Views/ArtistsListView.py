import streamlit as st
from typing import Callable, Optional


class ArtistsListView:
    def __init__(self, get_artists_func: Callable[[], list], delete_artists_func: Callable[[str], bool], message: Optional[str] = None, message_type: Optional[str] = None):
        st.subheader("Artists List")
        self.artists = get_artists_func()
        self.delete_artists_func = delete_artists_func
        self.get_artists_func = get_artists_func

        # Display the optional message if provided
        if message:
            if message_type == "success":
                st.success(message)
            elif message_type == "warning":
                st.warning(message)
            elif message_type == "error":
                st.error(message)

        if not self.artists:
            st.info("No artists available. Please add a new artist.")

        self.display_artists_list()

    def display_artists_list(self):
        for idx, artist in enumerate(self.artists):
            cols = st.columns([1, 3, 5, 2, 2, 2])

            cols[0].image(artist.image_url, width=50)
            cols[1].write(artist.name)
            cols[2].write(artist.bio)
            cols[3].write(f"Votes: {artist.votes}")

            if cols[4].button("Edit", key=f"update_{idx}"):
                st.query_params.from_dict({"page": "Edit Artist", "id": artist.id})
                st.session_state.page = "Edit Artist"
                st.rerun()

            if cols[5].button("Delete", key=f"delete_{idx}"):
                self.delete_artist(idx, artist.id)

    def delete_artist(self, idx: int, artist_id: str):
        if self.delete_artists_func(artist_id):
            st.query_params.from_dict({"page": "Success Page", "message": "Artist successfully deleted"})
            st.session_state.page = "Success Page"
            st.rerun()
        else:
            st.error("Failed to delete the artist")
