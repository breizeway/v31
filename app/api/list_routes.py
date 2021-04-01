from flask import Blueprint, jsonify, session, request
from flask_login import current_user

from app.models import List, db
from app.requests import tmdb


list_routes = Blueprint('lists', __name__)
# user_id = current_user.to_dict().id


@list_routes.route('/next/<int:num>')
def get_next_lists(num):
    lists = List.query.order_by(List.start_date).limit(num).all()
    lists_list = [lst.to_dict() for lst in lists]
    return {'lists': lists_list}


@list_routes.route('/<int:list_id>')
def get_list(list_id):
    lst = List.query.get(list_id)
    list_dict = lst.to_dict()
    print('   :::LST:::   ', list_dict)
    return list_dict
