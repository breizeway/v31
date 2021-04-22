from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.models import User


user_routes = Blueprint('users', __name__)


@user_routes.route('/by_id', methods=['PUT'])
def user_by_id():
    id = request.json['id']

    user = User.query.get(id)
    user_dict = user.to_public_dict()
    print('   :::USER_DICT:::   ', user_dict)
    return user_dict


@user_routes.route('/by_username', methods=['PUT'])
def user_by_username():
    username = request.json['username']

    user = User.query.filter(User.username == username).first()
    user_dict = user.to_public_dict()
    print('   :::USER_DICT:::   ', user_dict)
    return user_dict
