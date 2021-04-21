from flask import Blueprint, jsonify, session, request
from flask_login import current_user
import datetime

from app.models import List, Pick, db
from app.forms import PickForm
from app.requests import media_db


pick_routes = Blueprint('picks', __name__)


@pick_routes.route('/', methods=['PUT'])
def get_picks():
    ids = request.json['ids']
    media = request.json['media']
    picks = db.session.query(Pick).filter(Pick.id.in_(ids)).all()
    picks_dicts = [pick.to_dict() for pick in picks]
    if media:
        picks_media = [pick.to_dict_media() for pick in picks]
        return {'picks': picks_dicts,
                'picks_media': picks_media}
    return {'picks': picks_dicts}


@pick_routes.route('/from_list', methods=['PUT'])
def get_picks_from_list():
    list_id = request.json['list_id']
    date = request.json['date']

    pick = db.session.query(Pick) \
                     .filter(Pick.list_id == list_id,
                             Pick.date == date) \
                     .first()
    pick_dict = None
    if pick:
        pick_dict = pick.to_dict_media()
    return {'pick': pick_dict}


@pick_routes.route('/', methods=['PATCH'])
def delete_picks():
    ids = request.json['ids']
    picks = db.session.query(Pick).filter(Pick.id.in_(ids)).all()
    picks_dicts = [pick.to_dict() for pick in picks]
    for pick in picks:
        db.session.delete(pick)

    db.session.commit()
    return {'picks': picks_dicts}


@pick_routes.route('/add', methods=['PUT'])
def stage_pick():
    form = PickForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    media_data = media_db.get(resource_id=form.data['media_id'])

    pick = Pick(title=media_data['title'],
                year=media_data['release_date'][0:4],
                editorial=form.data['editorial'],
                original_poster=media_data['poster_path'],
                date=datetime.date(int(form.data['date'][0:4]),
                                   int(form.data['date'][4:6]),
                                   int(form.data['date'][6:8])),
                media_id=form.data['media_id'],
                imdb_id=media_data['imdb_id'],
                list_id=form.data['list_id'])

    pick_dict = pick.to_dict()
    pick_dict['media_data'] = media_data
    return pick_dict


@pick_routes.route('/commit', methods=['POST'])
def commit_pick():
    form = PickForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    date = datetime.date(int(form.data['date'][0:4]),
                         int(form.data['date'][4:6]),
                         int(form.data['date'][6:8])),

    media_data = request.json['media_data']

    new_pick = Pick(title=media_data['title'],
                    year=media_data['release_date'][0:4],
                    editorial=form.data['editorial'],
                    original_poster=media_data['poster_path'],
                    date=datetime.date(int(form.data['date'][0:4]),
                                       int(form.data['date'][4:6]),
                                       int(form.data['date'][6:8])),
                    media_id=form.data['media_id'],
                    imdb_id=media_data['imdb_id'],
                    list_id=form.data['list_id'])

    old_pick = db.session.query(Pick) \
                         .filter(Pick.date == date,
                                 Pick.list_id == int(form.data['list_id'])) \
                         .first()

    if old_pick:
        if old_pick.media_id == new_pick.media_id:
            old_pick.editorial = new_pick.editorial
            db.session.commit()
            old_pick_dict = old_pick.to_dict()
            old_pick_dict['media_data'] = media_data
            return old_pick_dict
        else:
            db.session.delete(old_pick)
            db.session.commit()
    db.session.add(new_pick)
    db.session.commit()

    new_pick_dict = new_pick.to_dict()
    new_pick_dict['media_data'] = media_data
    return new_pick_dict
