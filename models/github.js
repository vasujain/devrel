var BotConfig = require('../config.json');
var GithubController =  require('../controller/github');

// GITHUB_PUBLIC_CONFIG
var GITHUB_PUBLIC_AUTH_TOKEN = BotConfig.github.public.auth_token;
var GITHUB_PUBLIC_API_URL = BotConfig.github.public.api_url;
var GITHUB_PUBLIC_ISSUE_STATE = BotConfig.github.public.issue_state;
var GITHUB_PUBLIC_AUTH_TOKEN_DECRYPTED = "token " + new Buffer(GITHUB_PUBLIC_AUTH_TOKEN, 'base64').toString("ascii");

var self = module.exports = {
    // Make a POST call to GITHUB API to fetch all Issues with specific Label's
    getReposIssuesWithLabel:  function (bot, message, labels, orgSize) {
        console.log("*** Invoking getReposIssuesWithLabel ... ***");
        for (var org = 0; org < orgSize; org++) {
            var repoOrg = Object.keys(BotConfig.github.public.organizations[org]);
            var repos = BotConfig.github.public.organizations[org].paypal;
            console.log("repos:" + repos);
            repos.forEach(function(repo) {
                self.getIssuesWithLabel(repo, repoOrg, bot, message, labels[0]);
            });
        }
    },
    getIssuesWithLabel: function (repo, repoOrg, bot, message, label) {
        console.log("*** Invoking githubGetIssuesWithLabel ... ***");
        var url = GITHUB_PUBLIC_API_URL + 'repos/' + repoOrg + '/' + repo + '/issues?labels=' + label + "&state=" + GITHUB_PUBLIC_ISSUE_STATE;
        console.log("url: " + url);
        var request = require('request');
        console.log("GITHUB_PUBLIC_AUTH_TOKEN_DECRYPTED:" + GITHUB_PUBLIC_AUTH_TOKEN_DECRYPTED);
        request({
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'GitBit-slackbot',
                'Authorization': GITHUB_PUBLIC_AUTH_TOKEN_DECRYPTED
            },
            uri: url,
            method: 'GET'
        }, function(err, res, body) {
            console.log(body);
            GithubController.parseAndResponseIssuesJson(body, bot, message, repo, repoOrg, label);
        });
        console.log("*** Invoked githubGetIssuesWithLabel successfully. ***");
    },
    getPullRequest: function (repo, bot, message) {
        console.log("*** Invoking githubGetPullRequest ... ***");
        var request = require('request');
        var url = GITHUB_CORP_API_URL + 'repos/' + GITHUB_CORP_REPO_ORG + repo + '/pulls?state=open';
        console.log(url);
        request({
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': GITHUB_CORP_AUTH_TOKEN_DECRYPTED,
                'User-Agent': 'GitBit-slackbot'
            },
            uri: url,
            method: 'GET'
        }, function(err, res, body) {
            GithubController.parseResponse(body, bot, message, repo, GITHUB_CORP_REPO_ORG);
        });
        console.log("*** Invoked githubGetPullRequest successfully. ***");
    }
};