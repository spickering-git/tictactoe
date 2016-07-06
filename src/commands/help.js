
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'TicTacToe',
    color: '#2FA44F',
    text: '`/tictactoe start [username]` play tictactoe with username' +
		'\n`/tictactoe status` returns current board and whose turn it is' +
		'\n`/tictactoe mark [row] [column]` mark an empty space row (1,2 or 3) and column (1,2 or 3) of the board' +
        '\n`/tictactoe quit` quits the current game in the channel' +
        '\n`/tictactoe help`',
    mrkdwn_in: ['text']
  }
]

const handler = (teamUsersList, gameList, payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
