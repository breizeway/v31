import React from 'react'
import { useSelector } from 'react-redux'

import './CastAndCrew.css'


const CastAndCrew = ({ member }) => {
    const imgBaseUrl = useSelector(state => state.media.imgBaseUrl)
    const src = `${imgBaseUrl}w185${member.profile_path}`
    // w45 w185


    return (
        <div className='cast-and-crew'>
            <div
                className='cast-and-crew__img-div'
                style={{
                    backgroundImage: member.profile_path ? `url(${src})` : null,
                    backgroundColor: member.profile_path ? 'inherit' : 'var(--color__layer-2)'
                }}
            >
            {!member.profile_path && (
                <>
                    <i className='fas fa-frown' />
                    <div>NO IMAGE</div>
                </>
            )}
            </div>
            {member.name}
            {member.character && (
                <div className='label-small' style={{marginBottom: '0'}}>{member.character}</div>
            )}
            {member.job && (
                <div className='label-small' style={{marginBottom: '0'}}>{member.job}</div>
            )}
        </div>
    )
}


export default CastAndCrew
