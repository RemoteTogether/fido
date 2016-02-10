'use strict';

module.exports = function help(bot, message) {
  const helpText = [
    'I will respond to the following messages:',

    '`@fido hi` for a simple message.',
    '`@fido` to demonstrate detecting a mention.',
    '`@fido define <word>` to look up the word in the dictionary',
    '`@fido urban <word>` to look up the word in the urban dictionary',
    '`bot help` to see this again.',
  ];
  bot.reply(message, helpText.join('\n'));
};
