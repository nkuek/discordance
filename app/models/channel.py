from .db import db
from datetime import datetime


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(
        db.Integer, db.ForeignKey('servers.id'), nullable=False
        )
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
            )
    updated_at = db.Column(
            db.DateTime, nullable=False, default=datetime.utcnow()
            )

    servers = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channel')
