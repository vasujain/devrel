module.exports = {
    parseDetails: function(bot, message) {
        console.log("*** Parsing the commands response json.... ***");
        var cmdMsg = ":turbo_slack: Sample commands: \n";
        var cmdCommand = "";
        cmdCommand += ":stackoverflow: `sof issues` or  `stackoverflow issues`\n";
        cmdCommand += ":stackoverflow: `sof tag=java`\n";
        cmdCommand += ":twitter: `tweet`\n";
        cmdCommand += ":twitter: `tweet paypaluk 10`\n";
        cmdCommand += ":github: `github issues`\n";
        cmdCommand += ":dilbert: `dilbert` or `comics`\n";

        bot.reply(message, {
            "attachments": [{
                "fallback": cmdCommand,
                "color": "#36A64F",
                "title": cmdMsg,
                "text": cmdCommand
            }]
        });
        console.log("*** Parsed the commands response successfully. ***");
    }
};