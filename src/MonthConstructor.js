require('./getDaysInMonth');

class WorksDay {
    constructor(param) {
        const year = param.year;
        const month = param.month;

        this.dateNow = new Date(year, month);
        this.dateNew = this.dateNow;
        this.dayNow = this.dateNow.getDate();
        this.weeksCount = param.week || 0;
        this.dayFirstWork = param.dayFirstWork || 0;

        this.mapWeeks = [
            [, 2, 1, 2, 1, 2, 0, 0],
            [, 1, 2, 1, 2, 1, 2, 0],
            [, 1, 2, 1, 2, 1, 2, 1],
            [, 2, 1, 2, 1, 2, 0, 1]
        ];

        this.arrayForMonthWorks = {};

        this.textForDay = [
            '😃',
            '🌙',
            '💤'
        ];
        this.textNameDay = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        this.textNameMonth = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];

        this._init();
    }

    _init() {
        this._createArrayForMonth();
        this._getMotherWorksDay();
    }


    _createArrayForMonth() {
        let countDayInMonth = this.dateNow.getDaysInMonth(),
            nameMonth = this._getRussianNameMonth(this.dateNow.getMonth()),
            selectDay = '';

        for(let day = this.dayNow; day <= countDayInMonth; day++) {
            selectDay = new Date(this.dateNew.setDate(day));
            this.arrayForMonthWorks[day] = [day + ' ' + nameMonth + ', ' + this._getRussianNameDay(selectDay.getDay()), '-'];
        }
    }

    _getMotherWorksDay() {
        let countDayInMonth = this.dateNow.getDaysInMonth(),
            weekDay = 0;

        for(let day = this.dayFirstWork; day <= countDayInMonth; day++) {
            weekDay = new Date(this.dateNew.setDate(day)).getDay();

            this.arrayForMonthWorks[day][1] = this._selectDayForWork(this.weeksCount, weekDay);
            this.arrayForMonthWorks[day][2] = {
                week: this.weeksCount,
                weekDay: weekDay
            };
            this._editWeeksCount(weekDay);
        }
    }

    _editWeeksCount(weekDay) {
        if(weekDay === 0) {
            this.weeksCount = this.weeksCount !== 3 ? this.weeksCount + 1 : 0;
        }
    }

    _selectDayForWork(week, day) {
        return this.textForDay[this.mapWeeks[week][day === 0 ? 7 : day]]
    }

    _getRussianNameDay(day) {
        return this.textNameDay[day];
    }

    _getRussianNameMonth(month) {
        return this.textNameMonth[month];
    }
}

module.exports = WorksDay;