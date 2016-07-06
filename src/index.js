
'use strict'

const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const _ = require('lodash');
const config = require('./config');
const commands = require('./commands');
const helpCommand = require('./commands/help');
const slackapi = require('./tttslackapi');

let bot = require('./bot');

let app = express();

//this makes the call to the slack authorization webapi to test the token
//asych so done on startup
slackapi.checkSlackAPIauth();


var globalTicTacToeObject = {};
globalTicTacToeObject.gameList = {};

if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: (req, res) => { return require('url').parse(req.url).path }
  }))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('\n Connected to tictactoe \n') })

app.post('/commands/tictactoe', (req, res) => {
  let payload = req.body

  if (!payload || payload.token !== config('TICTACTOE_COMMAND_TOKEN')) {
    let err = 'An invalid slash token was provided\n' +
              '   Is your Slack slash token correctly configured?'
    console.log(err)
    res.status(401).end(err)
    return
  }

  let cmd = _.reduce(commands, (a, cmd) => {
    return payload.text.match(cmd.pattern) ? cmd : a
  }, helpCommand)

  
  cmd.handler(globalTicTacToeObject, payload, res)
})

app.listen(config('PORT'), (err) => {
  if (err) throw err

  console.log(`\n tictactoe LIVES on PORT ${config('PORT')}`)

  //if (config('SLACK_TOKEN')) {
  //  console.log(`@tictactoe_bot is real-time\n`)
  //  bot.listen({ token: config('SLACK_TOKEN') })
  //}
})
