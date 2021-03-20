from flask import Blueprint, jsonify, session, redirect, request, make_response
from app.models import Server, db
from app.forms import ServerForm

server_routes = Blueprint('servers', __name__)


@server_routes.route('/', methods=['POST'])
def add_server():
    response = request.json
    print(response)
    new_server = Server(
        admin_id=1,
        name=response['name'],
        description=response['description'],
        public=bool(response['isPublic']),
        image_url=response['image'],
    )
    db.session.add(new_server)
    db.session.commit()
    # return make_response(jsonify(new_server))
    
    print(jsonify(new_server))
    # response2=json.dumps(new_server)
    # return response2
    return jsonify(new_server)
    # print(new_server)
    # return 'please'
