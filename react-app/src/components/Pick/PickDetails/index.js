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


    const budget = (() => {
        const lessThanMil = mediaData.budget < 1000000
        const budgetInMil = mediaData.budget / 1000000
        const budgetNum = `${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: lessThanMil ? 1 : 0,
        }).format(lessThanMil ? mediaData.budget : budgetInMil)}`
        const suffix = `${(lessThanMil ? '' : ' million')}`
        return budgetNum + suffix
    })()

    return (
        <div className='pick-details'>
            {mediaData.release_date && (
                <PickDetail label={'release date'}>
                    {`${new Date(mediaData.release_date).toDateString().slice(4)}`}
                </PickDetail>
            )}
            {budget && (
                <PickDetail label={'budget'}>
                    {budget}
                </PickDetail>
            )}
            {director && (
                <PickDetail label={'director'}>
                    {director.name}
                </PickDetail>
            )}
        </div>
    )
}


export default PickDetails
