from app.models import db
from app.models.server_users import Server, User

# Adds a demo user, you can add other servers here if you want


def seed_servers():

    fornite = Server(admin_id=1, category='gaming', name='Official Fornite', description='The Official Fortnite Discord Server! Join to follow news channels, LFG, and chat.',
                     public=True, image_url='https://cdn.discordapp.com/discovery-splashes/322850917248663552/5d3cb159f4f10a52b056cd40c332c4d7.jpg?size=320')

    valorant = Server(admin_id=1, category='gaming', name='VALORANT', description='The VALORANT Discord server, in collaboration with Riot Games. We offer the latest news, LFGs and various chats.',
                      public=True, image_url='https://cdn.discordapp.com/discovery-splashes/679875946597056683/75d0a14a28750f28a086b3376de66927.jpg?size=320')

    minecraft = Server(admin_id=1, category='gaming', name='MINECRAFT', description='The official Minecraft Discord!',
                       public=True, image_url='https://cdn.discordapp.com/discovery-splashes/302094807046684672/579507dff86d89cd5decd8e016a54706.jpg?size=320')

    apex = Server(admin_id=1, category='gaming', name='Apex Legends', description='Community run, developer supported Discord server for Apex Legends. Join for LFG, game discussion, news & more!',
                  public=True, image_url='https://cdn.discordapp.com/discovery-splashes/541484311354933258/a1f005389b2d45653cf21f067a1f1ce2.jpg?size=320')

    legends = Server(admin_id=1, category='gaming', name='r/leagueoflegends', description='Community-run server for the League of Legends subreddit.',
                     public=True, image_url='https://cdn.discordapp.com/discovery-splashes/125440014904590336/665ca01a75fb2666f37ca97084d09a6a.jpg?size=320')

    cod = Server(admin_id=1, category='gaming', name='Call of Duty', description='The Call of Duty Discord server is a developer-recognized community focused on the first-person shooter franchise.',
                 public=True, image_url='https://cdn.discordapp.com/discovery-splashes/136986169563938816/e4d2d97c9e210f1df4e26612e8a9ac48.jpg?size=320')

    db.session.add(fornite)
    db.session.add(valorant)
    db.session.add(minecraft)
    db.session.add(apex)
    db.session.add(legends)
    db.session.add(cod)
    # db.session.append()
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the servers table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_servers():
    db.session.execute('TRUNCATE servers CASCADE;')
    db.session.commit()
