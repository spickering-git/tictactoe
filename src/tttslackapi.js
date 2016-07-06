/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

//slack = new Slack(config('SLACK_API_TOKEN'));
//slack.api.test({hello:'world'}, console.log);
//console.log(config('SLACK_API_TOKEN'));
//slack.auth.test({ token: config('SLACK_API_TOKEN')}, function(err,data){
//    console.log(err);

//    console.log(data);
//});

function getTeamUserList(){

    var teamUsersList = {};

    if (config('SLACK_API_TOKEN')) {

        slack.users.list({
            token: config('SLACK_API_TOKEN')
        }, function (err, data) {
            //console.log(err);

            //console.log(data);

            //data;
            //console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
            for(var i = 0; i < data.members.length; i++){
                console.log("users " + data.members[i].name +
                    " " + data.members[i].id);

                teamUsersList[data.members[i].name] = data.members[i].id;
            }

            //console.log('!!!!!!!!!!!!!!!!!!!!!!!');
        });
    }
}

function checkForUser(payload, opponent, teamUsersList){

    if (config('SLACK_API_TOKEN') && teamUsersList != null) {
        if (teamUsersList[opponent] != null) {

                slack.channels.info({
                    token: config('SLACK_API_TOKEN'),
                    channel: payload.channel_id
                }, function (err, data) {

                    var indexVal = data.channel.members.indexOf(teamUsersList[opponent]);
                    console.log('***********************');
                    console.log(indexVal);
                    console.log('***********************');

                    if(indexVal >= 0){
                        return true;
                    }
                    else{
                        return false;
                    }

                });

        }
        else {
            return false;
        }
    }
    else {
        return true;
    }

    var channelUsers;
    var users;

}


//slack.channels.info({token, channel}, (err, data)

//slack.api("users.list", function(err, response) {
//    console.log(response);
//});

module.exports.slack = slack;
module.exports.checkForUser = checkForUser;
module.exports.getTeamUserList = getTeamUserList;