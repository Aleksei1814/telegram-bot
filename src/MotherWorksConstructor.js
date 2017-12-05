let WorksDay = require('./MonthConstructor');

class Calendar {
    _getNextMonth(year, month, day, week, weekDay) {
        return new WorksDay({
            week: week,
            weekDay: weekDay,
            dayFirstWork: day,
            year: year,
            month: month
        }).arrayForMonthWorks;
    }
}

module.exports = Calendar;