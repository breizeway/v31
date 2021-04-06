const monthName = monthNum => {
    switch (monthNum) {
        case 0: return 'January'
        case 1: return 'February'
        case 2: return 'March'
        case 3: return 'April'
        case 4: return 'May'
        case 5: return 'June'
        case 6: return 'July'
        case 7: return 'August'
        case 8: return 'September'
        case 9: return 'October'
        case 10: return 'November'
        case 11: return 'December'
        default: return Error('Not a month. Number must be between 0 and 11.')
    }
}

const weekDayName = weekDay => {
    switch (weekDay) {
        case 0: return 'Sunday'
        case 1: return 'Monday'
        case 2: return 'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
        default: return Error('Not a week day. Number must be between 0 and 6.')
    }
}

// const priorSunday = date => {

// }

export const makeDay = day => {
    const newDate = (typeof day === 'string') ? new Date(day.slice(0, 16)) : day
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const date = newDate.getDate()
    const weekDay = newDate.getDay()
    return {
        obj: newDate,
        year,
        month: month + 1,
        monthName: monthName(month),
        date,
        weekDay: weekDay + 1,
        weekDayName: weekDayName(weekDay),
        sort: `${year}${month < 9 ? `0${month + 1}` : month}${date < 10 ? `0${date}` : date}`
    }
}

export const formatListDate = (startString, endString) => {
    const dates = [new Date(startString.slice(0, 16)), new Date(endString.slice(0, 16))]
    const formatted = dates.map(date => {
        return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    })
    return `${formatted[0]} - ${formatted[1]}`
}

export const makeDays = (dateString, numDays=1) => {
    const result = []
    for (let i = 0; i < numDays; i++) {
        const date = new Date(dateString.slice(0, 16))
        date.setDate(date.getDate() + i)
        const day = makeDay(date)
        result.push(day)
    }
    return result
}
