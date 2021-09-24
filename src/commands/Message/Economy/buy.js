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
    const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member
    if(!args[0]) return;

    if(args[0] == 'varinha') {
      db.add(`varinhas_${user.id}`)
      message.reply("Sucesso!")
    }

    if(args[0] == 'isca') {
      if(args[1]) {
        let quantidade = args[1];
        db.add(`iscas_${user.id}`, quantidade)
      }  
    } 
  }
}
