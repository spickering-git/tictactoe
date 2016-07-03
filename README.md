# tictactoe
X|O|X
O|X|O
X|O|X


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Supported `/slash` commands

Create a `/tictactoe` [custom slash command](https://api.slack.com/slash-commands), using the URL: `{app-name}.herokuapp.com/commands/tictactoe`. *Take note of the provided `token`, this is used to verify requests come from Slack.*

- `/starbot` or `/starbot help` - List available commands
- `/starbot repos` - Display trending GitHub projects

### Install

```shell
$ npm install
```

### Copy `.env-example` to `.env`

```shell
$ cp .env-example .env
```

### Configure

```shell
NODE_ENV=development
PORT=3000
```
### Run

```shell
$ npm start

🚀 Starbot LIVES on PORT 3000 🚀
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
