import streamlit as st


class EditArtistView:
    def __init__(self, get_artist_func, update_artist_func):
        st.subheader("Edit Artist")

        self.update_artist_func = update_artist_func
        query_params = st.query_params
        artist_id = query_params.get('id')

        if not artist_id:
            st.error('No artist selected, select artist to continue')
            return

        artist = get_artist_func(artist_id)

        if artist is None:
            st.error("Artist not found.")
            return

        st.session_state.name = artist.name
        st.session_state.bio = artist.bio
        st.session_state.votes = artist.votes
        st.session_state.page_updated = False

        with st.form(key='edit_artist_form'):
            name = st.text_input("Artist Name", value=st.session_state.name)
            bio = st.text_area("Bio", value=st.session_state.bio)
            votes = st.number_input(
                "Votes", min_value=0, step=1, value=st.session_state.votes)
            file_image = st.file_uploader(
                "Image: ", type=["jpg", "jpeg", "png", "webp"], key="file_image")

            artist.name = name
            artist.bio = bio
            artist.votes = votes

            if st.form_submit_button("Update"):
                if name:
                    with st.spinner("Updating..."):
                        self.update_artist(artist, file_image)
                else:
                    st.warning("Please fill at least the name")

    def update_artist(self, artist, file_image):
        if self.update_artist_func(artist, file_image):
            st.query_params.from_dict({
                "page": "Success Page",
                "message": "Artist successfully updated"
            })
            st.session_state.page = "Success Page"
            st.rerun()
        else:
            st.error("Failed to update the artist")
