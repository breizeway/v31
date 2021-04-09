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

const monthNameShort = monthNum => {
    switch (monthNum) {
        case 0: return 'Jan'
        case 1: return 'Feb'
        case 2: return 'Mar'
        case 3: return 'Apr'
        case 4: return 'May'
        case 5: return 'Jun'
        case 6: return 'Jul'
        case 7: return 'Aug'
        case 8: return 'Sep'
        case 9: return 'Oct'
        case 10: return 'Nov'
        case 11: return 'Dec'
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

// const weekDayNameShort = weekDay => {
//     switch (weekDay) {
//         case 0: return 'Sun'
//         case 1: return 'Mon'
//         case 2: return 'Tue'
//         case 3: return 'Wed'
//         case 4: return 'Thu'
//         case 5: return 'Fri'
//         case 6: return 'Sat'
//         default: return Error('Not a week day. Number must be between 0 and 6.')
//     }
// }

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
    const baseDate = typeof date === 'string' ? dateFromSort(date) : new Date(date)
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
    const baseDate = typeof date === 'string' ? dateFromSort(date) : new Date(date)
    const weekDay = baseDate.getDay()
    const monthDay = baseDate.getDate()
    return new Date(baseDate.setDate(monthDay - weekDay))
}

export const getFirstSundayOfMonth = date => {
    const baseDate = typeof date === 'string' ? dateFromSort(date) : new Date(date)
    const firstOfMonth = new Date(baseDate.setDate(1))
    const weekDay = firstOfMonth.getDay()
    const monthDay = firstOfMonth.getDate()
    return new Date(firstOfMonth.setDate(monthDay - weekDay))
}

export const formatDateRange = (startDate, endDate, startOnly=false) => {
    const dates = [
        typeof startDate === 'string' ? dateFromSort(startDate) : new Date(startDate),
        typeof endDate === 'string' ? dateFromSort(endDate) : new Date(endDate),
    ]
    const formatted = dates.map(date => {
        return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    })
    if (startOnly) return formatted[0]
    return `${formatted[0]} - ${formatted[1]}`
}

export const formatDateRangeShort = (startDate, endDate, startOnly=false) => {
    const dates = [
        typeof startDate === 'string' ? dateFromSort(startDate) : new Date(startDate),
        typeof endDate === 'string' ? dateFromSort(endDate) : new Date(endDate),
    ]
    const formatted = dates.map(date => {
        return `${monthNameShort(date.getMonth())} ${date.getDate()}`
    })
    if (startOnly) return formatted[0]
    return `${formatted[0]} - ${formatted[1]}`
}

export const makeDays = (date, numDays=1, viewId) => {
    const result = []
    for (let i = 0; i < numDays; i++) {
        let baseDate = typeof date === 'string' ? dateFromSort(date) : new Date(date)
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

export const getCalendarLabel = (startDate, endDate, viewId) => {
    let startBaseDate = typeof startDate === 'string' ? dateFromSort(startDate) : new Date(startDate)
    switch (viewId) {
        case 1:
            while (startBaseDate.getDate() !== 1) {
                const currentDate = startBaseDate.getDate()
                startBaseDate = new Date(startBaseDate.setDate(currentDate + 1))
            }
            return monthName(startBaseDate.getMonth())
        case 2:
            return formatDateRangeShort(startDate, endDate)
        case 3:
            return formatDateRangeShort(startDate, endDate, true)
        default:
            return 'error'
    }

}
