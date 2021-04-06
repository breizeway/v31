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


@pick_routes.route('/stage', methods=['PUT'])
def stage_pick():
    media_data = request.json['media_data']
    description = request.json['description']
    list_id = request.json['list_id']
    date = request.json['date']

    pick = Pick(title=media_data['title'],
                description=description,
                original_poster=media_data['poster_path'],
                date=date,
                media_id=media_data['id'],
                imdb_id=media_data['imdb_id'],
                list_id=list_id)

    pick_dict = pick.to_dict()
    pick_dict['media_data'] = media_data
    return {'pick': pick_dict}
