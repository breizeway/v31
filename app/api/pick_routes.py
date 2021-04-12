from flask import Blueprint, jsonify, session, request
from flask_login import current_user
import datetime

from app.models import Pick, db
from app.forms import NewPickForm


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


@pick_routes.route('/', methods=['PATCH'])
def delete_picks():
    ids = request.json['ids']
    picks = db.session.query(Pick).filter(Pick.id.in_(ids)).all()
    picks_dicts = [pick.to_dict() for pick in picks]
    for pick in picks:
        db.session.delete(pick)
    db.session.commit()
    return {'picks': picks_dicts}


@pick_routes.route('/stage', methods=['PUT'])
def stage_pick():
    media_data = request.json['media_data']
    editorial = request.json['editorial']
    list_id = request.json['list_id']
    date = request.json['date']

    pick = Pick(title=media_data['title'],
                year=media_data['release_date'][0:4],
                editorial=editorial,
                original_poster=media_data['poster_path'],
                date=datetime.date(int(date[0:4]), int(date[4:6]), int(date[6:8])),
                media_id=media_data['id'],
                imdb_id=media_data['imdb_id'],
                list_id=list_id)

    pick_dict = pick.to_dict()
    pick_dict['media_data'] = media_data
    return {'pick': pick_dict}


@pick_routes.route('/commit', methods=['POST'])
def commit_pick():
    form = NewPickForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form_date = form.data['date']
    date = datetime.date(int(form_date[0:4]), int(form_date[4:6]), int(form_date[6:8]))

    new_pick = Pick(
        title=form.data['title'],
        year=form.data['year'],
        editorial=form.data['editorial'],
        original_poster=form.data['original_poster'],
        date=date,
        # date=form.data['date'],
        media_id=form.data['media_id'],
        imdb_id=form.data['imdb_id'],
        list_id=form.data['list_id'],
    )
    print('   :::LIST_ID=FORM.DATALIST_ID:::   ', form.data['list_id']);
    print('   :::NEW_PICK:::   ', new_pick.to_dict());
    old_pick = db.session.query(Pick).filter(Pick.date == date, Pick.list_id == int(form.data['list_id'])).all()
    if len(old_pick) > 0: print('   :::OLD_PICK:::   ', old_pick[0].to_dict());

    if len(old_pick) > 0:
        if old_pick[0].media_id == new_pick.media_id:
            old_pick[0].editorial = new_pick.editorial
            db.session.commit()
            return old_pick[0].to_dict()
        else:
            db.session.delete(old_pick[0])
            db.session.commit()
    db.session.add(new_pick)
    db.session.commit()
    return new_pick.to_dict()
