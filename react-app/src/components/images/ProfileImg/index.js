import React from 'react'

import './ProfileImg.css'


const ProfileImg = ({ url, length }) => {
    return (
        <div
            className='profile-img'
            style={{
                width: `${length}px`,
                height: `${length}px`,
                borderRadius: `${length/2}px`,
                backgroundImage: url ? `url(${url})` : null
            }}
        />
    )
}


export default ProfileImg
