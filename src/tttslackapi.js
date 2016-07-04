/**
 * Created by user on 7/4/2016.
 */
const Slack = require('slack')
const config = require('./config')

slack = new Slack(config('SLACK_API_TOKEN'));

slack.api("users.list", function(err, response) {
    console.log(response);
});

module.exports = slack