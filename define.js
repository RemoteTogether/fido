'use strict';
const http = require('http');
const libxmljs = require('libxmljs');

module.exports = function define(bot, message) {
  const reference = 'collegiate';
  const word = message.match[1];
  const websterApiKey = process.env.WEBSTER_API_KEY;

  if (!websterApiKey) {
    /* eslint-disable no-console */
    console.error('WEBSTER_API_KEY is required!');
    /* eslint-enable no-console */
    process.exit(1);
  }

  const url = `http://www.dictionaryapi.com/api/v1/references/${reference}/xml/${encodeURIComponent(word)}?key=${encodeURI(websterApiKey)}`;

  http.get(url, res => {
    let body = '';

    res.on('data', chunk => {
      body += chunk;
    });

    res.on('end', () => {
      try {
        const xmlDoc = libxmljs.parseXml(body);
        const entries = xmlDoc.root().childNodes();
        const entry = entries[0];
        const typeObj = entry.get('//fl');
        const definitionObj = entry.get('//def/dt');
        const type = typeObj.text();
        const definition = definitionObj.text().replace(':', '');

        bot.reply(message, `<@${message.user}> ${word} (${type}) ${definition}`);
      } catch (ex) {
        /* eslint-disable max-len */
        bot.reply(message, `Sorry, <@${message.user}>, I could not look up that word. Are you sure you typed it correctly?`);
        /* eslint-enable max-len */
      }
    });
  }).on('error', () => {
    /* eslint-disable max-len */
    bot.reply(message, `Sorry, <@${message.user}, I encountered an error when trying to find the definition for ${word}`);
    /* eslint-enable max-len */
  });
};
