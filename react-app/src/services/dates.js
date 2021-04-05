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

export const makeDay = date => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDate()
    const weekDay = newDate.getDay()
    return {
        date: newDate,
        year,
        month,
        monthName: monthName(month),
        day,
        weekDay,
        weekDayName: weekDayName(weekDay),
        sort: `${year}${month < 9 ? `0${month + 1}` : month}${day < 10 ? `0${day}` : day}`
    }
}

export const formatListDate = (start, end) => {
    const dates = [new Date(start), new Date(end)]
    const formatted = dates.map(date => {
        return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    })
    return `${formatted[0]} - ${formatted[1]}`
}

export const makeDays = (startDate, numDays=1) => {
    const result = []
    for (let i = 0; i < numDays; i++) {
        const date = new Date(startDate)
        date.setHours(0)
        console.log('   :::STARTDATE00000ARG:::   ', startDate);

        if (i === 0) console.log('   :::makedays0DATE:::   ', date);
        date.setDate(date.getDate() + i)
        const day = makeDay(date)
        result.push(day)
    }
    return result
}
