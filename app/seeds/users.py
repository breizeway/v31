from werkzeug.security import generate_password_hash

from app.models import db, User


def seed_users():

    demo = User(username='demo',
                email='demo@aa.io',
                first_name='Demo',
                last_name='User',
                password='password')
    db.session.add(demo)
    demo2 = User(username='tbreitigam',
                 email='tyler.breitigam@gmail.com',
                 first_name='Tyler',
                 last_name='Breitigam',
                 password='tyfighter')
    db.session.add(demo2)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
