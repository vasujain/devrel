module.exports = {
    parseDetails: function(body, bot, message) {
        console.log("*** Invoking Dilbert JSON Parse ... ***");
        bot.reply(message, {
            "attachments": [{
                "fallback": cmdMsg,
                "color": "#36A64F",
                "title": cmdMsg,
                "image_url": data.url
            }]
        });
        console.log("*** Invoking Dilbert JSON Parse ... ***");
    }
};