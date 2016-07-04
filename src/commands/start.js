
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (gameList, payload, res) => {



    var attachments;

    if (payload.channel_id in gameList)
    {
      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: payload.channel_name + '` already has an active game`' +
          '\n A channel can have at most one game being played at a time.',
          mrkdwn_in: ['text']
        }
      ]
    }
    else
    {
      gameList[payload.channel_id] = 'test'

      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: '`test`' +
          '\n START',
          mrkdwn_in: ['text']
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

module.exports = { pattern: /start/ig, handler: handler }
