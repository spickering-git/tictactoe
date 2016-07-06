
'use strict'

/*
this was originally set up to test the bot functionality while I was learning how to use slack
It was just kept in as legacy code
 */

const slack = require('slack')
const _ = require('lodash')
const config = require('./config')

let bot = slack.rtm.client()

bot.started((payload) => {
  this.self = payload.self
})

bot.message((msg) => {
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Tictactoebot',
    text: `test text from Tictactoebot"`
  }, (err, data) => {
    if (err) throw err

    let txt = _.truncate(data.message.text)

    console.log(`response from slack "${txt}"`)
  })
})

module.exports = bot
