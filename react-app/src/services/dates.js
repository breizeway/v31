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

export const makeDay = dateObj => {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()
    const weekDay = dateObj.getDay()
    return {
        obj: dateObj,
        year,
        month: month + 1,
        monthName: monthName(month),
        date,
        weekDay: weekDay + 1,
        weekDayName: weekDayName(weekDay),
        sort: sortFromDate(dateObj)
    }
}

export const incrementDate = (dateSort, numDays) => {
    const date = dateFromSort(dateSort)
    const newDays = date.getDate() + numDays
    console.log('   :::NEWDAYS:::   ', newDays);
    const newDate = date.setDate(newDays)
    return sortFromDate(newDate)
}

export const sortFromDate = dateObj => {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()
    return `${year}${month <= 8 ? `0${month + 1}` : month + 1}${date < 10 ? `0${date}` : date}`
}

const getPriorSunday = dateObj => {
    const weekDay = dateObj.getDay()
    const monthDay = dateObj.getDate()
    return new Date(dateObj.setDate(monthDay - weekDay))
}

const dateFromSort = dateSort => {
    return new Date(
        parseInt(dateSort.slice(0, 4)),
        parseInt(dateSort.slice(4, 6)) - 1,
        parseInt(dateSort.slice(6, 8)),
    )
}

export const formatListDate = (startSort, endSort) => {
    const dates = [
        dateFromSort(startSort),
        dateFromSort(endSort),
    ]
    const formatted = dates.map(date => {
        return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    })
    return `${formatted[0]} - ${formatted[1]}`
}

export const makeDays = (dateSort, numDays=1, startOnSunday=true) => {
    const result = []
    for (let i = 0; i < numDays; i++) {
        let date = dateFromSort(dateSort)
        if (startOnSunday) date = getPriorSunday(date)
        date.setDate(date.getDate() + i)
        const day = makeDay(date)
        result.push(day)
    }
    return result
}
