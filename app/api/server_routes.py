from flask import Blueprint, json, request, jsonify, flash, request
from app.models import Server, db, User, Channel

from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

server_routes = Blueprint('servers', __name__)


# @login_required
# def upload_image():

#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400
    
#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     new_image = Image(user=current_user, url=url)
#     db.session.add(new_image)
#     db.session.commit()
#     return {url}

@server_routes.route('/', methods=['POST'])
@login_required
def add_server():

    image = request.files["image"]
    print('image!!!!!!!!!!!!!!!!!!!!')
    print(image)
    # response = request.json

    # image = request.files
    print('image------------------------')
    print(image)
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print("image-----------------------end")
    # print(upload)
    url = upload["url"]
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
        category=serverSearch.category,
        public=serverSearch.public,
        image_url=serverSearch.image_url
    )
    return server.to_dict()

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
    server = request.json
    matched_server = Server.query.get(server['id'])
    matched_server.name = server['name']
    matched_server.description = server['description']
    matched_server.public = bool(server['isPublic'])
    matched_server.image_url = server['image']
    matched_server.category = server['serverCategory']
    db.session.commit()
    return matched_server.to_dict()


# CHANNELS
@server_routes.route('/:id/:channel_id/', methods=['POST'])
def add_channel():
    channel = request.json
    new_channel = Channel(
        name=channel['name'],
        server_id=channel['serverId'],
    )
    print("==================")
    print(channel)
    print("==================")
    server = Server.query.get(channel['serverId'])
    server.channels.append(new_channel)
    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()
