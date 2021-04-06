from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

from .db import db


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    editorial = db.Column(db.Text)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    published = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    host = db.relationship('User', back_populates='lists')
    picks = db.relationship('Pick', back_populates='parent_list')

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'editorial': self.editorial,
                'start_date': self.start_date,
                'start_date_sort': str(self.start_date).replace('-',''),
                'end_date': self.end_date,
                'end_date_sort': str(self.end_date).replace('-',''),
                'published': self.published,
                'user_id': self.user_id,
                'picks': [pick.to_dict() for pick in self.picks],
                'picks_by_date': {pick.to_dict()['date_sort']: pick.to_dict() for pick in self.picks},
                'host': self.host.to_public_dict()}

    def to_dict_media(self):
        return {'id': self.id,
                'title': self.title,
                'editorial': self.editorial,
                'start_date': self.start_date,
                'start_date_sort': str(self.start_date).replace('-',''),
                'end_date': self.end_date,
                'end_date_sort': str(self.end_date).replace('-',''),
                'published': self.published,
                'user_id': self.user_id,
                'picks': [pick.to_dict_media() for pick in self.picks],
                'picks_by_date': {pick.to_dict()['date_sort']: pick.to_dict_media() for pick in self.picks},
                'host': self.host.to_public_dict()}
