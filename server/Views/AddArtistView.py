import streamlit as st


class AddArtistView:
    def __init__(self, add_artist_func):
        st.subheader("Add New Artist")

        name = st.text_input("Artist Name")
        bio = st.text_area("Bio")
        votes = st.number_input("Votes", min_value=0, step=1)
        file_image = st.file_uploader("Image: ", type=["jpg", "jpeg", "png"])

        if st.button("Add Artist"):
            if name and bio and file_image:
                with st.spinner("Uploading..."):
                    try:
                        did_add = add_artist_func(
                            name,
                            file_image,
                            bio,
                            votes
                        )

                        if did_add:
                            st.success("Artist added successfully!")

                    except Exception as e:
                        st.error(f"Error adding artist: {e}")
            else:
                st.warning("Please fill out all fields !")
