from flask import Blueprint, jsonify, session, request
from flask_login import current_user

from app.models import Pick, List, db
from app.forms import NewListForm


list_routes = Blueprint('lists', __name__)


@list_routes.route('/', methods=['PUT'])
def get_lists():
    ids = request.json['ids']
    media = request.json['media']
    lists = db.session.query(List).filter(List.id.in_(ids)).all()
    lsts = [lst.to_dict() for lst in lists]
    if media:
        lists_media = [lst.to_dict_media() for lst in lists]
        return {'lists': lsts,
                'lists_media': lists_media}
    return {'lists': lsts}

@list_routes.route('/', methods=['PATCH'])
def delete_lists():
    ids = request.json['ids']
    lists = db.session.query(List).filter(List.id.in_(ids)).all()
    lists_dicts = [lst.to_dict() for lst in lists]
    for lst in lists:
        db.session.delete(lst)
    db.session.commit()
    return {'lists': lists_dicts}


@list_routes.route('/my/<int:num>')
def get_my_lists(num):
    user_id=current_user.to_dict()['id']
    lists = db.session.query(List).join(Pick, isouter=True).filter(List.user_id == user_id).order_by(Pick.date).limit(num).all()
    frame = {lst.to_dict()['id']: [pick['id'] for pick in lst.to_dict()['picks']] for lst in lists}
    return frame


@list_routes.route('/next/<int:num>')
def get_next_lists(num):
    lists = db.session.query(List).join(Pick, isouter=True).filter(List.published == True).order_by(Pick.date).limit(num).all()
    frame = {lst.to_dict()['id']: [pick['id'] for pick in lst.to_dict()['picks']] for lst in lists}
    return frame


@list_routes.route('/new', methods=['POST'])
def new_list():
    form = NewListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_list = List(
            title=form.data['title'],
            editorial=form.data['editorial'],
            user_id=current_user.to_dict()['id']
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
