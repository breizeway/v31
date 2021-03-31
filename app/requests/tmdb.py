import requests
import os


token = os.environ.get('TMDB_TOKEN')
base_url = 'https://api.themoviedb.org/3'


def get(resource_id, resource='movie'):
    resource_fragment = f'/{resource}'
    resource_id_fragment = f'/{resource_id}'

    url = f'{base_url}{resource_fragment}{resource_id_fragment}'
    headers = {'authorization': f'Bearer {token}',
               'content-type': 'application/json;charset=utf-8'}

    response = requests.get(url, headers=headers)

    print('   :::RESPONSE.JSON:::   ', response.json())
    return response.json()


def search(query, resource='movie'):
    resource_fragment = f'/{resource}'
    query_fragment = f''

    url = f'{base_url}/search{resource_fragment}?query={query}'
    headers = {'authorization': f'Bearer {token}',
               'content-type': 'application/json;charset=utf-8'}

    response = requests.get(url, headers=headers)

    print('   :::RESPONSE.JSON:::   ', response.json())
    return response.json()
