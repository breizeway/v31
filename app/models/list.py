from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
from datetime import date

from .db import db
from app.models.pick import Pick


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.Text)
    published = db.Column(db.Boolean, nullable=False, default=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    host = db.relationship('User', back_populates='lists')
    picks = db.relationship('Pick',
                            back_populates='parent_list',
                            order_by=Pick.date,
                            cascade='all, delete, delete-orphan')

    @property
    def start_date(self):
        return date.today() if len(self.picks) == 0 else self.picks[0].to_dict()['date']

    @property
    def start_date_sort(self):
        return str(date.today()).replace('-','') if len(self.picks) == 0 else self.picks[0].to_dict()['date_sort']

    @property
    def end_date(self):
        return date.today() if len(self.picks) == 0 else self.picks[-1].to_dict()['date']

    @property
    def end_date_sort(self):
        return str(date.today()).replace('-','') if len(self.picks) == 0 else self.picks[-1].to_dict()['date_sort']

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'editorial': self.editorial,
                'start_date': self.start_date,
                'start_date_sort': self.start_date_sort,
                'end_date': self.end_date,
                'end_date_sort': self.end_date_sort,
                'published': self.published,
                'user_id': self.user_id,
                'picks': [pick.to_dict() for pick in self.picks],
                'picks_by_date': {pick.to_dict()['date_sort']: pick.to_dict() for pick in self.picks},
                'host': self.host.to_public_dict()}

    def to_dict_media(self):
        list_dict = self.to_dict()
        list_dict['picks'] = [pick.to_dict_media() for pick in self.picks],
        list_dict['picks_by_date'] = {pick.to_dict()['date_sort']: pick.to_dict_media() for pick in self.picks},
        return list_dict
