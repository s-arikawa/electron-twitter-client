const Twit = require('twit');

module.exports = new Twit({
    consumer_key: 'REDACTED_TWITTER_CONSUMER_KEY',
    consumer_secret: 'REDACTED_TWITTER_CONSUMER_SECRET',
    access_token: 'REDACTED_TWITTER_ACCESS_TOKEN',
    access_token_secret: 'REDACTED_TWITTER_ACCESS_TOKEN_SECRET'
});