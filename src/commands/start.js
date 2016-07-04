
'use strict'

const _ = require('lodash')
const config = require('../config')
const trending = require('github-trending')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToebot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (gameList, payload, res) => {
  trending('javascript', (err, repos) => {
    if (err) throw err

    var attachments;

    if (payload.channel_id in gameList)
    {
      attachments = [
        {
          title: 'TicTacToe',
          color: '#2FA44F',
          text: '`payload.channel_name already has an active game`' +
          '\n A channel can have at most one game being played at a time',
          mrkdwn_in: ['text']
        }
      ]
    }
    else
    {
      gameList[payload.channel_id] = 'test'
    }

    var attachments = repos.slice(0, 5).map((repo) => {
      return {
        title: `${repo.owner}/${repo.title} `,
        title_link: repo.url,
        text: `_${repo.description}_\n${repo.language} • ${repo.star}>`,
        mrkdwn_in: ['text', 'pretext']
      }
    })

    let msg = _.defaults({
      channel: payload.channel_name,
      attachments: attachments
    }, msgDefaults)

    res.set('content-type', 'application/json')
    res.status(200).json(msg)
    return
  })
}

module.exports = { pattern: /repos/ig, handler: handler }
