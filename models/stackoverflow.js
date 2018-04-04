var BotConfig = require('../config.json');
var zlib = require("zlib");
var https = require('https'); //Use NodeJS https module
var SOFController =  require('../controller/stackoverflow');

module.exports = {
    getIssuesWithCustomLabel: function(bot, message, tag, intitle) {
        console.log("*** Invoking getStackoverflowIssues ... ***");

        if(tag === undefined) {
            intitle = (intitle === undefined) ? BotConfig.stackoverflow.intitle : intitle;
        } else {
            intitle ="";
        }
        tag = (tag === undefined) ? BotConfig.stackoverflow.tag : tag;

        var url = BotConfig.stackoverflow.api_url + '2.2/search'
            + '?order=' + BotConfig.stackoverflow.order
            + '&sort=' + BotConfig.stackoverflow.sort
            + '&tagged=' + tag
            + '&intitle=' + intitle
            + '&site=' + BotConfig.stackoverflow.site
            + '&access_token=' + BotConfig.stackoverflow.access_token
            + '&key=' + BotConfig.stackoverflow.key;

        console.log("url" + url);
        https.get(url, function(response) {
            if (response.statusCode == 200) {
                var gunzip = zlib.createGunzip();
                var jsonString = '';
                response.pipe(gunzip);
                gunzip.on('data', function(chunk) {
                    jsonString += chunk;
                });
                gunzip.on('end', function() {
                    SOFController.parseAndResponseJson(jsonString, bot, message, tag, intitle);
                });
                gunzip.on('error', function(e) {
                    console.log("Error while parsing SOF response");
                    console.log("jsonString : \n" + jsonString);
                    console.log(" \n");
                    console.log(e);
                    botErrorHandler(e, bot, message)
                });
            } else {
                console.log(response);
                var gunzip = zlib.createGunzip();
                var jsonString = '';
                response.pipe(gunzip);
                gunzip.on('data', function(chunk) {
                    jsonString += chunk;
                });
                gunzip.on('end', function() {
                    console.log("jsonString: " + jsonString);
                });
                console.log("Error - While parsing SOF response. Response.statusCode: " + response.statusCode);
            }
        });
        console.log("*** Invoked getStackoverflowIssues successfully. ***");
    }
};