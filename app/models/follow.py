from .db import db
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table

# Base = declarative_base()

follows = db.Table(
    "follows",
    db.Column("user_id", db.Integer, ForeignKey("users.id"), primary_key=True),
    db.Column("list_id", db.Integer, ForeignKey("lists.id"), primary_key=True))
