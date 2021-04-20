const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const sayMessage = args.join(' ');
  message.delete().catch(O_o => {});
  message.channel.send(sayMessage);
};