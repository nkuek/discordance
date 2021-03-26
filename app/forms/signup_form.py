from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def username_exists(form, field):
    print("Checking if username exists",  field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("User Name is already registered.")


# def password_matches(form, field):
#     print("Checking if password matches", field.data)
#     password = field.data
#     repeat_password = field.data
#     user = repeat_password.filter(repeat_password == password)
#     if user:
#         raise ValidationError("Password didn't match.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[
        DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
        DataRequired()])
    profile_URL = StringField('profile_URL')
