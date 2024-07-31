from API import api_instance


def update_artist(artist, file_image=None) -> bool:
    if file_image:
        image_url = api_instance.upload_image(file_image)
        artist.image_url = image_url

    return api_instance.update_artist(artist)
