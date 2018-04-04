module.exports = {
    parseDetails: function(bot, message) {
        console.log("*** Parsing the Changelog response json.... ***");
        var devMsg = ":gitdown: Dev Details \n";
        var devCommand = "";
        devCommand += ":tada: Bot brought to life by : Vasu Jain \n";
        devCommand += ":tada: Github Repo : https://github.com/vasujain/gitbitbot. \n";
        devCommand += ":tada: Bot Support : https://github.com/vasujain/gitbitbot/issues. \n";
        bot.reply(message, {
            "attachments": [{
                "fallback": devCommand,
                "color": "#36A64F",
                "title": devMsg,
                "text": devCommand
            }]
        });
        console.log("*** Parsed the Changelog response successfully. ***");
    }
};