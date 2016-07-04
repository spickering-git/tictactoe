
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
          text: '*Uh Oh!* ' + payload.channel_name + ' channel already has an active game' +
          ' between ' + currentGame.username1 + ' and ' + currentGame.username2 +
          '\n A channel can have at most one game being played at a time.',
          mrkdwn_in: ['text']
        }
      ]
    }
    else if(tokens.length < 2)
    {
        attachments = [
            {
                title: 'TicTacToe',
                color: '#2FA44F',
                text: '*Uh Oh!* ' +
                'you forgot to include the username of your opponent',
                mrkdwn_in: ['text']
            }
        ]
    }
    else
    {
        let opponent = tokens[1];

      gameList[payload.channel_id] = new game.game(payload.user_name, opponent);

        let currentGame = gameList[payload.channel_id];

      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: 'New game in ' + payload.channel_name + ' channel.' +
          '\n' + currentGame.username1 + ' vs. ' +
          currentGame.username2 + " " + payload.text + " " +
              payload.channel_id +
              '\n' + game.drawCurrentBoard(currentGame)
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
