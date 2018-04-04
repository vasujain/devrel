var DevDetailsController =  require('../controller/devDetails');

module.exports = {
    getDetails: function(bot, message) {
        console.log("*** Invoking devDetails ... ***");
        DevDetailsController.parseDetails(bot, message);
        console.log("*** Invoked devDetails successfully. ***");
    }
};