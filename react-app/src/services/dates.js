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

export const formatListDate = (start, end) => {
    const dates = [new Date(start), new Date(end)]
    const formatted = dates.map(date => {
        return `${monthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
    })
    return `${formatted[0]} - ${formatted[1]}`

}
