from flask import Blueprint, json, request, jsonify, flash, request
from app.models import Server, db, User, Channel

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
    server = request.json
    matched_server = Server.query.get(server['id'])
    matched_server.name = server['name']
    matched_server.description = server['description']
    matched_server.public = bool(server['isPublic'])
    matched_server.image_url = server['image']
    matched_server.category = server['serverCategory']
    db.session.commit()

    formattedChannels = [channel.to_dict()
                         for channel in matched_server.channels]
    data = matched_server.to_dict()
    data['channels'] = formattedChannels

    return data


# CHANNELS
@server_routes.route('/:id/:channel_id/', methods=['POST'])
def add_channel():
    channel = request.json
    new_channel = Channel(
        name=channel['name'],
        server_id=channel['serverId'],
    )
    server = Server.query.get(channel['serverId'])

    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()


@server_routes.route('/:id/:channel_id/', methods=['PUT'])
def find_channel():
    channelId = request.json
    channelSearch = Channel.query.get(channelId)
    channel = Channel(
        id=channelSearch.id,
        name=channelSearch.name,
        server_id=channelSearch.server_id,
    )

    existingChannel = channel.to_dict()
    formattedMessages = [message.to_dict() for
                         message in channelSearch.messages]

    for formattedMessage in formattedMessages:
        messageUsername = User.query.get(formattedMessage['user_id']).username
        formattedMessage['username'] = messageUsername

    # usernames = [User.query.get(formattedMessage['user_id']).username for formattedMessage in formattedMessages]

    # for formattedMessage in formattedMessages:
    #     for username in usernames:
    #         formattedMessage['username'] = username

    existingChannel['messages'] = formattedMessages
    return existingChannel


@server_routes.route('/:id/:channel_id/edit/', methods=['PUT'])
def edit_channel():
    channel = request.json
    matched_channel = Channel.query.get(channel['channelId'])
    matched_channel.name = channel['updatedName']
    db.session.commit()
    return matched_channel.to_dict()


@server_routes.route('/:id/:channel_id/', methods=['DELETE'])
def delete_channel():
    channelId = request.json
    channel = Channel.query.get(channelId)
    db.session.delete(channel)
    db.session.commit()
