import streamlit as st
from Views import ArtistsListView, AddArtistView, EditArtistView
from Controller import add_artist, get_artists, delete_artist, get_single_artist, update_artist

# Initialize session state if not already done
if 'page' not in st.session_state:
    st.session_state.page = 'Main Page'


def main_page():
    st.title('Main Page')
    st.write('Welcome to the Main Page!')
    ArtistsListView(get_artists, delete_artist)


def run_add_artist():
    AddArtistView(add_artist)


def run_artist_list():
    ArtistsListView(get_artists, delete_artist)


def run_edit_artist():
    EditArtistView(get_single_artist, update_artist)


# Define page mapping
page_functions = {
    'Main Page': main_page,
    'Add Artist': run_add_artist,
    'Artists List': run_artist_list,
    "Edit Artist": run_edit_artist
}


def main():
    st.sidebar.subheader('Page selection')

    for i, page_name in enumerate(page_functions.keys()):
        if st.sidebar.button(page_name, key=f'button_{i}'):
            st.session_state.page = page_name
            st.query_params.update({"page": page_name})

    # Display the selected page
    page_functions[st.session_state.page]()


if __name__ == '__main__':
    main()
