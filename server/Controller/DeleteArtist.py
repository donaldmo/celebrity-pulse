from API import api_instance


def delete_artist(artist_id: str) -> bool:
    return api_instance.delete_artist(artist_id)
