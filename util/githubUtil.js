var BotConfig = require('../config.json');

module.exports = {
    // Check if a Valid team name slected in slack channel. Matches with config.json
    isValidTeam: function(repo, teamObj) {
        console.log("*** Checking if a Valid team name is slected in slack channel.... ***");
        var teamLength = teamObj.length;
        for (var i = 0; i < teamLength; i++) {
            var teamStr = Object.keys(BotConfig.github.corporate.repos.teams[i]);
            if (teamStr == repo) {
                console.log("isValidRepo:true\n");
                return true;
            }
        }
        console.log("isValidRepo:false\n");
        return false;
    },
    // Check if a Valid repo slected in slack channel. Matches with config.json
    isValidRepo : function(repo, teamObj) {
        console.log("*** Checking if a Valid repo is slected in slack channel.... ***");
        var reposLength = repos.teams.length;
        for (var repoList = 0; repoList < reposLength; repoList++) {
            var repoTeam = Object.keys(repos.teams[repoList]);
            console.log("repoTeam: - " + repoTeam);
            var teamRepos = repos.teams[repoList][repoTeam];
            var repoTeamLength = repos.teams[repoList][repoTeam].length;
            for (var i = 0; i < teamRepos.length; i++) {
                if (teamRepos[i] == repo) {
                    console.log("isValidRepo:true\n");
                    return true;
                }
            }
        }
        console.log("isValidRepo:false\n");
        return false;
    }
};