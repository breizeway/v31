from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from datetime import date
from sqlalchemy import and_, func

from app.models import Pick, List, db, get_list_start_dates
from app.forms import ListForm


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


@list_routes.route('/my', methods=['PUT'])
def get_my_lists():
    num = request.json['num']

    list_start_dates = get_list_start_dates()

    user_id = current_user.to_dict()['id']
    lists = db.session.query(List) \
                      .join(list_start_dates,
                            and_(List.id == list_start_dates.c.list_id)) \
                      .filter(List.user_id == user_id) \
                      .order_by(list_start_dates.c.start_date) \
                      .limit(num) \
                      .all()
    frame = {lst.to_dict()['id']: [pickId
                                   for pickId
                                   in lst.to_dict()['picks'].keys()]
             for lst in lists}
    return frame


@list_routes.route('/next', methods=['PUT'])
def get_next_lists():
    num = request.json['num']

    list_start_dates = get_list_start_dates()

    lists = db.session.query(List) \
                      .join(list_start_dates,
                            and_(List.id == list_start_dates.c.list_id)) \
                      .filter(List.published == True) \
                      .order_by(list_start_dates.c.start_date) \
                      .limit(num) \
                      .all()
    frame = {lst.to_dict()['id']: [pickId
                                   for pickId
                                   in lst.to_dict()['picks'].keys()]
             for lst in lists}
    return frame


@list_routes.route('/user', methods=['PUT'])
def get_user_lists():
    num = request.json['num']

    list_start_dates = get_list_start_dates()

    user_id = request.json['data']['user_id']

    lists = db.session.query(List) \
                      .join(list_start_dates,
                            and_(List.id == list_start_dates.c.list_id)) \
                      .filter(List.published == True,
                              List.user_id == user_id) \
                      .order_by(list_start_dates.c.start_date) \
                      .limit(num) \
                      .all()
    frame = {lst.to_dict()['id']: [pickId
                                   for pickId
                                   in lst.to_dict()['picks'].keys()]
             for lst in lists}
    return frame



@list_routes.route('/new', methods=['POST'])
def new_list():
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_list = List(
            title=form.data['title'],
            editorial=form.data['editorial'],
            user_id=current_user.to_dict()['id'],
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()


@list_routes.route('/edit', methods=['PATCH'])
def edit_list():
    list_id = request.json['list_id']

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    lst = db.session.query(List) \
                    .filter(List.id == list_id) \
                    .first()
    lst_dict = lst.to_dict()

    title_changed = form.data['title'] != lst_dict['title']
    editorial_changed = form.data['editorial'] != lst_dict['editorial']
    published_changed = form.data['published'] != lst_dict['published']

    if (form.validate_on_submit()
        and (title_changed
             or editorial_changed
             or published_changed)):
        if title_changed:
            lst.title = form.data['title']
        if editorial_changed:
            lst.editorial = form.data['editorial']
        if published_changed:
            lst.published = form.data['published']
        db.session.commit()

    return lst.to_dict()
