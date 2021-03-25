from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    likes = db.Column(db.Integer, default=0, nullable=False)
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(
        db.Integer, db.ForeignKey('channels.id'), nullable=False
    )
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow()
    )

    user = db.relationship('User', back_populates='messages')
    channel = db.relationship(
        'Channel', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'likes': self.likes,
            'message': self.message,
            'user_id': self.user_id,
            'channel_id': self.channel_id
        }
