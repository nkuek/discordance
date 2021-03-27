from flask import Blueprint, request, jsonify
from app.models import db, Message

chat_routes = Blueprint('chat', __name__)


@chat_routes.route('/', methods=['POST'])
def live_chat():
    messageReq = request.json
    new_message = Message(
        message=messageReq['messageInput'],
        user_id=messageReq['user']['id'],
        channel_id=messageReq['channelId']
    )

    db.session.add(new_message)
    db.session.commit()
    return jsonify(messageReq)


@chat_routes.route('/delete/', methods=['DELETE'])
def delete_message():
    messageId = request.json
    message = Message.query.get(messageId)
    db.session.delete(message)
    db.session.commit()
    return message.to_dict()


@chat_routes.route('/edit/', methods=['PUT'])
def edit_message():
    message = request.json
    matched_message = Message.query.get(message['messageId'])
    matched_message.message = message['updatedMessage']
    db.session.commit()
    return matched_message.to_dict()


@chat_routes.route('/like/', methods=['PUT'])
def add_like():
    message = request.json
    print("XXXXXXXXXXXXXXXXXXXXXX")
    print(message)
    matched_message = Message.query.get(message['messageId'])
    matched_message.likes = matched_message.likes + 1
    db.session.commit()
    return matched_message.to_dict()
