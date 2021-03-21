from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/servers/', methods=['PUT'])
def userServers():
    userId = request.json

    print('================')
    print(userId)
    print('================')
    servers = User.query.join(Server.users).filter(User.id == 1).first()
    print('================')
    print(servers.servers)
    print('================')
