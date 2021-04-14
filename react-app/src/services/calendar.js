export default class Calendar {
    constructor(listStartDate) {
        this.view = 'month'
        this.viewOptions = ['month', 'week', 'day']
        this.originalDate = this._getDate(listStartDate)
        this.rootDate = new Date(this.originalDate)
        this.viewStart = this._getViewStart()
        this.days = this._getDays()
        this.viewLabel = this._getViewLabel()
    }

    setView(newView) {
        this.view = newView
        this._updateViewStart()
        this._updateDays()
        this._updateViewLabel()
    }

    resetView() {
        this.rootDate = new Date(this.originalDate)
        this._updateViewStart()
        this._updateDays()
        this._updateViewLabel()
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
        this._updateViewStart()
        this._updateDays()
        this._updateViewLabel()
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
        this._updateViewStart()
        this._updateDays()
        this._updateViewLabel()
    }

    _getViewStart() {
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

    _updateViewStart() {
        this.viewStart = this._getViewStart()
    }

    _getViewLabel() {
        switch (this.view) {
            case 'day':
                return `${this.days[0].dayNameShort}, ${this.days[0].monthNameShort} ${this.days[0].date}`
            case 'week':
                const weekStart = `${this.days[0].monthNameShort} ${this.days[0].date}`
                const weekEnd = `${this.days[this.days.length - 1].monthNameShort} ${this.days[this.days.length - 1].date}`
                return `${weekStart} - ${weekEnd}`
            case 'month':
                const rootDay = this._makeDay(this.rootDate)
                return `${rootDay.monthName}`
            default:
                return `${this.days[0].dayNameShort}, ${this.days[0].monthNameShort} ${this.days[0].date}`
        }
    }

    _updateViewLabel() {
        this.viewLabel = this._getViewLabel()
    }

    _getDays() {
        const newDate = new Date(this._getViewStart())
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

    _updateDays() {
        this.days = this._getDays()
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
        const monthName = this._monthName(month)
        const monthDate = newDate.getDate()
        const day = newDate.getDay()
        const dayName = this._weekDayName(day)
        return {
            obj: newDate,
            year,
            month,
            monthName,
            monthNameShort: monthName.slice(0, 3),
            date: monthDate,
            day,
            dayName,
            dayNameShort: dayName.slice(0, 3),
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
