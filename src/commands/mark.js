
'use strict'

const _ = require('lodash');
const config = require('../config');
const game = require('../game');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (gameList, payload, res) => {

    var tokens = payload.text.split(" ");

    var attachmentsText = '';

    if (payload.channel_id in gameList)
    {
        if(tokens.length < 3){
            let currentGame = gameList[payload.channel_id];

            let row = tokens[1];
            let column = tokens[2];

            attachmentsText = game.mark(payload, currentGame, row, column);
        }
        else {
            attachmentsText = '*Uh Oh! you didn\'t enter a row and column';
        }
    }
    else
    {
        attachmentsText = '*Uh Oh! there isn\'t an active game in this channel';
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

module.exports = { pattern: /mark/ig, handler: handler }
