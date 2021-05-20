from sqlalchemy.schema import ForeignKey

from .db import db


follows = db.Table(
    "follows",
    db.Column("follower_user_id",
              db.Integer,
              ForeignKey("users.id"),
              primary_key=True),
    db.Column("followed_user_id",
              db.Integer,
              ForeignKey("users.id"),
              primary_key=True)
)
