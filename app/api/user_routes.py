from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.models import db, User, Follow


user_routes = Blueprint('users', __name__)


@user_routes.route('/by_id', methods=['PUT'])
def user_by_id():
    id = request.json['id']

    user = User.query.get(id)
    user_dict = user.to_public_dict()
    return user_dict


@user_routes.route('/by_username', methods=['PUT'])
def user_by_username():
    username = request.json['username']

    user = User.query.filter(User.username == username).first()
    user_dict = user.to_public_dict()
    return user_dict


@user_routes.route('/follow', methods=['POST'])
def follow():
    session_user_id = request.json['session_user_id']
    follow_user_id = request.json['follow_user_id']
    following = request.json['following']

    if following:
        old_follow = Follow.query \
                           .filter(Follow.follower_id == session_user_id,
                                   Follow.followee_id == follow_user_id) \
                           .first()
        db.session.delete(old_follow)
        db.session.commit()
        return old_follow.to_dict()
    else:
        new_follow = Follow(follower_id=session_user_id,
                            followee_id=follow_user_id)
        db.session.add(new_follow)
        db.session.commit()
        return new_follow.to_dict()
