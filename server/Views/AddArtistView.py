import streamlit as st


class AddArtistView:
    def __init__(self, add_artist_func):
        st.subheader("Add New Artist")
        self.add_artist_func = add_artist_func

        st.session_state.name = ""
        st.session_state.bio = ""
        st.session_state.votes = 0
        st.session_state.redirect = False

        name = st.text_input("Artist Name", value=st.session_state.name)
        bio = st.text_area("Bio", value=st.session_state.bio)
        votes = st.number_input("Votes", min_value=0,
                                step=1, value=st.session_state.votes)
        file_image = st.file_uploader(
            "Image: ", type=["jpg", "jpeg", "png", "webp"], key="file_image")

        if st.button("Add Artist"):
            if name and bio and file_image:
                with st.spinner("Uploading..."):
                    self.add_artist(name, file_image, bio, votes)
            else:
                st.warning("Please fill out all fields!")

        if st.session_state.redirect:
            st.session_state.redirect = False
            st.rerun()

    def add_artist(self, name, file_image, bio, votes):
        if self.add_artist_func(name, file_image, bio, votes):
            st.query_params.from_dict({
                "page": "Success Page",
                "message": "Artist successfully added"
            })
            st.session_state.page = "Success Page"
            st.rerun()
        else:
            st.error("Failed to add the artist")
