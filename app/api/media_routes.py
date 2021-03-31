from flask import Blueprint, jsonify, request

from app.requests import tmdb


media_routes = Blueprint('media', __name__)


@media_routes.route('/search')
def search():
    args = request.args
    print('   :::ARGS:::   ', args)
