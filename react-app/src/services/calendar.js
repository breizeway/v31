export default class Calendar {
    constructor(listStartDate) {
        this.view = 'week'
        this.originalDate = this._getDate(listStartDate)
        this.rootDate = new Date(this.originalDate)
    }

    setView(newView) {
        this.view = newView
    }

    getViewStart() {
        const newDate = new Date(this.rootDate)
        switch (this.view) {
            case 'day':
                return newDate
            case 'week':
                const weekDay = newDate.getDay()
                const monthDay = newDate.getDate()
                newDate.setDate(monthDay - weekDay)
                return newDate
            case 'month':
                newDate.setDate(1)
                const firstWeekDay = newDate.getDay()
                const firstMonthDay = newDate.getDate()
                return new Date(newDate.setDate(firstMonthDay - firstWeekDay))
            default:
                return newDate
        }
    }

    getDays() {
        const newDate = new Date(this.getViewStart())
        const days = []

        switch (this.view) {
            case 'day':
                days.push(this._makeDay(newDate))
                break
            case 'week':
                for (let i = 0; i < 7; i++) {
                    const day = this._makeDay(newDate)
                    days.push(day)
                    newDate.setDate(newDate.getDate() + 1)
                }
                break
            case 'month':
                const lastDay = this._getMonthViewEnd().toDateString()
                while (newDate.toDateString() !== lastDay) {
                    const day = this._makeDay(newDate)
                    days.push(day)
                    newDate.setDate(newDate.getDate() + 1)
                }
                const day = this._makeDay(newDate)
                days.push(day)
                break
            default:
                days.push(this._makeDay(newDate))
        }
        return days
    }

    goBack() {
        const newDate = new Date(this.rootDate)
        switch (this.view) {
            case 'day':
                this.rootDate = new Date(newDate.setDate(newDate.getDate() - 1))
                break;
            case 'week':
                this.rootDate = new Date(newDate.setDate(newDate.getDate() - 7))
                break;
            case 'month':
                this.rootDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
                break;
            default:
                this.rootDate = new Date(newDate.setDate(newDate.getDate() - 1))
                break;
        }
    }

    goForward() {
        const newDate = new Date(this.rootDate)
        switch (this.view) {
            case 'day':
                this.rootDate = new Date(newDate.setDate(newDate.getDate() + 1))
                break;
            case 'week':
                this.rootDate = new Date(newDate.setDate(newDate.getDate() + 7))
                break;
            case 'month':
                this.rootDate = new Date(newDate.setMonth(newDate.getMonth() + 1))
                break;
            default:
                this.rootDate = new Date(newDate.setDate(newDate.getDate() + 1))
                break;
        }
    }

    _getDate(date) {
        if (typeof date === 'string') {
            return this._dateFromSort(date)
        }
        return new Date(date)
    }

    _getMonthViewEnd() {
        const newDate = new Date(this.rootDate)
        newDate.setDate(1)
        newDate.setMonth(newDate.getMonth() + 1)
        while (newDate.getDay() !== 6) {
            newDate.getDate()
            newDate.setDate(newDate.getDate() + 1)
        }
        return newDate
    }

    _dateFromSort(listStartDate) {
        return new Date(
            parseInt(listStartDate.slice(0, 4)),
            parseInt(listStartDate.slice(4, 6)) - 1,
            parseInt(listStartDate.slice(6, 8)),
        )
    }

    _sortFromDate(date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const dateNum = date.getDate()
        return `${year}${month <= 8 ? `0${month + 1}` : month + 1}${dateNum < 10 ? `0${dateNum}` : dateNum}`
    }

    _makeDay(date) {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = newDate.getMonth()
        const monthDate = newDate.getDate()
        const day = newDate.getDay()
        return {
            obj: newDate,
            year,
            month: month,
            monthName: this._monthName(month),
            date: monthDate,
            day,
            dayName: this._weekDayName(day),
            sort: this._sortFromDate(newDate)
        }
    }

    _monthName(num) {
        switch (num) {
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

    _weekDayName(num) {
        switch (num) {
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
}

// const calendar = new Calendar('20210420')
// console.log('   :::CALENDAR:::   ', calendar);
// calendar.goBack()
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// calendar.goBack()
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// calendar.goBack()
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// calendar.goBack()
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// calendar.setView('month')
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// calendar.goForward()
// calendar.goForward()
// console.log('   :::CALENDAR:::   ', calendar);
// console.log('   :::CALENDAR:::   ', calendar.getViewStart());
// console.log('   :::CALENDAR:::   ', calendar.getDays());
