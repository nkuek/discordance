from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

server_users = db.Table(
    'server_users',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False, primary_key=True
        ),
    db.Column(
        'server_id', db.Integer, db.ForeignKey('servers.id'),
        nullable=False, primary_key=True
        )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_url = db.Column(db.String(255))
    created_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
        )
    updated_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
        )

    server_admin = db.relationship('Server', back_populates='users')
    messages = db.relationship('Message', back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    public = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
            )
    updated_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
            )

    admin = db.relationship('User', back_populates='servers')
    channels = db.relationship('Channel', back_populates='servers')
