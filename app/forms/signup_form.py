from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

from app.models import User


def username_exists(form, field):
    print("Checking if username exits", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username already exists")


def email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email already exists")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(),
                                                   username_exists])
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(),
                                             email_exists])
    password = StringField('password', validators=[DataRequired()])
