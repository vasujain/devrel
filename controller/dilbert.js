module.exports = {
    parseDetails: function(bot, message, data) {
        console.log("*** Invoking Dilbert JSON Parse ... ***");
        var comicMsg = ":turbo_slack: Random Dilbert: \n";
        bot.reply(message, {
            "attachments": [{
                "fallback": comicMsg,
                "color": "#36A64F",
                "title": comicMsg,
                "image_url": data.url
            }]
        });
        console.log("*** Invoking Dilbert JSON Parse ... ***");
    }
};