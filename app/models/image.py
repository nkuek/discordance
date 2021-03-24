from .db import db
from .server_users import Server


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"))

    url = db.Column(db.String, nullable=False)
    serverId = Server.id
    user = db.relationship("User", back_populates="profile_url")
    server = db.relationship("Server", back_populates="profile_url")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user.id,
            "username": self.user.username,
            "url": self.url,
            "serverId": self.serverId
        }
