from werkzeug.security import generate_password_hash
from app.models import db
from app.models.server_users import User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE servers;')
    db.session.execute('TRUNCATE channels;')
    db.session.execute('TRUNCATE users;')
    db.session.execute('TRUNCATE server_users;')
    db.session.execute('TRUNCATE messages;')
    db.session.commit()
