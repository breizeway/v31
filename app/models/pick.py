from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

from .db import db
from app.requests import media_db
from app.requests.media_db.meta import Meta


class Pick(db.Model):
    __tablename__ = 'picks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    year = db.Column(db.String(4))
    editorial = db.Column(db.Text)
    original_poster = db.Column(db.String(500))
    date = db.Column(db.Date, nullable=False)
    media_id = db.Column(db.Integer, nullable=False)
    imdb_id = db.Column(db.String(50))
    list_id = db.Column(db.Integer, ForeignKey("lists.id"), nullable=False)
    created = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    parent_list = db.relationship('List', back_populates='picks')

    def to_dict_simple(self):
        return {'id': self.id,
                'title': self.title,
                'year': self.year,
                'editorial': self.editorial,
                'date': self.date,
                'date_sort': str(self.date).replace('-', ''),
                'image_base_url': Meta.secure_image_base_url[0],
                'original_poster': self.original_poster,
                'original_poster_url': f'{Meta.secure_image_base_url[0]}original{self.original_poster}' if self.original_poster else '',
                'media_id': self.media_id,
                'imdb_id': self.imdb_id,
                'list_id': self.list_id}

    def to_dict(self):
        pick_dict = self.to_dict_simple()
        if (self.parent_list):
            pick_dict['parent_list'] = self.parent_list.to_dict_simple()
        return pick_dict

    def to_dict_media(self):
        pick_dict = self.to_dict()
        pick_dict['media_data'] = media_db.get(resource_id=self.media_id,
                                               categories=['credits',
                                                           'watch/providers'])
        return pick_dict
