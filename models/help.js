var HelpController =  require('../controller/help');

module.exports = {
    getDetails: function(bot, message) {
        console.log("*** Invoking Help ... ***");
        HelpController.parseDetails(bot, message);
        console.log("*** Invoked Help successfully. ***");
    }
};