/**
 * Created by user on 7/4/2016.
 */
const slack = require('slack')
const config = require('./config')

var teamUsersList = {};


//slack = new Slack(config('SLACK_API_TOKEN'));
//slack.api.test({hello:'world'}, console.log);
//console.log(config('SLACK_API_TOKEN'));
//slack.auth.test({ token: config('SLACK_API_TOKEN')}, function(err,data){
//    console.log(err);
//
//    console.log(data);
//});



function checkSlackAPIauth(){

    if (config('SLACK_API_TOKEN')){
        console.log("check 1");

        slack.auth.test({ token: config('SLACK_API_TOKEN')}, function(err,data){

            console.log(err);
            console.log(data);

            if (err != null){
                console.log("check 2");
            }
            else {
                getTeamUserList();
            }
        });
    }
    else {
        console.log("check 4");
    }

    console.log("check 5");
    //return false;
        
    
}

function getTeamUserList(){


    //var teamUsersList = {};

    //if () {

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
    //}

    //return teamUsersList;
}

function checkForUser(payload, opponent){

    var userFound = true;

    console.log("TEST * " + teamUsersList);

    if (teamUsersList != null) {
        if (teamUsersList[opponent] != null) {

            console.log(config('SLACK_API_TOKEN'))

                slack.channels.info({
                    token: config('SLACK_API_TOKEN'),
                    channel: payload.channel_id
                }, function (err, data) {

                    var indexVal = data.channel.members.indexOf(teamUsersList[opponent]);
                    console.log('***********************');
                    console.log(indexVal);
                    console.log('***********************');

                    if(indexVal >= 0){
                        console.log('TEST1');
                        userFound = true;
                    }
                    else{
                        console.log('TEST2');
                        userFound = false;
                    }

                });

        }
        else {
            console.log('TEST3');
            userFound = false;
        }
    }
    else {
        console.log('TEST4');
        userFound = true;
    }

    return userFound;


}


//slack.channels.info({token, channel}, (err, data)

//slack.api("users.list", function(err, response) {
//    console.log(response);
//});

module.exports.slack = slack;
module.exports.checkForUser = checkForUser;
module.exports.getTeamUserList = getTeamUserList;
module.exports.checkSlackAPIauth = checkSlackAPIauth;