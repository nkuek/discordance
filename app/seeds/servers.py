from app.models import db
from app.models.server_users import Server, User

# Adds a demo user, you can add other servers here if you want


def seed_servers():

    fortnite = Server(admin_id=1, category='gaming', name='Official Fornite', description='The Official Fortnite Discord Server! Join to follow news channels, LFG, and chat.',
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

    # gaming categories
    db.session.add(fortnite)
    db.session.add(valorant)
    db.session.add(minecraft)
    db.session.add(apex)
    db.session.add(legends)
    db.session.add(cod)

    # music categories

    lofi = Server(admin_id=1, category='music', name='Lofi Girl', description='The friendliest community on Discord 🧡 Join now to meet amazing people from all around  the world 🌎.',
                  public=True, image_url='https://cdn.discordapp.com/discovery-splashes/707230275175841915/91507a87499ad13e85ca13dde4effed4.jpg?size=320')
    hip_hop = Server(admin_id=1, category='music', name='Hip-Hop', description="Discord's #1 Music Server • Featured in XXL, Billboard, Complex, NME, Hypebeast, High Snobiety, Crack, & more!",
                     public=True, image_url='https://cdn.discordapp.com/discovery-splashes/229624492622610434/95861389c97dddb4d34f30850a229847.jpg?size=320')
    monstercat = Server(admin_id=1, category='music', name='Monstercat', description='Empowering a creative and passionate community through innovation. Welcome to the family 😺.',
                        public=True, image_url='https://cdn.discordapp.com/discovery-splashes/98153570007810048/7dc7c08e4ff143028cd6b67fd5d0b1a3.jpg?size=320')

    # education categories
    dev_league = Server(admin_id=1, category='education', name='Game Dev League', description='GameDevLeague is a community built for Game Developers by Game Developers. Make, learn and grow with like minded people..',
                        public=True, image_url='https://cdn.discordapp.com/discovery-splashes/85338836384628736/5e3065f0d5c558aa852b5df7e326d9a3.jpg?size=320')
    dev_network = Server(admin_id=1, category='education', name='Game Dev Network', description="We're a friendly GameDev community that welcomes all skill levels - Unity / Unreal / C++ / C# 💖Meet, Learn, Share 💖",
                         public=True, image_url='https://cdn.discordapp.com/discovery-splashes/280521930371760138/7b5d701ce62730494c050c5a62ceceea.jpg?size=512')
    students = Server(admin_id=1, category='education', name='AP Students', description='A server where AP students can seek help and chat with other students',
                      public=True, image_url='https://cdn.discordapp.com/discovery-splashes/181970867549503489/fd29a222d2c86e65b660800e7db6cf40.jpg?size=320')

    # science categories

    python = Server(admin_id=1, category='science', name='Python', description='GameDevLeague is a community built for Game Developers by Game Developers. Make, learn and grow with like minded people..',
                    public=True, image_url='https://cdn.discordapp.com/discovery-splashes/267624335836053506/0ea813f39386016f046ae511a0409c31.jpg?size=320')
    nvidia = Server(admin_id=1, category='science', name='NVIDIA', description="We're a friendly GameDev community that welcomes all skill levels - Unity / Unreal / C++ / C# 💖Meet, Learn, Share 💖",
                    public=True, image_url='https://cdn.discordapp.com/discovery-splashes/185647255028629505/9da39ce7a2a0c2091d12739f9de99ed4.jpg?size=320')
    newegg = Server(admin_id=1, category='science', name='Newegg', description='The official Newegg.com Discord',
                    public=True, image_url='https://cdn.discordapp.com/discovery-splashes/500085440221806603/60cf732d96d1dfbf400dbb0962f20f37.jpg?size=320')

    # entertainment categories

    streamlabs = Server(admin_id=1, category='entertainment', name='Streamlabs', description='Live streaming tools and software for content creators. Streamlabs OBS, merch, alerts, charity, chatbot and more',
                        public=True, image_url='https://cdn.discordapp.com/discovery-splashes/346751285514469388/881e79369659d9cd9ac6d4b7a634ceb9.jpg?size=320')
    anime = Server(admin_id=1, category='entertainment', name='Anime Soul Discord', description="1. Anime Network on Discord!💛🌐 We connect 500.000+ anime fans on Discord and Steam. Do you enjoy Anime? Join us!✨",
                   public=True, image_url='https://cdn.discordapp.com/discovery-splashes/290843998296342529/ad1dcd814489b5ff4611f33a594c9ccb.jpg?size=320')
    soundworld = Server(admin_id=1, category='entertainment', name="Sound's World", description='Official server for the Discord YouTuber SoundDrout!🔗https://sounddrout.com/',
                        public=True, image_url='https://cdn.discordapp.com/discovery-splashes/452237221840551938/2858f73e5e7555872a5dd81ad6eb3386.jpg?size=320')

    user = User.query.get(1)
    user.servers.append(fortnite)
    user.servers.append(valorant)
    user.servers.append(minecraft)
    user.servers.append(apex)
    user.servers.append(legends)
    user.servers.append(cod)
    user.servers.append(lofi)
    user.servers.append(hip_hop)
    user.servers.append(monstercat)
    user.servers.append(dev_league)
    user.servers.append(dev_network)
    user.servers.append(students)
    user.servers.append(python)
    user.servers.append(nvidia)
    user.servers.append(newegg)
    user.servers.append(streamlabs)
    user.servers.append(anime)
    user.servers.append(soundworld)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the servers table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_servers():
    db.session.execute('TRUNCATE servers CASCADE;')
    db.session.commit()
