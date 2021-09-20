const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('PREFIX SCHEMA FILE PATH')

module.exports = {
    name: 'setprefix',
    aliases: ['prefix'],
    cooldown: 1000 * 2,
    description: '',
    category: 'dev',
    usage: '',
    example: '',
    permissoes: [],
    args: false,
    
    async run (client, message, args) {

        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You need `ADMINISTRATOR` permission to run this command.')


        const new_prefix = args[0];
        if(!new_prefix) return message.reply({content: 'Please specify a new prefix you want to send!'})

        if(new_prefix) {
          let data = await db.findOne({guild: message.guild.id})
        

          if(!data) {
              const new_data = await db.create({
                  prefix: new_prefix,
                  guild: message.guild.id
              })
              new_data.save();
              message.reply(`The server prefix is now changed to \`${new_prefix}\``)
          } 
 
          if(data) {
              await db.findOneAndUpdate({guild: message.guild.id}, { $set: {prefix: new_prefix}})
              message.reply(`The server prefix is now changed to \`${new_prefix}\``)

          }
        
        }

    }
}