module.exports = {
    parseAndResponseJson: function(body, bot, message) {
        console.log("*** Invoking Twitter JSON Parse ... ***");
        var obj = JSON.parse(body);
        var objLength = obj.length;

        var sofHeader = ":tweet: Latest tweets : ";
        var response = "";
        if (objLength > 0) {
            var user_screen_name = obj[0].user.screen_name;
            sofHeader = ":twittercheckmark: Latest tweets for " + user_screen_name + ": ";
            for (var i = 0; i < objLength; i++) {
                var tweetEmoji = ":link:";
                if(obj[i].retweeted) {
                    tweetEmoji = ":retweet:";
                }
                response += "\n :tweet:" + obj[i].text;
                response += "\n " + tweetEmoji + "https://twitter.com/" + user_screen_name + "/status/" + obj[i].id_str + "\n";
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
        console.log("*** Invoking Twitter JSON Parse ... ***");
    }
};