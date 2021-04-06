from app.models import db, Pick


def seed_picks():
    # list 1, 4/15 - 4/20
    classic_action_1 = Pick(title = 'Rocky III',
                            editorial = "One of my absolute favorites. This one means a lot to me. Rocky III.",
                            date = '04/15/2021',
                            original_poster = '/lklrplDDuALhY3k8IDFdRqtpZPk.jpg',
                            media_id = 1371,
                            imdb_id = 'tt0084602',
                            list_id = 1)
    classic_action_2 = Pick(title = 'The Thing',
                            editorial = "One of my absolute favorites. This one means a lot to me. This is the thing.",
                            date = '04/16/2021',
                            original_poster = '/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
                            media_id = 1091,
                            imdb_id = 'tt0084787',
                            list_id = 1)
    classic_action_3 = Pick(title = 'Rambo: First Blood Part II',
                            editorial = "One of my absolute favorites. This one means a lot to me. This is rambo.",
                            date = '04/17/2021',
                            original_poster = '/lIyUiHted0eWUceCx2ZHLnQGmgy.jpg',
                            media_id = 1369,
                            imdb_id = 'tt0089880',
                            list_id = 1)
    classic_action_4 = Pick(title = 'Alien',
                            editorial = "One of my absolute favorites. This one means a lot to me. This is Alien",
                            date = '04/18/2021',
                            original_poster = '/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
                            media_id = 348,
                            imdb_id = 'tt0078748',
                            list_id = 1)
    classic_action_5 = Pick(title = 'The Terminator',
                            editorial = "One of my absolute favorites. This one means a lot to me. Terminatoooooor.",
                            date = '04/19/2021',
                            original_poster = '/qvktm0BHcnmDpul4Hz01GIazWPr.jpg',
                            media_id = 218,
                            imdb_id = 'tt0088247',
                            list_id = 1)
    classic_action_6 = Pick(title = 'Terminator 2: Judgment Day',
                            editorial = "One of my absolute favorites. This one means a lot to me. T 2 baby.",
                            date = '04/20/2021',
                            original_poster = '/weVXMD5QBGeQil4HEATZqAkXeEc.jpg',
                            media_id = 280,
                            imdb_id = 'tt0103064',
                            list_id = 1)
    db.session.add(classic_action_1)
    db.session.add(classic_action_2)
    db.session.add(classic_action_3)
    db.session.add(classic_action_4)
    db.session.add(classic_action_5)
    db.session.add(classic_action_6)

    # list 2, 5/1 - 5/7
    horror_1 = Pick(title = 'C.H.U.D.',
                    editorial = "One of my absolute favorites. This one means a lot to me. CHUD",
                    date = '05/03/2021',
                    media_id = 23730,
                    original_poster = '/8BVw5RIDBTZwdMAR1VKpAkwrMjj.jpg',
                    imdb_id = 'tt0087015',
                    list_id = 2)
    horror_2 = Pick(title = 'Virus',
                    editorial = "One of my absolute favorites. This one means a lot to me. Virus.",
                    date = '05/07/2021',
                    original_poster = '/5Np88iigCfnXvMlMKmCcbPVIbYQ.jpg',
                    media_id = 9423,
                    imdb_id = 'tt0120458',
                    list_id = 2)
    db.session.add(horror_1)
    db.session.add(horror_2)

    db.session.commit()


def undo_picks():
    db.session.execute('TRUNCATE picks;')
    db.session.commit()
