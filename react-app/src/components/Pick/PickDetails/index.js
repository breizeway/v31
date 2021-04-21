import React from 'react'
import { useSelector } from 'react-redux'

import './PickDetails.css'
import PickDetail from './PickDetail'


const PickDetails = ({ listId, pickId}) => {
    const pick = useSelector(state => state.lists.all[listId].picks[pickId])
    const chosenPick = useSelector(state => state.components.Pick.chosen[pickId])

    const data = chosenPick || pick
    const mediaData = data.media_data
    console.log('   :::DATA:::   ', mediaData);

    const crew = mediaData.credits?.crew || []
    const director = crew.filter(member => {
        return member.job === 'Director'
    })[0]

    const budget = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(mediaData.budget)

    return (
        <div className='pick-details'>
            <PickDetail label={'release date'}>
                {`${new Date(mediaData.release_date).toDateString().slice(4)}`}
            </PickDetail>
            <PickDetail label={'budget'}>
                {budget}
            </PickDetail>
            <PickDetail label={'director'}>
                {director.name}
            </PickDetail>
        </div>
    )
}


export default PickDetails
