/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

//slack = new Slack(config('SLACK_API_TOKEN'));
slack.api.test({hello:'world'}, console.log);
console.log(config('SLACK_API_TOKEN'));
slack.auth.test(config('SLACK_API_TOKEN'), function(err,data){
    console.log(err);
});

//slack.api("users.list", function(err, response) {
//    console.log(response);
//});

module.exports.slack = slack;