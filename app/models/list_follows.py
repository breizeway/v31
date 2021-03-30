from sqlalchemy.schema import ForeignKey

from .db import db


list_follows = db.Table(
    "list_follows",
    db.Column("user_id", db.Integer, ForeignKey("users.id"), primary_key=True),
    db.Column("list_id", db.Integer, ForeignKey("lists.id"), primary_key=True))
