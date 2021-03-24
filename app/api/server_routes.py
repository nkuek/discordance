from flask import Blueprint, json, request, jsonify
from app.models import Server, db, User, Channel

server_routes = Blueprint('servers', __name__)


# Add new server
@server_routes.route('/', methods=['POST'])
def add_server():
    response = request.json
    new_server = Server(
        admin_id=response['admin_id'],
        name=response['name'],
        description=response['description'],
        category=response['serverCategory'],
        public=(bool(response['isPublic'])),
        image_url=response['image'],
    )

    user = User.query.get(response['admin_id'])
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

    existingChannel['messages'] = formattedMessages
    print('==========')
    print(existingChannel)
    print('==========')
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
