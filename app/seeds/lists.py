from app.models import db, List


def seed_lists():
    classic_action = List(title = 'Classic Action Flicks',
                          description = 'The best of the best action movies from the 80\'s and 90\'s.',
                          start_date = '04/15/2021',
                          end_date = '05/15/2021',
                          user_id = 1)
    horror = List(title = 'Horror',
                          description = 'Horror movies so good, your skin will fall off',
                          start_date = '05/1/2021',
                          end_date = '05/7/2021',
                          user_id = 1)
    db.session.add(classic_action)
    db.session.add(horror)
    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE lists;')
    db.session.commit()
