from flask import Blueprint, json, request, jsonify
from app.models import Server, db, User

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['POST'])
def add_server():
    response = request.json
    new_server = Server(
        admin_id=response['admin_id'],
        name=response['name'],
        description=response['description'],
        public=(bool(response['isPublic'])),
        image_url=response['image'],
    )

    user = User.query.get(response['admin_id'])
    user.servers.append(new_server)
    db.session.add(new_server)
    db.session.commit()
    return new_server.to_dict()


@server_routes.route('/', methods=['PUT'])
def find_server():
    serverId = request.json
    serverSearch = Server.query.filter(Server.id == serverId).first()
    server = Server(
        id=serverSearch.id,
        admin_id=serverSearch.admin_id,
        name=serverSearch.name,
        description=serverSearch.description,
        public=serverSearch.public,
        image_url=serverSearch.image_url
    )
    return server.to_dict()

# find public servers


@server_routes.route("/public", methods=['GET'])
def find_public_servers():
    serverSearch = Server.query.filter(Server.public == True).all()
    serverList = []
    for server in serverSearch:
        serverList.append(server.to_dict())
    return jsonify(serverList)


@server_routes.route('/', methods=['DELETE'])
def delete_server():
    serverId = request.json
    server = Server.query.get(serverId)
    db.session.delete(server)
    db.session.commit()


@server_routes.route('/edit/', methods=['PUT'])
def edit_server():
    server = request.json
    matched_server = Server.query.get(server['id'])
    matched_server.name = server['name']
    matched_server.description = server['description']
    matched_server.public = bool(server['isPublic'])
    matched_server.image_url = server['image']
    db.session.commit()
    return matched_server.to_dict()
