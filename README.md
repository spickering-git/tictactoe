# tictactoe
X|O|X\n
O|X|O\n
X|O|X


### Supported `/slash` commands

Create a `/tictactoe` [custom slash command](https://api.slack.com/slash-commands), using the URL: `{app-name}.herokuapp.com/commands/tictactoe`. *Take note of the provided `token`, this is used to verify requests come from Slack.*

- `/tictactoe` or `/tictactoe help` - displays commands
- `/tictactoe start [opponent username]` - starts a game against an opponent
- `/tictactoe status` - shows the status of the game
- `/tictactoe mark [row] [column]` - enters the current users mark on the board
- `/tictactoe quit` - quits the current game in the channel, any user in the channel can run this command

### Install

```shell
$ npm install
```

### Configure

```shell
NODE_ENV=development
PORT=3000
```
### Run

```shell
$ npm start

tictactoe LIVES on PORT 3000
```

Visit [localhost:3000](http://localhost:3000).

### Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

_Or with the [Heroku Toolbelt](https://toolbelt.heroku.com)_

```shell
$ heroku create {optional-app-name}

Creating app... done, stack is cedar-14
https://xxxx.herokuapp.com/

$ git push heroku master
...
remote: -----> Node.js app detected
...
remote:        https://xxxx.herokuapp.com/ deployed to Heroku
...
To https://git.heroku.com/xxxx.git
 * [new branch]      master -> master

$ heroku open
```
