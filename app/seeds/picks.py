from app.models import db, Pick


def seed_picks():
    # list 1, 4/15 - 4/20
    classic_action_1 = Pick(title = 'Rocky III',
                            description = "Now the world champion, Rocky Balboa is living in luxury and only fighting opponents who pose no threat to him in the ring, until Clubber Lang challenges him to a bout. After taking a pounding from Lang, the humbled champ turns to former bitter rival Apollo Creed for a rematch with Lang.",
                            date = '04/15/2021',
                            media_id = 1371,
                            imdb_id = 'tt0084602',
                            list_id = 1)
    classic_action_2 = Pick(title = 'The Thing',
                            description = "Members of an American scientific research outpost in Antarctica find themselves battling a parasitic alien organism capable of perfectly imitating its victims. They soon discover that this task will be harder than they thought, as they don't know which members of the team have already been assimilated and their paranoia threatens to tear them apart.",
                            date = '04/16/2021',
                            media_id = 1091,
                            imdb_id = 'tt0084787',
                            list_id = 1)
    db.session.add(classic_action_1)
    db.session.add(classic_action_2)

    # list 2, 5/1 - 5/7
    horror_1 = Pick(title = 'C.H.U.D.',
                    description = "A rash of bizarre murders in New York City seems to point to a group of grotesquely deformed vagrants living in the sewers. A courageous policeman, a photo journalist and his girlfriend, and a nutty bum, who seems to know a lot about the creatures, band together to try and determine what the creatures are and how to stop them.",
                    date = '05/03/2021',
                    media_id = 23730,
                    imdb_id = 'tt0087015',
                    list_id = 2)
    horror_2 = Pick(title = 'Virus',
                    description = "When the crew of an American tugboat boards an abandoned Russian research vessel, the alien life form aboard regards them as a virus which must be destroyed.",
                    date = '05/07/2021',
                    media_id = 9423,
                    imdb_id = 'tt0120458',
                    list_id = 2)
    db.session.add(horror_1)
    db.session.add(horror_2)

    db.session.commit()


def undo_picks():
    db.session.execute('TRUNCATE picks;')
    db.session.commit()
