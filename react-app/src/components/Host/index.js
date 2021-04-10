import React from 'react'
import { useSelector } from 'react-redux'

import './Host.css'
import ProfileImg from '../images/ProfileImg'


const Host = ({ host }) => {
    const userId = useSelector(state => state.session.user?.id)

    return (
        <div className='list-card-host'>
            <div className='text-explanation-small'>hosted by</div>
            <div className='list-card-host__data'>
                <ProfileImg
                    className='list-card-host__img'
                    url={host.ProfileImg}
                    length={50}
                    userId={host.id}
                    username={host.username}
                />
                <div className='list-card-host__username'>
                    {userId !== host.id ? (
                        host.username
                    ) : (
                        'You'
                    )}
                </div>
            </div>
        </div>
    )
}


export default Host
