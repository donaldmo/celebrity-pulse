import streamlit as st
from typing import Optional


class SuccessView:
    def __init__(self):
        st.subheader("Success...")
        query_params = st.query_params
        message = query_params.get('message')
        st.success(message)