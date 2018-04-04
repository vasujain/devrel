module.exports = {
    // Bot Error Handler
    botErrorHandler: function(body, bot, message) {
        console.log("\n" + err);
        var errText = ":rotating_light: " + err;
        bot.reply(message, {
            "attachments": [{
                "fallback": err,
                "color": "#FF0000",
                "title": Error,
                "text": errText
            }]
        });
    }
};