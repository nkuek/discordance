from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/servers/', methods=['PUT'])
def userServers():
    userId = request.json

    servers = User.query.get(userId).servers.all()
    serverList = []
    for server in servers:
        serverList.append(server.to_dict())

    return jsonify(serverList)


@user_routes.route('/servers/', methods=['POST'])
def joinServer():
    data = request.json
    user = User.query.get(data['userId'])
    server = Server.query.get(data['serverId'])
    user.servers.append(server)
    server.users.append(user)
    db.session.commit()
    user_servers = [server.to_dict() for server in user.servers]
    return jsonify(user_servers)


@user_routes.route('/servers/', methods=['DELETE'])
def deleteServer():
    data = request.json
    user = User.query.get(data['userId'])
    server = Server.query.get(data['serverId'])

    user.servers.remove(server)
    server.users.remove(user)

    db.session.commit()
    user_servers = [server.to_dict() for server in user.servers]
    return jsonify(user_servers)
