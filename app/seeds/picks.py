from app.models import db, Pick


def seed_picks():
    pass


def undo_picks():
    db.session.execute('TRUNCATE picks;')
    db.session.commit()
