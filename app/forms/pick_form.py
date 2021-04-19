from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired

from app.models import Pick


class PickForm(FlaskForm):
    editorial = TextAreaField('editorial', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    media_id = IntegerField('media_id', validators=[DataRequired()])
    list_id = IntegerField('list_id', validators=[DataRequired()])
