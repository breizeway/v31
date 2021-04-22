import React from 'react'
import { useSelector } from 'react-redux'

import './PickDetails.css'
import PickDetail from './PickDetail'
import CastAndCrew from './CastAndCrew'


const PickDetails = ({ listId, pickId}) => {
    const pick = useSelector(state => state.lists.all[listId].picks[pickId])
    const chosenPick = useSelector(state => state.components.Pick.chosen[pickId])

    const data = chosenPick || pick
    const mediaData = data.media_data
    console.log('   :::mediaData:::   ', mediaData);

    const crewSort = {Director: 0, Screenplay: 1, Producer: 1, 'Executive Producer': 1}
    const cast = mediaData.credits?.cast || []
    const crew = mediaData.credits?.crew || []

    const releventCrew = crew
        .filter(member => {
        const positions = Object.keys(crewSort)
        return positions.includes(member.job)
        })

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
                <PickDetail label='release date' gridArea='release-date'>
                    {`${new Date(mediaData.release_date).toDateString().slice(4)}`}
                </PickDetail>
            )}
            {(mediaData.budget !== 0) && (
                <PickDetail label='budget' gridArea='budget'>
                    {budget}
                </PickDetail>
            )}
            {crew && (
                <PickDetail label='cast' gridArea='cast' scroll={true}>
                    {cast.slice(0, 10).map((member, i) => (
                        <CastAndCrew key={i} member={member}/>
                    ))}
                </PickDetail>
            )}
            {crew && (
                <PickDetail label='crew' gridArea='crew' scroll={true}>
                    {releventCrew.slice(0, 10).map((member, i) => (
                        <CastAndCrew key={i} member={member}/>
                    ))}
                </PickDetail>
            )}
        </div>
    )
}


export default PickDetails
