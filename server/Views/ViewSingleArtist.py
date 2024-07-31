import streamlit as st
from typing import Callable, Optional
# from .components.card import create_card


class ViewSingleArtist:
    def __init__(self, get_single_artist_func, message: Optional[str] = None, message_type: Optional[str] = None):
        self.artist = get_single_artist_func

        # Display the optional message if provided
        if message:
            if message_type == "success":
                st.success(message)
            elif message_type == "warning":
                st.warning(message)
            elif message_type == "error":
                st.error(message)

        self.display_artist_details()

    def display_artist_details(self):
        st.subheader(f"Artist Details: {self.artist.name}")
        
        # create_card(self.artist.image_url, self.artist.name,
        #             self.artist.bio, key={self.artist.name})

    def delete_artist(self):
        pass

    def update_view(self):
        pass
