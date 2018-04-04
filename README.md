# DevRel Slack Bot

## The story of DevRel (Slack) bot
Developer relations bot

## What is DevRel Slack Bot or What does it do ?
DevRel Slack Bot is a Bot for Slack teams that they can configure and quickly have a look at open pull requests in their configured repositories/unanswered stack overflow questions and Tweets for a username. 

## Setup Instructions
1. Fork this project.
2. Open up your favorite terminal app, and clone your new repository to your local computer.
3. This is a Node.js project, so you’ll need to install the various dependencies by running: `npm install` to get all the node_modules
4. Update Organization/Repositories/StackOverflow Details in `config.json`.
5. Add a bot Integration to your slack channel at https://{{$slack_channel}}.slack.com/apps/new/A0F7YS25R-bots
6. From the terminal you can run your bot easily:

    ```bash
    TOKEN=xoxb-your-token-here npm start
    ```
 (Copy token from Integration Settings >> API Token)
7. Once started Go to slack and find a new bot user "devrel" added
8. Start talking to Bot via commands like : 
   * pr all -- Display all open Pull requests in all The Github Repos configured in config.json
   * pr `{$repo1_key}` -- Display all open Pull requests in the Github Repos `{$repo1_name}` configured for `{$repo1_key}` configured in `config.json`

[Schema & Sample JSON](../master/schema)

## SlackBot Interaction Commands

1. `sof issues` or  `stackoverflow issues`
2. `sof tag=java`
3. `tweet`
4. `tweet paypaluk 10`
5. `github issues`
6. `dilbert` or `comics`

## Support/Request new features
For Support / Requesting new features [Create an Issue](https://github.com/vasujain/devrel/issues)  
