var BotConfig = require('../config.json');

module.exports = {
    parseAndResponseJson: function(body, bot, message, tag, intitle) {
        console.log("*** Invoking parseAndResponseSOFJson ... ***");
        var obj = JSON.parse(body);
        var objLength = obj.items.length;

        var sofHeader = ":fire_engine: Current Issues with label : " + tag;
        sofHeader+= (intitle!="")? " and intitle: " + intitle: "";
        var response = "";
        if (objLength > 0) {
            for (var i = 0; i < objLength; i++) {
                var issue_icon = "";
                if (!obj.items[i].is_answered) {
                    issue_icon += ":no_entry:";
                    response += "\n " + issue_icon + " Question # " + obj.items[i].question_id + " - " + obj.items[i].title + " by " + obj.items[i].owner.display_name;
                    response += "\n " + obj.items[i].link;
                }
            }
        } else {
            response += "\n No Issues found for the label !";
        }

        bot.reply(message, {
            "attachments": [{
                "fallback": sofHeader,
                "color": "#36a64f",
                "title": sofHeader,
                "text": response
            }]
        });
        console.log("*** Invoked parseAndResponseSOFJson successfully. ***");
    }
};