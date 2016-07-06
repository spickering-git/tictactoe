
'use strict'

const _ = require('lodash');
const config = require('../config');
const game = require('../game');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (globalTicTacToeObject, payload, res) => {

    var gameList = globalTicTacToeObject.gameList;

    var tokens = payload.text.split(" ");

    var attachmentsText;

    if (payload.channel_id in gameList)
    {
        let currentGame = gameList[payload.channel_id];

        attachmentsText = game.getCurrentStatus(currentGame);
    }
    else
    {
        attachmentsText = 'There is not an active game in this channel. You should start one!';
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

module.exports = { pattern: /status/ig, handler: handler }
