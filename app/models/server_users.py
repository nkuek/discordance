from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


server_users = db.Table(
    'server_users',
    db.Column(
        "user_id", db.Integer, db.ForeignKey('users.id'),
        nullable=False
    ),
    db.Column(
        'server_id', db.Integer, db.ForeignKey('servers.id'),
        nullable=False
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_URL = db.Column(db.String(255))
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

  # aws
    profile_url = db.relationship("Image", back_populates="user")
# --------------------------------------------------------------------
    server_admin = db.relationship('Server', back_populates='admin')
    messages = db.relationship('Message', back_populates='user')
    servers = db.relationship(
        'Server', secondary=server_users, back_populates='users', lazy='dynamic'
    )

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
            "email": self.email,
            "profile_URL":self.profile_URL
        }


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False, )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    public = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String(255))

    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
# aws
    profile_url = db.relationship("Image", back_populates="server")

    admin = db.relationship('User', back_populates='server_admin')
    channels = db.relationship('Channel', back_populates='servers', cascade='all, delete-orphan')
    users = db.relationship(
        'User', secondary=server_users, back_populates='servers',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "admin_id": self.admin_id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "public": self.public,
            "image_url": self.image_url,
        }
