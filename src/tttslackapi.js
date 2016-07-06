/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

//slack = new Slack(config('SLACK_API_TOKEN'));
slack.api.test({hello:'world'}, console.log);
//console.log(config('SLACK_API_TOKEN'));
slack.auth.test({ token: config('SLACK_API_TOKEN')}, function(err,data){
    console.log(err);

    console.log(data);
});

function checkForUser(payload, opponent){

    var channelUsers;
    var users;
    if (config('SLACK_API_TOKEN')) {
        slack.channels.info({
            token: config('SLACK_API_TOKEN'),
            channel: payload.channel_id
        }, function (err, data) {
            //console.log(err);

            //console.log(data);

            channelUsers = data.members;

            //console.log(channelUsers);
        });

        slack.users.list({
            token: config('SLACK_API_TOKEN')
        }, function (err, data) {
            //console.log(err);

            //console.log(data);

            users = data.members;

            //console.log(users);
        });

        for(int i = 0; i < users.length; i++){
            console.log(users[i].user + " " + opponent);
        }
    }
}


//slack.channels.info({token, channel}, (err, data)

//slack.api("users.list", function(err, response) {
//    console.log(response);
//});

module.exports.slack = slack;
module.exports.checkForUser = checkForUser;