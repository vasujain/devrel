var BotConfig = require('../config.json');

module.exports = {
    // Parse the pull response json and extract PR#, Title, User out of it.
    parseResponse: function(body, bot, message, repo, githubCorpRepoOrg) {
        console.log("*** Invoking parseAndResponse ... ***");
        var repoSource = ":shipit: " + githubCorpRepoOrg + repo + " Open Pull Requests : ";
        var response = "";
        var obj = JSON.parse(body);
        var objLength = obj.length;
        if (obj.length == 0) {
            response += "No open PR's @ the moment !";
        } else {
            for (var i = 0; i < objLength; i++) {
                response += "\n :construction: PR # " + obj[i].number + " - " + obj[i].title + " by " + obj[i].user.login;
            }
        }
        bot.reply(message, {
            "attachments": [{
                "fallback": repoSource,
                "color": "#36a64f",
                "title": repoSource,
                "text": response
            }]
        });
        console.log("*** Invoked parseAndResponse for " + repo + " with " + objLength + " PR'(s) executed successfully. ***");
    },
    // Parse the issue response json and extracting details out of it.
    parseAndResponseIssuesJson: function(body, bot, message, repo, repoOrg, label) {
        console.log("*** Invoking parseAndResponseIssuesJson ... ***");
        var repoSource = ":fire_engine: " + repoOrg + "/" + repo + " Issues with label : " + label;
        var response = "";
        var obj = JSON.parse(body);
        var objLength = obj.length;
        if (obj.length > 0) {
            for (var i = 0; i < objLength; i++) {
                var issue_icon = "";
                if (obj[i].state == "open") {
                    issue_icon = ":no_entry:";
                } else {
                    issue_icon = ":white_check_mark:";
                }
                response += "\n " + issue_icon + " Issue # " + obj[i].number + " - " + obj[i].title + " by " + obj[i].user.login;
                response += "\n " + obj[i].html_url;
            }
            bot.reply(message, {
                "attachments": [{
                    "fallback": repoSource,
                    "color": "#36a64f",
                    "title": repoSource,
                    "text": response
                }]
            });
        } else {
            response += "\n No Issues found for this label !";
        }
        console.log(response);
        console.log("*** Invoked parseAndResponseIssuesJson for " + repo + " with " + objLength + " Issues'(s) executed successfully.***");
    }
};