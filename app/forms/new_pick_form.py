from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired

from app.models import Pick


class NewPickForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    original_poster = StringField('original_poster', validators=[DataRequired()])
    date = DateField('start_date', validators=[DataRequired()])
    media_id = IntegerField('media_id', validators=[DataRequired()])
    imdb_id = StringField('imdb_id', validators=[DataRequired()])
