import streamlit as st

class EditArtistView:
    def __init__(self, get_artist_func, update_artist_func):
        st.subheader("Edit Artist")

        query_params = st.query_params
        artist_id = query_params.get('id')

        if not artist_id:
            st.error('No artist selected, select artist to continue')
            return

        artist = get_artist_func(artist_id)

        if artist is None:
            st.error("Artist not found.")
            return

        # Initialize session state with artist details
        if 'name' not in st.session_state:
            st.session_state.name = artist.name
        if 'bio' not in st.session_state:
            st.session_state.bio = artist.bio
        if 'votes' not in st.session_state:
            st.session_state.votes = artist.votes
        if 'update_success' not in st.session_state:
            st.session_state.update_success = False

        name = st.text_input("Artist Name", value=st.session_state.name)
        bio = st.text_area("Bio", value=st.session_state.bio)
        votes = st.number_input("Votes", min_value=0, step=1, value=st.session_state.votes)
        file_image = st.file_uploader("Image: ", type=["jpg", "jpeg", "png", "webp"], key="file_image")

        if not st.session_state.update_success:
            if st.button("Update Artist"):
                if name and bio:
                    with st.spinner("Updating..."):
                        try:
                            artist.name = name
                            artist.bio = bio
                            artist.votes = votes

                            # Handling image file
                            did_update = update_artist_func(artist, file_image)

                            if did_update:
                                st.session_state.update_success = True
                                st.success("Artist updated successfully!")

                        except Exception as e:
                            st.error(f"Error updating artist: {e}")
                else:
                    st.warning("Please fill out all fields!")
