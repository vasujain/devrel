module.exports = {
    parseDetails: function(bot, message) {
        console.log("*** Parsing the Help response .... ***");
        var helpMsg = ":point_right: Use the following commands to use GitBit.\n";
        var helpCommand = "";
        helpCommand += ":pushpin: help - Gets list of all commands you can use with GitBit. \n";
        helpCommand += ":pushpin: github issues - Gets list of all Github issues in a repo with issue-label. \n";
        helpCommand += ":pushpin: sof issues - Get list of Stackoverflow questions with tag and intitle word. \n";
        helpCommand += ":pushpin: tweet twitterdev - Get list of tweets from twitterdev. \n";
        helpCommand += ":pushpin: dev - Get Developer details. \n";
        bot.reply(message, {
            "attachments": [{
                "fallback": helpCommand,
                "color": "#FFFF00",
                "title": helpMsg,
                "text": helpCommand
            }]
        });
        console.log("*** Parsed the Help response successfully. ***");
    }
};