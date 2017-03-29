const Twit = require('twit');
const config = require('./config');
const chalk = require('chalk');

const connectColor = chalk.cyan.bold;
const eventColor = chalk.magenta.bold;
const successColor = chalk.green.bold;
const errorColor = chalk.red.bold;

const username = config.USER_NAME;

const Twitter = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
});

const stream = Twitter.stream('user');

stream.on('connect', (req) => {
  console.log(connectColor('Stream connected'));
});

stream.on('follow', followed);

stream.on('disconnect', (disconnectMsg) => {
  console.log('Stream disconnected')
});

function followed(event) {
  console.log(eventColor('Follow event is running'));
  let screenName = event.source.screen_name;
  tweet(screenName);
}

function tweet(name) {
  let content = {
    status: '@' + name + ' Thanks for following! #yeswecode #flyeaglesfly'
  }
  
  if(name !== username) {
    Twitter.post('statuses/update', content, (err, data, response) => {
      if(err) {
        console.log(errorColor('Error:'), err.message);
      } else {
        console.log(successColor('Success'));
      }
    });
  } else {
    console.log('Skipped self tweet.')
  }
}