from flask import Blueprint, jsonify, session, request
from flask_login import current_user

from app.models import List, db
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


# @list_routes.route('/<int:list_id>')
# def get_list(list_id):
#     lst = List.query.get(list_id)
#     list_dict = lst.to_dict()
#     return list_dict


# @list_routes.route('/<int:list_id>/media')
# def get_list_media(list_id):
#     lst = List.query.get(list_id)
#     list_dict = lst.to_dict_media()
#     return list_dict


@list_routes.route('/next/<int:num>')
def get_next_lists(num):
    lists = List.query.filter(List.published == True).order_by(List.start_date).limit(num).all()
    frame = {lst.to_dict()['id']: [pick['id'] for pick in lst.to_dict()['picks']] for lst in lists}
    return frame


# @list_routes.route('/next/<int:num>/media')
# def get_next_lists_media(num):
#     lists = List.query.order_by(List.start_date).limit(num).all()
#     lists_list = [lst.to_dict_media() for lst in lists]
#     return {'lists': lists_list}


@list_routes.route('/new', methods=['POST'])
def new_list():
    form = NewListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_list = List(
            title=form.data['title'],
            description=form.data['description'],
            start_date=form.data['start_date'],
            end_date=form.data['end_date'],
            user_id=current_user.to_dict()['id']
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
