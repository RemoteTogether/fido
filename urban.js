'use strict';
const http = require('http');

module.exports = function urban(bot, message) {
  const word = encodeURIComponent(message.match[1]);

  http.get(`http://api.urbandictionary.com/v0/define?term=${word}`, res => {
    let body = '';

    res.on('data', chunk => {
      body += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(body);
      const entries = response.list;

      if (entries.length) {
        const entry = entries[0];
        bot.reply(message, `<@${message.user}> ${entry.word}: ${entry.definition}`);
      } else {
        bot.reply(
          message,
          `<@${message.user}> I could not look up that word. Are you sure you typed it correctly?`);
      }
    });
  });
};
