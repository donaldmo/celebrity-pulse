import streamlit as st
from Views import ArtistsListView, AddArtistView
from Controller import add_artist, get_artists, update_votes

# Initialize session state if not already done
if 'page' not in st.session_state:
    st.session_state.page = 'Main Page'

# Define page functions
def main_page():
    st.title('Main Page')
    st.write('Welcome to the Main Page!')

def run_add_artist():
    AddArtistView(add_artist)

def run_artist_list():
    ArtistsListView(get_artists)

# Define page mapping
page_functions = {
    'Main Page': main_page,
    'Add Artist': run_add_artist,
    'Artists List': run_artist_list
}

def main():
    st.sidebar.subheader('Page selection')
    
    # Sidebar navigation buttons with unique keys
    for i, page_name in enumerate(page_functions.keys()):
        if st.sidebar.button(page_name, key=f'button_{i}'):
            st.session_state.page = page_name
            st.experimental_rerun()
    
    # Display the selected page
    page_functions[st.session_state.page]()

if __name__ == '__main__':
    main()
