
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

    var attachments;

    if (payload.channel_id in gameList)
    {
        let currentGame = gameList[payload.channel_id];

      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: game.getCurrentStatus(currentGame),
          mrkdwn_in: ['text']
        }
      ]
    }
    else
    {
      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: 'There is not an active game in this channel. You should start one!'
        }
      ]
    }


    let msg = _.defaults({
      channel: payload.channel_name,
      attachments: attachments
    }, msgDefaults)

    res.set('content-type', 'application/json')
    res.status(200).json(msg)
    return

}

module.exports = { pattern: /status/ig, handler: handler }
