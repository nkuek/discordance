from flask import Blueprint, json, request, jsonify, flash
from app.models import Server, db, User

from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['POST'])
# @login_required
def add_server():
    url = None
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]


    # print(upload)
    new_server = Server(
        admin_id=request.form['admin_id'],
        name=request.form['name'],
        description=request.form['description'],
        category=request.form['serverCategory'],
        public=(bool(request.form['isPublic'])),
        image_url=url,
    )

    user = User.query.get(request.form['admin_id'])
    user.servers.append(new_server)
    db.session.add(new_server)
    db.session.commit()
    data = new_server.to_dict()
    data['channels'] = []
    return data


# Find single server
@server_routes.route('/', methods=['PUT'])
def find_server():
    serverId = request.json
    serverSearch = Server.query.get(serverId)
    server = Server(
        id=serverSearch.id,
        admin_id=serverSearch.admin_id,
        name=serverSearch.name,
        description=serverSearch.description,
        category=serverSearch.category,
        public=serverSearch.public,
        image_url=serverSearch.image_url,
    )
    data = server.to_dict()
    formattedChannels = [channel.to_dict()
                         for channel in serverSearch.channels]
    data['channels'] = formattedChannels

    return data


# @server_routes.route("/", methods=['GET'])
# def find_server():
#     serverId = request.json
#     serverSearch = Server.query.filter(Server.id == serverId).all()
#     serverList = []
#     for server in serverSearch:
#         serverList.append(server.to_dict())
#     return jsonify(serverList)

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

    matched_server = Server.query.get(request.form['id'])
    url = None
    if "image" in request.files:
        image = request.files["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]

    matched_server.name = request.form['name']
    matched_server.description = request.form['description']
    matched_server.public = bool(request.form['isPublic'])
    matched_server.image_url = url
    matched_server.category = request.form['serverCategory']
    db.session.commit()

    formattedChannels = [channel.to_dict()
                         for channel in matched_server.channels]
    data = matched_server.to_dict()
    data['channels'] = formattedChannels

    return data
