import React from 'react'
import { useSelector } from 'react-redux'

import './CastAndCrew.css'


const CastAndCrew = ({ member }) => {
    const imgBaseUrl = useSelector(state => state.media.imgBaseUrl)
    const src = `${imgBaseUrl}w185${member.profile_path}`
    console.log('   :::src:::   ', src);

    // w45 w185


    return (
        <div className='cast-and-crew'>
            {member.profile_path && (
                <div className='cast-and-crew__img-div'>
                    <img className='cast-and-crew__img' src={src} />
                </div>
            )}
            {member.job && (
                <div className='label-small'>{member.job}</div>
            )}
            {member.character && (
                <div className='label-small'>{member.character}</div>
            )}
            {member.name}
        </div>
    )
}


export default CastAndCrew
