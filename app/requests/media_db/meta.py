import os


class Meta:
    token = os.environ.get('TMDB_TOKEN')
    base_url = 'https://api.themoviedb.org/3'
    image_base_url = 'http://image.tmdb.org/t/p/',
    secure_image_base_url = 'https://image.tmdb.org/t/p/',
