require('./getDaysInMonth');

class CalendarKeyboard {
    constructor(param) {
        this.calendarKeyboard = [];

        this._namesDaysOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        this._namesMonth = [
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

        this.dateNow = new Date(param.year, param.month);
        this.monthWorks = param.monthWorks;
        this._createCalendar();
    }

    _createCalendar() {
        this._addTitle();
        this._addNamesOfDaysOfTheWeek();
        this._addNumbers();
        this._addFooter();
    }

    _addTitle() {
        const nameMonth = this._getMonth(this.dateNow.getMonth());
        const year = this.dateNow.getFullYear();
        this.calendarKeyboard.push([{ text: nameMonth + ' ' + year, callback_data: 'Год'}]);
    }

    _addNamesOfDaysOfTheWeek() {
        const arrayWithNamesDays = [];
        this._namesDaysOfTheWeek.forEach(function (item) {

            arrayWithNamesDays.push({ text: item, callback_data: ' '})
        });
        this.calendarKeyboard.push(arrayWithNamesDays);
    }

    _addNumbers() {
        let arrayWithWeek = [];

        const month = this.dateNow.getMonth();
        const year = this.dateNow.getFullYear();
        const countDayInMonth = this.dateNow.getDaysInMonth();

        for(let day = 1; day <= countDayInMonth; day++) {
            let weekDay = new Date(this.dateNow.setDate(day)).getDay();

            let isType = this.monthWorks[day][1];
            let dayDigit = day > 9 ? String(day)[1] : day;
            arrayWithWeek.push({ text: dayDigit + ' ' + isType, callback_data: day + '_' + month + '_' + year});

            if(weekDay === 0) {
                this._addNumberInCalendar(arrayWithWeek, 'first');
                arrayWithWeek = [];
            }
        }
        this._addNumberInCalendar(arrayWithWeek, 'last')
    }

    _addNumberInCalendar(arrayWithWeek, typeWeek) {
        let week = arrayWithWeek;
        const countDay = week.length;
        const maxDayInWeek = 7;
        if(countDay < maxDayInWeek) {
            if(typeWeek == 'first') {
                for(let i = 0; i < maxDayInWeek - countDay; i++) {
                    week.unshift({ text: ' ', callback_data: ' '});
                }
            } else if(typeWeek == 'last') {
                for(let i = 0; i < maxDayInWeek - countDay; i++) {
                    week.push({ text: ' ', callback_data: ' '});
                }
            }
        }

        this.calendarKeyboard.push(week);
    }

    _addFooter() {
        this.calendarKeyboard.push([
            { text: '<', callback_data: 'prew' },
            { text: ' ', callback_data: ' ' },
            { text: '>', callback_data: 'next' }
        ]);
    }

    _getCalendar() {
        return this.calendarKeyboard;
    }

    _getMonth(numberMonth) {
        return this._namesMonth[numberMonth] ? this._namesMonth[numberMonth] : 'Месяц';
    }
}

module.exports = CalendarKeyboard;