from flask import Blueprint, request, jsonify
from app.models import db, Message

chat_routes = Blueprint('chat', __name__)


@chat_routes.route('/', methods=['POST'])
def live_chat():
    messageReq = request.json
    print('==========')
    print(messageReq)
    print('==========')
    new_message = Message(
        message=messageReq['messageInput'],
        user_id=messageReq['user']['id'],
        channel_id=messageReq['channelId']
    )
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    print(messageReq)
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    db.session.add(new_message)
    db.session.commit()
    return jsonify(messageReq)


# @chat_routes.route('/', methods=['DELETE'])
