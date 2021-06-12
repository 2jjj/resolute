const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'globalban',
    description: 'Globally ban a user from your server.',
    timeout: 5000,
    usage: '<user.id> <reason>',
    aliases: ['globalban'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Você não tem a permissão de  \`BAN_MEMBERS\`')
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('Eu não tenho a permissão de \`BAN_MEMBERS\`')

        let userID = args[0]
        let reason = args.slice(1).join(' ') || 'Sem razão especificada.'

        if(!userID) return message.reply('Coloque o ID do membro que quer banir.')
        if(isNaN(userID)) return message.reply('O id é um número kkk.')

        if(userID === message.author.id) return message.reply('Você não pode se banir.')
        if(userID == client.user.id) return message.reply('Você não pode me banir com o **meu própio** comando.')

        client.users.fetch(userID).then(async(user) => {
            await message.guild.members.ban(user.id, {reason: reason})
            const bannedEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`<@${user.id}> foi banido por ${message.author} razão: \`${reason}\``)
            message.channel.send(bannedEmbed)

            client.modlogs ({
                Member: user,
                Color: 'RED',
                Reason: reason,
                Action: 'Global ban'
            }, message)
            
        }).catch(err => {
            return message.reply(`Erro **${err}**`)
        }) 
        
        
    }
}
