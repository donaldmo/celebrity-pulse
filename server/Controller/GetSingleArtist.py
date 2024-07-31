from API import api_instance


def get_single_artist(artist_id: str) -> bool:
    return api_instance.get_single_artist(artist_id)
