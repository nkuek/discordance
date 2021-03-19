from flask import Blueprint, jsonify, session, redirect
from app.models import Server, db
from app.forms import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/', methods=['POST'])
def add_server():
    form = ServerForm()
    if form.validate_on_submit():
        data = Server()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return data.to_dict()
    return "PLEASE FILL THIS OUT"
        
        
        
