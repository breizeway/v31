import requests

from .meta import Meta


def get(resource_id, resource='movie'):
    resource_fragment = f'/{resource}'
    resource_id_fragment = f'/{resource_id}'

    url = f'{Meta.base_url}{resource_fragment}{resource_id_fragment}'
    headers = {'authorization': f'Bearer {Meta.token}',
               'content-type': 'application/json;charset=utf-8'}

    response = requests.get(url, headers=headers)
    json = response.json()
    json['secure_image_base_url'] = Meta.secure_image_base_url[0]
    return json


def search(query, resource='movie'):
    resource_fragment = f'/{resource}'
    query_fragment = f''

    url = f'{Meta.base_url}/search{resource_fragment}?query={query}'
    headers = {'authorization': f'Bearer {Meta.token}',
               'content-type': 'application/json;charset=utf-8'}

    response = requests.get(url, headers=headers)
    json = response.json()
    json['secure_image_base_url'] = Meta.secure_image_base_url[0]
    return json


def config():
    url = f'{Meta.base_url}/configuration'
    headers = {'authorization': f'Bearer {Meta.token}',
               'content-type': 'application/json;charset=utf-8'}

    response = requests.get(url, headers=headers)
    print('   :::CONFIG:::   ', response.json())
