import React from 'react'

import './ListCardUser.css'
import ProfileImg from '../../images/ProfileImg'


const ListCardUser = ({ user }) => {
    return (
        <div className='list-card-user'>
            <div className='text-explanation-small'>hosted by</div>
            <div className='list-card-user__data'>
                <ProfileImg
                    className='list-card-user__img'
                    url={user.ProfileImg}
                    length={50}
                />
                <div className='list-card-user__username'>
                    {user.username}
                </div>
            </div>
        </div>
    )
}


export default ListCardUser
