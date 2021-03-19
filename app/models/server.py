from .db import db
from datetime import datetime


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
