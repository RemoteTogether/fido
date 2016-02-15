'use strict';
const Botkit = require('botkit');

// Custom listeners
const urban = require('./urban');
const define = require('./define');
const help = require('./help');

// Expect a SLACK_TOKEN environment variable
const slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
  /* eslint-disable no-console */
  console.error('SLACK_TOKEN is required!');
  /* eslint-enable no-console */
  process.exit(1);
}

const controller = Botkit.slackbot();
const fido = controller.spawn({
  token: slackToken,
});

fido.startRTM(err => {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears('help', ['direct_message', 'direct_mention'], help);

controller.hears('urban (.+)', ['direct_message', 'direct_mention'], urban);

controller.hears('define (.+)', ['direct_message', 'direct_mention'], define);

controller.on('bot_channel_join', (bot, message) => {
  bot.reply(message, "I'm here!");
});

controller.hears(['hello', 'hi'], ['direct_mention'], (bot, message) => {
  bot.reply(message, 'Hello.');
});

controller.hears(['hello', 'hi'], ['direct_message'], (bot, message) => {
  bot.reply(message, 'Hello.');
  bot.reply(message, 'It\'s nice to talk to you directly.');
});

controller.hears('.*', ['mention'], (bot, message) => {
  bot.reply(message, 'You really do care about me. :heart:');
});

// Fallback listener

controller.hears('.*', ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, `Sorry <@${message.user}>, I don't understand.`);
});
