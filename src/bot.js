const Twit = require('twit')
const envVars = require('./config').EnvironmentVariables
const botConfig = require('./config').BotConfig

const chalk = require('chalk')
const connectColor = chalk.cyan.bold
const eventColor = chalk.magenta.bold
const successColor = chalk.green.bold
const errorColor = chalk.red.bold

const username = envVars.USER_NAME

const Twitter = new Twit({
  consumer_key: envVars.CONSUMER_KEY,
  consumer_secret: envVars.CONSUMER_SECRET,
  access_token: envVars.ACCESS_TOKEN,
  access_token_secret: envVars.ACCESS_TOKEN_SECRET
})

const stream = Twitter.stream('user')

stream.on('connect', (req) => {
  console.log(connectColor('Stream connected'));
})

stream.on('follow', followed)

stream.on('disconnect', (disconnectMsg) => {
  console.log('Stream disconnected')
})

function followed(event) {
  console.log(eventColor('Follow event is running'));
  let screenName = event.source.screen_name;
  tweet(screenName)
}

function tweet(name) {
  let content = {
    status: `@ ${name} ${botConfig.message}`
  }

  if(name !== username) {
    Twitter.post('statuses/update', content, (err, data, response) => {
      if(err) {
        console.log(errorColor('Error:'), err.message);
      } else {
        console.log(successColor('Success'));
      }
    })
  } else {
    console.log('Skipped self tweet.')
  }
}