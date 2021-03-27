from flask import Blueprint, request
from app.models import Server, db, User, Channel

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/', methods=['POST'])
def add_channel():
    channel = request.json
    new_channel = Channel(
        name=channel['name'],
        server_id=channel['serverId'],
    )

    db.session.add(new_channel)
    db.session.commit()
    return new_channel.to_dict()


@channel_routes.route('/', methods=['PUT'])
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
        messageUsername = User.query.get(formattedMessage['user_id'])
        formattedMessage['profile_URL'] = messageUsername.profile_URL
        formattedMessage['username'] = messageUsername.username

    existingChannel['messages'] = formattedMessages
    return existingChannel


@channel_routes.route('/edit/', methods=['PUT'])
def edit_channel():
    channel = request.json
    matched_channel = Channel.query.get(channel['channelId'])
    matched_channel.name = channel['updatedName']
    db.session.commit()
    return matched_channel.to_dict()


@channel_routes.route('/', methods=['DELETE'])
def delete_channel():
    channelId = request.json
    channel = Channel.query.get(channelId)
    db.session.delete(channel)
    db.session.commit()
    return channel.to_dict()
