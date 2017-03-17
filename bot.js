var Twit = require('twit');
var config = require('./config');
var chalk = require('chalk');

var connectColor = chalk.cyan.bold;
var eventColor = chalk.magenta.bold;
var successColor = chalk.green.bold;
var errorColor = chalk.red.bold;

var Twitter = new Twit({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token: config.ACCESS_TOKEN,
  access_token_secret: config.ACCESS_TOKEN_SECRET
});

var stream = Twitter.stream('user');

stream.on('connect', function(req) {
  console.log(connectColor('Stream connected'));
});

stream.on('follow', followed);

stream.on('disconnect', function(disconnectMsg) {
  console.log('Stream disconnected')
});

function followed(event) {
  console.log(eventColor('Follow event is running'));
  var screenName = event.source.screen_name;
  tweet(screenName);
}

function tweet(name) {
  var content = {
    status: '@' + name + ' Thanks for following! #yeswecode #flyeaglesfly'
  }
  Twitter.post('statuses/update', content, function(err, data, response) {
    if(err) {
      console.log(errorColor('Error:'), err.message);
    } else {
      console.log(successColor('Success'));
    }
  });
}