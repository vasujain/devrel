var BotConfig = require('../config.json');
var Twitter = require('twitter');
var TwitterController =  require('../controller/twitter');

var twitterClient = new Twitter({
    consumer_key: BotConfig.twitter.consumer_key,
    consumer_secret: BotConfig.twitter.consumer_secret,
    access_token_key: BotConfig.twitter.access_token_key,
    access_token_secret: BotConfig.twitter.access_token_secret
});

module.exports = {
    twitterApiCallCustomUser: function(bot, message, tweetUser, tweetCount){
        console.log("*** Invoking Twitter twitterApiCallCustomUser ... ***");
        tweetUser = (tweetUser === undefined) ? BotConfig.twitter.default_user : tweetUser;
        tweetCount = (tweetCount === undefined) ? BotConfig.twitter.default_tweet_count : tweetCount;
        console.log("tweetUser: " + tweetUser + " tweetCount: " + tweetCount);

        twitterClient.get('statuses/user_timeline', {screen_name: tweetUser, count: tweetCount}, function(error, tweets, response) {
            if(error) {
                console.log(error)
            }
            TwitterController.parseAndResponseJson(response.body, bot, message)
        });
    }
};