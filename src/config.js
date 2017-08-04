require('dotenv').config();

module.exports = {
  EnvironmentVariables: {
  CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  USER_NAME: process.env.USER_NAME
  },
  BotConfig: {
    message: 'Thanks for following!',
  }
}
