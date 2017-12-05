Date.prototype.isLeapYear = function() {
    let y = this.getFullYear();
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
};

Date.prototype.getDaysInMonth = function() {
    let arrayDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.isLeapYear()) {
        arrayDayInMonth[1] = 29;
    }

    return arrayDayInMonth[this.getMonth()];
};