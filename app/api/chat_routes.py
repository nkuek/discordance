from flask import Blueprint, request, jsonify
from app.models import db, Message

chat_routes = Blueprint('chat', __name__)


@chat_routes.route('/', methods=['POST'])
def live_chat():
    messageReq = request.json
    new_message = Message(
        message=messageReq['message']['messageInput'],
        user_id=messageReq['message']['user']['id'],
        channel_id=messageReq['message']['channel']['id']
    )
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    print(messageReq)
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    db.session.add(new_message)
    db.session.commit()
    return jsonify(messageReq)


# @chat_routes.route('/', methods=['DELETE'])
