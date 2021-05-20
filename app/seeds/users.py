from werkzeug.security import generate_password_hash

from app.models import db, User


def seed_users():

    demo = User(username='demo',
                email='demo@aa.io',
                first_name='Demo',
                last_name='User',
                password='password')
    tbreitigam = User(username='tbreitigam',
                      email='tyler.breitigam@gmail.com',
                      first_name='Tyler',
                      last_name='Breitigam',
                      password='password')
    breizeway = User(username='breizeway',
                     email='tanbreit@icloud.com',
                     first_name='Tannor',
                     last_name='Breitigam',
                     password='password')
    lester_the_dog = User(username='lester_the_dog',
                          email='lester_the_dog@dogmail.com',
                          first_name='Lester',
                          last_name='Breitigam',
                          password='password')
    db.session.add(demo)
    db.session.add(tbreitigam)
    db.session.add(breizeway)
    db.session.add(lester_the_dog)
    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
