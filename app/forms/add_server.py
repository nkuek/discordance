from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError

class ServerForm(FlaskForm):
    name = StringField('Name', [DataRequired()])
    description = StringField('Description')
    public = BooleanField('Public')
    image_url = StringField('Image Url')
    