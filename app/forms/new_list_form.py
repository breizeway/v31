from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField
from wtforms.validators import DataRequired

from app.models import List


class NewListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    editorial = TextAreaField('editorial', validators=[DataRequired()])
    start_date = DateField('start_date', validators=[DataRequired()])
    end_date = DateField('end_date', validators=[DataRequired()])
