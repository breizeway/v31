from flask import Blueprint, jsonify, request

from app.requests import media_db


media_routes = Blueprint('media', __name__)


@media_routes.route('/<int:id>')
def get(id):
    film = media_db.get(resource_id=id)
    return film


@media_routes.route('/search')
def search():
    args = request.args

    if 'query' in args:
        query = args['query']
    else:
        return

    searched = media_db.search(query=query)
    return searched


@media_routes.route('/config')
def config():
    return media_db.config()
