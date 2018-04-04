var DilbertController =  require('../controller/dilbert');
var TodayDilbert = require("today-dilbert");

module.exports = {
    getComic: function(bot, message, comicDate){
        console.log("*** Invoking getComic ... ***");
        comicDate = (comicDate === undefined) ? "today" : comicDate;
        TodayDilbert(comicDate, function(err, data) {
            if(err) {
                console.log(err)
            }
            DilbertController.parseDetails(bot, message, data);
            console.log(data);
        });
    }
};