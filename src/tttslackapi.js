/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

var teamUsersList = {};


/*
check that the SLACK_API_TOKEN is authorized
currently only tested with a TEST token issued by slack.
 */
function checkSlackAPIauth(){

    if (config('SLACK_API_TOKEN')){

        slack.auth.test({ token: config('SLACK_API_TOKEN')}, function(err,data){

            if (err != null){
                //console.log("check 2");
            }
            else {
                getTeamUserList();
            }
        });
    }
    
}

/*
get the team user list filling the teamUsersListVariable asynch;
 */
function getTeamUserList(){

    slack.users.list({
        token: config('SLACK_API_TOKEN')
    }, function (err, data) {

        for(var i = 0; i < data.members.length; i++){
            //console.log("users " + data.members[i].name +
            //    " " + data.members[i].id);

            teamUsersList[data.members[i].name] = data.members[i].id;
        }
    });
}

function checkForUser(payload, opponent){

    var userFound = true;

    if (teamUsersList != null) {
        if (teamUsersList[opponent] != null) {

                slack.channels.info({
                    token: config('SLACK_API_TOKEN'),
                    channel: payload.channel_id
                }, function (err, data) {

                    var indexVal = data.channel.members.indexOf(teamUsersList[opponent]);

                    if(indexVal >= 0){
                        userFound = true;
                    }
                    else{
                        userFound = false;
                    }

                });

        }
        else {
            userFound = false;
        }
    }
    else {
        userFound = true;
    }

    return userFound;


}

module.exports.slack = slack;
module.exports.checkForUser = checkForUser;
module.exports.getTeamUserList = getTeamUserList;
module.exports.checkSlackAPIauth = checkSlackAPIauth;