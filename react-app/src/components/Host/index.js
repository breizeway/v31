import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './Host.css'
import ProfileImg from '../images/ProfileImg'


const Host = ({ host }) => {
    const history = useHistory()

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)
    const owned = loggedIn && user.id === host.id

    return (
        <div className='host' onClick={() => history.push(`/u/${host.username}`)}>
            <div>
                <div className='text-explanation-small'>hosted by</div>
                <div className='host__data'>
                    <ProfileImg
                        url={host.profile_img}
                        length={50}
                        userId={host.id}
                        username={host.username}
                    />
                    <div className='host__username'>
                        {owned ? (
                            'You'
                        ) : (
                            host.username
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Host
