from app.models import db
from app.models.image import Image


def seed_images():

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_images():
    db.session.execute('TRUNCATE images CASCADE;')
    db.session.commit()
