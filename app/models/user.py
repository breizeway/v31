from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy

from .db import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    profile_img = db.Column(db.String(500))
    created = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    lists = db.relationship('List', back_populates='host')
    following = association_proxy('followeds', 'followee')
    followed_by = association_proxy('followers', 'follower')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_simple_dict(self):
        return {'id': self.id,
                'username': self.username,
                'profile_img': self.profile_img}

    def to_public_dict(self):
        user_dict = self.to_simple_dict()
        user_dict['following'] = [user.to_simple_dict() for user in self.following]
        user_dict['followed_by'] = [user.to_simple_dict() for user in self.followed_by]
        return user_dict

    def to_dict(self):
        user_dict = self.to_public_dict()
        user_dict['email'] = self.email
        user_dict['first_name'] = self.first_name
        user_dict['last_name'] = self.last_name
        return user_dict
