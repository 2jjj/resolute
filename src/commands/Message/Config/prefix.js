const db = require('../../../databases/Schemas/Prefix')

module.exports = {
    name: 'setprefix',
    aliases: ['prefix'],
    cooldown: 1000 * 2,
    description: '',
    category: 'dev',
    usage: '',
    example: '',
    permissoes: {
        membro: ['ADMINISTRATOR', 'Administrador'],
        bot: []
    },
    args: true,
    
    async run (client, message, args) {

        if(!message.member.permissions.has(module.exports.permissoes.membro[0])) return;

        const new_prefix = args[0];
        if(!new_prefix) return;

        if(new_prefix) {
          let data = await db.findOne({guild: message.guild.id})
        
          if(!data) {
              const new_data = await db.create({
                  prefix: new_prefix,
                  guild: message.guild.id
              })
            new_data.save();
            message.reply(`<:outline_check_circle_black_24dp:884962192502423582> **|** Agora o prefixo do servidor é \`${new_prefix}\``)
          } 
 
          if(data) {
            await db.findOneAndUpdate({guild: message.guild.id}, { $set: {prefix: new_prefix}})
            message.reply(`<:outline_check_circle_black_24dp:884962192502423582> **|** Agora o prefixo do servidor é \`${new_prefix}\``)
          }
        }
    }
}