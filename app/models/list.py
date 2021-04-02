from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

from .db import db


class List(db.Model):
    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    published = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='lists')
    picks = db.relationship('Pick', back_populates='parent_list')

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'start_date': self.start_date,
                'end_date': self.end_date,
                'published': self.published,
                'user_id': self.user_id,
                'picks': [pick.to_dict() for pick in self.picks],
                'user': self.user.to_public_dict()}

    def to_dict_media(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'start_date': self.start_date,
                'end_date': self.end_date,
                'published': self.published,
                'user_id': self.user_id,
                'picks': [pick.to_dict_media() for pick in self.picks],
                'user': self.user.to_public_dict()}

    def to_dict_frame(self):
        return {self.id: [pick.to_dict_media() for pick in self.picks]}
