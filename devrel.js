/**
 * DevRel Bot for Slack !
 * @author: Vasu Jain VJ
 */

// Libraries
var BotConfig = require('./config.json');
var Botkit = require("botkit");

// Models
var SOFModel = require("./models/stackoverflow");
var DevDetailsModel = require("./models/devDetails");
var GithubModel = require("./models/github");
var TwitterModel = require("./models/twitter");
var CommandsModel = require("./models/commands");
var DilbertModel = require("./models/dilbert");
var HelpModel = require("./models/help");

// Setup the Botkit controller
var controller = Botkit.slackbot({
    debug: false
});

var slackTokenEncrypted = BotConfig.admin_config.slack.slack_token_encrypted;
var slackTokenBuf = new Buffer(slackTokenEncrypted, 'base64');
var token = slackTokenBuf.toString("ascii");
console.log(token);
//default config variable would be read from config.json, would be overwrite, if custom config found
if (token) {
    console.log("Starting in single-team mode");
    controller.spawn({
        retry: true,
        token: token
    }).startRTM(function(err, bot, payload) {
        console.log("Loaded config parameters from config.json ");
        if (err) {
            console.log(err);
            throw new Error(err);
        }
    });
}

// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function(bot) {
    console.log('** The RTM api just connected!');
});
controller.on('rtm_close', function(bot) {
    console.log('** The RTM api just closed');
});

/* ************************* SLACK BOT CONTROLLERS ******************************** */
controller.on('bot_channel_join', function(bot, message) {
    bot.reply(message, "Thank you for inviting me to your Slack Channel!");
});

controller.hears(['hello', 'hi', 'greetings'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Hello Human !!  You can invoke commands: `help` or `sample` to get started");
    bot.reply(message, "Hello Human !!  You can invoke commands: `help` or `sample` to get started");
});

controller.hears(['^sof tag=(.*)', '^sof intitle=(.*)', '^sof issues', '^stackoverflow issues'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Stack Overflow issues (.*)!! ");
    var tag = message.match[1];
    var intitle = message.match[2];
    SOFModel.getIssuesWithCustomLabel(bot, message, tag, intitle);
});

controller.hears(['^github issues', '^gh issues'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("GitHub issues !! ");
    var labels = BotConfig.github.public.labels;
    var orgSize = BotConfig.github.public.organizations.length;
    GithubModel.getReposIssuesWithLabel(bot, message, labels, orgSize);
});

controller.hears(['^tweet (.*) (.*)', '^tweet (.*)', '^tweet', '^t (.*) (.*)', '^t (.*)', '^t'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("twitterClient !! ");
    var tweetUser = message.match[1];
    var tweetCount = message.match[2];
    TwitterModel.twitterApiCallCustomUser(bot, message, tweetUser, tweetCount);
});

controller.hears(['^dilbert (.*)', '^dilbert', '^comic (.*)', '^comic'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Dilbert !! ");
    var comicDate = message.match[1];
    DilbertModel.getComic(bot, message, comicDate);
});

controller.hears(['^developer', '^architect'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Dev !! -- Listing developer Details ...");
    DevDetailsModel.getDetails(bot, message);
});

controller.hears(['^sample', '^commands'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("sample !! -- Listing sample commands ...");
    CommandsModel.getDetails(bot, message);
});

controller.hears('help', ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Help !! -- Listing all the supported commands ...");
    HelpModel.getDetails(bot, message);
});
