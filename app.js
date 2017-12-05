(function() {
    let Calendar = require('./src/MotherWorksConstructor');
    let CalendarKeyboard = require('./src/CalendarKeyboard');

    let TelegramBot = require('node-telegram-bot-api');
    let token = '';  //@todo private token
    let bot = new TelegramBot(token, {polling: true});

    let selectMonth = 10;
    let selectYear = 2017;

    let arrayForMonthWorks = new Calendar()._getNextMonth(selectYear, selectMonth, 20, 0, 0);
    let calendarKeyboard = new CalendarKeyboard({year: selectYear, month: selectMonth, monthWorks: arrayForMonthWorks})._getCalendar();

    /*const Promise = require('bluebird');
    Promise.config({
        cancellation: true
    });

    bot.on('message', function (msg) {
        let chatId = msg.chat.id;

        // bot.sendMessage(chatId, String(arrayForMonthWorks[msg.text]), {
        //     caption: "I'm a bot!",
        //     message_id: chatId
        // });


        // Отправка картинки
        bot.sendPhoto(
            chatId,
            './image/bunny.png'
        );
    });

    var notes = [];
    bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
        var userId = msg.from.id;
        var text = match[1];
        var time = match[2];

        notes.push( { 'uid':userId, 'time':time, 'text':text } );

        bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
    });

    setInterval(function(){
        for (var i = 0; i < notes.length; i++){
            var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] == curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                notes.splice(i,1);
            }
        }
    },1000);
     */
    //
    // var options = {
    //     reply_markup: JSON.stringify({
    //         keyboard: [
    //             [{ text: 'Календарь', callback_data: /\/calendar/ }]
    //         ]
    //     })
    // };
    //
    // bot.onText(/\//, function (msg, match) {
    //     bot.sendMessage(msg.chat.id, 'Выберите любую кнопку:', options);
    // });

    let calendarButtons = {
        reply_markup: JSON.stringify({
            inline_keyboard: calendarKeyboard
        })
    };

    bot.onText(/\/calendar/, function (msg, match) {
        bot.sendMessage(msg.chat.id, 'График на месяц', calendarButtons);
    });

    bot.on('callback_query', function (msg) {
        // const splitMsgText = msg.data.split('_');
        // const numberDay = splitMsgText[0];
        // const numberMonth = splitMsgText[1];
        // const numberYear = splitMsgText[2];

        if(msg.data === 'next') {
            const keyTheLastElement = Object.keys(arrayForMonthWorks).pop();
            const lastElement = arrayForMonthWorks[keyTheLastElement][2];

            selectMonth = _getMonth(selectMonth);
            selectYear = _getYear(selectMonth, selectYear);

            arrayForMonthWorks = new Calendar()._getNextMonth(selectYear, selectMonth, 1, lastElement.week, lastElement.weekDay);

            calendarKeyboard = new CalendarKeyboard({year: selectYear, month: selectMonth, monthWorks: arrayForMonthWorks})._getCalendar();

            let calendarButtons = {
                reply_markup: JSON.stringify({
                    inline_keyboard: calendarKeyboard
                })
            };

            bot.sendMessage(msg.from.id, 'График на месяц', calendarButtons);
        } else {
            bot.answerCallbackQuery(msg.from.id, "Изменять голос запрещено", false, {});
        }
    });

    function _getMonth(month) {
        return month + 1 > 11 ? 0 : ++month
    }
    function _getYear(month, year) {
        return month == 0 ? ++year : year
    }
})();