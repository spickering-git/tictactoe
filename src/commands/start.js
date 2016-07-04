
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



    var attachments;

    if (payload.channel_id in gameList)
    {
      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: payload.channel_name + ' channel `already has an active game`' +
          '\n A channel can have at most one game being played at a time.',
          mrkdwn_in: ['text']
        }
      ]
    }
    else
    {
        let opponent = 'test2';

      gameList[payload.channel_id] = new game.game(payload.user_name, opponent);

        var currentGame = gameList[payload.channel_id];

      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: 'New game in ' + payload.channel_name + ' channel.' +
          '\n' + currentGame.username1 + ' vs. ' +
          currentGame.username2 + " " + payload.text,
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
