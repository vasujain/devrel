var CommandsController =  require('../controller/commands');

module.exports = {
    getDetails: function(bot, message) {
        console.log("*** Invoking Commands ... ***");
        CommandsController.parseDetails(bot, message);
        console.log("*** Invoked Commands successfully. ***");
    }
};