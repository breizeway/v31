from werkzeug.security import generate_password_hash

from app.models import db, Follow


def seed_follows():
    follow1 = Follow(followee_id=1, follower_id=2)
    follow2 = Follow(followee_id=1, follower_id=3)
    follow3 = Follow(followee_id=1, follower_id=4)
    follow4 = Follow(followee_id=2, follower_id=1)
    follow5 = Follow(followee_id=2, follower_id=4)
    follow6 = Follow(followee_id=3, follower_id=4)
    follow7 = Follow(followee_id=4, follower_id=3)
    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.add(follow7)
    db.session.commit()
