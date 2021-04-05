from app.models import db, Pick


def seed_picks():
    # list 1, 4/15 - 4/20
    classic_action_1 = Pick(title = 'Rocky III',
                            description = "Now the world champion, Rocky Balboa is living in luxury and only fighting opponents who pose no threat to him in the ring, until Clubber Lang challenges him to a bout. After taking a pounding from Lang, the humbled champ turns to former bitter rival Apollo Creed for a rematch with Lang.",
                            date = '04/15/2021',
                            original_poster = '/lklrplDDuALhY3k8IDFdRqtpZPk.jpg',
                            media_id = 1371,
                            imdb_id = 'tt0084602',
                            list_id = 1)
    classic_action_2 = Pick(title = 'The Thing',
                            description = "Members of an American scientific research outpost in Antarctica find themselves battling a parasitic alien organism capable of perfectly imitating its victims. They soon discover that this task will be harder than they thought, as they don't know which members of the team have already been assimilated and their paranoia threatens to tear them apart.",
                            date = '04/16/2021',
                            original_poster = '/tzGY49kseSE9QAKk47uuDGwnSCu.jpg',
                            media_id = 1091,
                            imdb_id = 'tt0084787',
                            list_id = 1)
    classic_action_3 = Pick(title = 'Rambo: First Blood Part II',
                            description = "John Rambo is released from prison by the government for a top-secret covert mission to the last place on Earth he'd want to return—the jungles of Vietnam.",
                            date = '04/17/2021',
                            original_poster = '/lIyUiHted0eWUceCx2ZHLnQGmgy.jpg',
                            media_id = 1369,
                            imdb_id = 'tt0089880',
                            list_id = 1)
    classic_action_4 = Pick(title = 'Alien',
                            description = "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.",
                            date = '04/18/2021',
                            original_poster = '/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
                            media_id = 348,
                            imdb_id = 'tt0078748',
                            list_id = 1)
    classic_action_5 = Pick(title = 'The Terminator',
                            description = "In the post-apocalyptic future, reigning tyrannical supercomputers teleport a cyborg assassin known as the \"Terminator\" back to 1984 to kill Sarah Connor, whose unborn son is destined to lead insurgents against 21st century mechanical hegemony. Meanwhile, the human-resistance movement dispatches a lone warrior to safeguard Sarah. Can he stop the virtually indestructible killing machine?",
                            date = '04/19/2021',
                            original_poster = '/qvktm0BHcnmDpul4Hz01GIazWPr.jpg',
                            media_id = 218,
                            imdb_id = 'tt0088247',
                            list_id = 1)
    classic_action_6 = Pick(title = 'Terminator 2: Judgment Day',
                            description = "Nearly 10 years have passed since Sarah Connor was targeted for termination by a cyborg from the future. Now her son, John, the future leader of the resistance, is the target for a newer, more deadly terminator. Once again, the resistance has managed to send a protector back to attempt to save John and his mother Sarah.",
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
                    description = "A rash of bizarre murders in New York City seems to point to a group of grotesquely deformed vagrants living in the sewers. A courageous policeman, a photo journalist and his girlfriend, and a nutty bum, who seems to know a lot about the creatures, band together to try and determine what the creatures are and how to stop them.",
                    date = '05/03/2021',
                    media_id = 23730,
                    original_poster = '/8BVw5RIDBTZwdMAR1VKpAkwrMjj.jpg',
                    imdb_id = 'tt0087015',
                    list_id = 2)
    horror_2 = Pick(title = 'Virus',
                    description = "When the crew of an American tugboat boards an abandoned Russian research vessel, the alien life form aboard regards them as a virus which must be destroyed.",
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
