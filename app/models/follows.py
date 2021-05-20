from sqlalchemy.schema import ForeignKey

from .db import db


class Follow(db.Model):
    __tablename__ = 'follows'
    followee_id = db.Column(db.Integer, ForeignKey('users.id'), primary_key=True)
    follower_id = db.Column(db.Integer, ForeignKey('users.id'), primary_key=True)
    created = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    followee = db.relationship('User', foreign_keys=followee_id, backref='followers')
    follower = db.relationship('User', foreign_keys=follower_id, backref='followeds')

    def to_dict(self):
        return {'followee_id': self.followee_id,
                'follower_id': self.follower_id}
