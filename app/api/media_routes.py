from flask import Blueprint, jsonify, request

from app.requests import tmdb


media_routes = Blueprint('media', __name__)


@media_routes.route('/<int:id>')
def get(id):
    film = tmdb.get(resource_id=id)
    return film


@media_routes.route('/search')
def search():
    args = request.args

    if 'query' in args:
        query = args['query']
    else:
        return

    searched = tmdb.search(query=query)
    print('   :::SEARCHED:::   ', searched)
    return searched
