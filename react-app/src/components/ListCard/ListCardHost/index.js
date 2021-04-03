import React from 'react'
import { useSelector } from 'react-redux'

import './ListCardHost.css'
import ProfileImg from '../../images/ProfileImg'


const ListCardHost = ({ host }) => {
    const userId = useSelector(state => state.session.user.id)

    return (
        <div className='list-card-host'>
            <div className='text-explanation-small'>hosted by</div>
            <div className='list-card-host__data'>
                <ProfileImg
                    className='list-card-host__img'
                    url={host.ProfileImg}
                    length={50}
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


export default ListCardHost
