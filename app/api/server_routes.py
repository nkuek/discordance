from flask import Blueprint, json, request, jsonify
from app.models import Server, db

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['POST'])
def add_server():
    response = request.json
    print('================')
    print(response['isPublic'])
    print('================')
    new_server = Server(
        admin_id=1,
        name=response['name'],
        description=response['description'],
        public=(bool(response['isPublic'])),
        image_url=response['image'],
    )
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
