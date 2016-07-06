
'use strict'

const _ = require('lodash');
const config = require('../config');
const game = require('../game');

const slack = require('../tttslackapi');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (teamUsersList, gameList, payload, res) => {

    var tokens = payload.text.split(" ");

    var attachmentsText = '';

    if (payload.channel_id in gameList)
    {
        let currentGame = gameList[payload.channel_id];

        attachmentsText = '*Uh Oh!* ' + payload.channel_name + ' channel already has an active game' +
          ' between ' + currentGame.username1 + ' and ' + currentGame.username2 +
          '\n A channel can have at most one game being played at a time.';
    }
    else if(tokens.length < 2)
    {
        attachmentsText = '*Uh Oh!* ' +
                'you forgot to include the username of your opponent';
    }
    else
    {
        let opponent = tokens[1];

        if(slack.checkForUser(payload, opponent, teamUsersList)) {

            gameList[payload.channel_id] = new game.game(payload.user_name, opponent);

            let currentGame = gameList[payload.channel_id];

            attachmentsText = game.getCurrentStatus(currentGame);
        }
        else {
            attachmentsText = '*Uh Oh!* ' + payload.channel_name + ' channel does not include that user.';
        }
    }

    var attachments = [
        {
            title: 'TicTacToe',
            color: '#2FA44F',
            text: attachmentsText,
            mrkdwn_in: ['text']

        }
    ]

    let msg = _.defaults({
      channel: payload.channel_name,
      attachments: attachments
    }, msgDefaults)

    res.set('content-type', 'application/json')
    res.status(200).json(msg)
    return

}

module.exports = { pattern: /start/ig, handler: handler }
