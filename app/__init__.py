import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, emit, send

from .models import db, User
from .api.user_routes import user_routes
from .api.server_routes import server_routes
from .api.auth_routes import auth_routes
from .api.chat_routes import chat_routes

from .api.image_routes import image_routes


from .seeds import seed_commands

from .config import Config

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(image_routes, url_prefix='/api/images')
app.register_blueprint(chat_routes, url_prefix='/api/chat')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@socketio.on('connect')
def test_connect():
    print("connected")
    emit('Success', {"data": "Connected"})


@socketio.on('my event')
def test_message(message):
    print('===========')
    print('message')
    print(message)
    print('===========')
    emit('my response', {'message': message}, broadcast=True)


@socketio.on('new message')
def new_message(message):
    emit('load message', {'message': message}, broadcast=True)


@socketio.on('message delete')
def delete_message(message):
    emit('delete message', {'message': message})
# @socketio.on('json')
# def test_json(json):
#     print('hello')
#     send(json, json=True)


if __name__ == '__main__':
    socketio.run(app)
