from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired

from app.models import List


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    editorial = TextAreaField('editorial', validators=[DataRequired()])
    published = BooleanField('published')
