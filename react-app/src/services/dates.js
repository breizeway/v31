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

export const changeDate = (date, numDays, forward) => {
    const baseDate = typeof date === 'string' ? dateFromSort(date) : date
    const newDays = forward ? baseDate.getDate() + parseInt(numDays) : baseDate.getDate() - parseInt(numDays)
    const newDate = new Date(baseDate.setDate(newDays))
    return sortFromDate(newDate)
}

export const sortFromDate = dateObj => {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()
    return `${year}${month <= 8 ? `0${month + 1}` : month + 1}${date < 10 ? `0${date}` : date}`
}

const dateFromSort = dateSort => {
    return new Date(
        parseInt(dateSort.slice(0, 4)),
        parseInt(dateSort.slice(4, 6)) - 1,
        parseInt(dateSort.slice(6, 8)),
    )
}

export const getPriorSunday = date => {
    const baseDate = typeof date === 'string' ? dateFromSort(date) : date
    const weekDay = baseDate.getDay()
    const monthDay = baseDate.getDate()
    return new Date(baseDate.setDate(monthDay - weekDay))
}

export const getFirstSundayOfMonth = date => {
    const baseDate = typeof date === 'string' ? dateFromSort(date) : date
    const firstOfMonth = new Date(baseDate.setDate(1))
    const weekDay = firstOfMonth.getDay()
    const monthDay = firstOfMonth.getDate()
    return new Date(firstOfMonth.setDate(monthDay - weekDay))
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

export const makeDays = (date, numDays=1, viewId) => {
    const result = []
    for (let i = 0; i < numDays; i++) {
        let baseDate = typeof date === 'string' ? dateFromSort(date) : date
        switch (viewId) {
            case 1:
                baseDate = getFirstSundayOfMonth(baseDate)
                break
            case 2:
                baseDate = getPriorSunday(baseDate)
                break
            default: break
        }
        baseDate.setDate(baseDate.getDate() + i)
        const day = makeDay(baseDate)
        result.push(day)
    }
    return result
}

export const getCalendarLabel = (date, viewId) => {
    let baseDate = typeof date === 'string' ? dateFromSort(date) : date
    switch (viewId) {
        case 1:
            while (baseDate.getDate() !== 1) {
                const currentDate = baseDate.getDate()
                baseDate = new Date(baseDate.setDate(currentDate + 1))
            }
            return monthName(baseDate.getMonth())
        case 2:
            return 'week'
        case 3:
            return 'day'
        default:
            return 'error'
    }

}
