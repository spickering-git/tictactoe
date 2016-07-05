
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

    if (payload.channel_id in gameList)
    {
        attachmentsText = 'Quitting current game in this channel'

        delete gameList[payload.channel_id];
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
