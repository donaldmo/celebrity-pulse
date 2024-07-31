import streamlit as st

# Function to create a card
def create_card(image_url, name, bio, key):
    with st.container():
        # Card Image
        st.image(image_url, width=150)
        
        # Name and Edit Button Row
        cols = st.columns([3, 1])
        with cols[0]:
            st.subheader(name)
        with cols[1]:
            st.button("Edit", key=key)
        
        # Bio Section
        st.write("### Bio")
        st.write(bio)
    
    # Add some space between cards
    st.write("---")

# Card 1
create_card(
    "https://via.placeholder.com/150",
    "John Doe",
    "This is a long bio text that takes the full width of the card. You can write anything here to describe the person, their background, interests, or anything relevant.",
    key="edit_john_doe"
)

# Card 2
create_card(
    "https://via.placeholder.com/150",
    "Jane Smith",
    "This is another long bio text for a different person. The layout remains consistent for each card to maintain a uniform appearance.",
    key="edit_jane_smith"
)
