from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

from .db import db
from app.requests import media_db


class Pick(db.Model):
    __tablename__ = 'picks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    media_id = db.Column(db.Integer, nullable=False)
    imdb_id = db.Column(db.String(50))
    list_id = db.Column(db.Integer, ForeignKey("lists.id"), nullable=False)

    parent_list = db.relationship('List', back_populates='picks')

    def to_dict(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'date': self.date,
                'media_id': self.media_id,
                'imdb_id': self.imdb_id,
                'list_id': self.list_id}

    def to_dict_w_data(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'date': self.date,
                'media_id': self.media_id,
                'imdb_id': self.imdb_id,
                'list_id': self.list_id,
                'media_data': media_db.get(resource_id=self.media_id)}
