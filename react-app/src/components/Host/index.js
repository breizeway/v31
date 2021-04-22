import React from 'react'
import { useSelector } from 'react-redux'

import './Host.css'
import ProfileImg from '../images/ProfileImg'
import TextButton from '../buttons/TextButton'


const Host = ({ host }) => {
    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)
    const owned = loggedIn && user.id === host.id

    return (
        <div className='host'>
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
