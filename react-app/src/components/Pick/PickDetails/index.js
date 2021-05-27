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

    const crewSort = {Director: 0, Screenplay: 1, Producer: 1, 'Executive Producer': 1}
    const cast = mediaData.credits?.cast || []
    const crew = mediaData.credits?.crew || []

    const releventCrew = crew
        .filter(member => {
            const positions = Object.keys(crewSort)
            return positions.includes(member.job)
        })
        .sort((a, b) => {
            const sortA = a.job === 'Director' ? 0 : 1
            const sortB = b.job === 'Director' ? 0 : 1
            return sortA - sortB
        })

    const budget = (() => {
        const budgetLessThanMil = mediaData.budget < 1000000
        const budgetInMil = mediaData.budget / 1000000
        const budgetNum = `${Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: budgetLessThanMil ? 1 : 0,
        }).format(budgetLessThanMil ? mediaData.budget : budgetInMil)}`
        const suffix = `${(budgetLessThanMil ? '' : ' million')}`
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
