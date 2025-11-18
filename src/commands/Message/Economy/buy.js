const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'buy',
  aliases: ['shop'],
  cooldown: 1000 * 2,
  description: '',
  category: 'economia',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run (client, message, args) {
    if(!args[0]) return;
    const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member

    if(args[0] == 'varinha') {
      db.add(`varinhas_${user.id}`, 1)
      message.reply("Sucesso!")
    }

    if(args[0] == 'iscas') {
      if(args[1]) {
        message.reply("Sucesso!")
        db.add(`iscas_${user.id}`, quantidade)
      }  
    } 
  }
}
