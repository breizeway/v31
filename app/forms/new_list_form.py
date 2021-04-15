from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, BooleanField
from wtforms.validators import DataRequired

from app.models import List


class NewListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    editorial = TextAreaField('editorial', validators=[DataRequired()])
