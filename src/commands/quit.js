
'use strict'

const _ = require('lodash');
const config = require('../config');
const game = require('../game');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (teamUsersList, gameList, payload, res) => {

    var attachmentsText = '';

    if (payload.channel_id in gameList) {
        let currentGame = gameList[payload.channel_id];
        attachmentsText = 'Quitting current game in this channel between ' + currentGame.username1 + ' and ' + currentGame.username2;

        delete gameList[payload.channel_id];
    }
    else {
        attachmentsText = 'There isn\'t an active game to quit in this channel';
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

module.exports = { pattern: /quit/ig, handler: handler }
