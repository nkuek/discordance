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
    print('===========')
    print('messageId')
    print('===========')
    message = Message.query.get(messageId)
    db.session.delete(message)
    db.session.commit()
    return message.to_dict()
