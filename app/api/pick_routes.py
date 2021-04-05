from flask import Blueprint, jsonify, session, request
from flask_login import current_user

from app.models import Pick, db
# from app.forms import NewPickForm


pick_routes = Blueprint('picks', __name__)


@pick_routes.route('/', methods=['PUT'])
def get_picks():
    ids = request.json['ids']
    media = request.json['media']
    picks = db.session.query(Pick).filter(Pick.id.in_(ids)).all()
    picks_dicts = [pick.to_dict() for pick in picks]
    if media:
        picks_media = [pick.to_dict_media() for pick in picks]
        return {'picks': picks,
                'picks_media': picks_media}
    return {'picks': picks}
