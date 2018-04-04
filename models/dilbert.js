var DilbertController =  require('../controller/dilbert');
var RandomDilbert = require("random-dilbert");

module.exports = {
    getComic: function(bot, message){
        console.log("*** Invoking getComic ... ***");
        RandomDilbert(function(err, data) {
            if(err) {
                console.log(err)
            }
            DilbertController.parseDetails(bot, message, data);
            console.log(data);
        });
    }
};