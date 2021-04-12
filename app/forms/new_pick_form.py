from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired

from app.models import Pick


class NewPickForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    year = StringField('year', validators=[DataRequired()])
    editorial = TextAreaField('editorial', validators=[DataRequired()])
    original_poster = StringField('original_poster', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    media_id = IntegerField('media_id', validators=[DataRequired()])
    imdb_id = StringField('imdb_id', validators=[DataRequired()])
    list_id = IntegerField('list_id', validators=[DataRequired()])
