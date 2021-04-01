from app.models import db, List


def seed_lists():
    classic_action = List(title = 'Classic Action Flicks',
                          description = 'The best of the best action movies from the 80\'s and 90\'s. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
