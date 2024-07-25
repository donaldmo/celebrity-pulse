from API import api_instance

def update_votes(artist_id: str, votes: int) -> bool:
    return api_instance.update_votes(artist_id, votes)
