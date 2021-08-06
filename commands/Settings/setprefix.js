const Discord = require("discord.js");

module.exports = {
    name: "prefix",
    aliases: ['setprefix'],
    cooldown: 1000 * 2,
    description: "Já tem um outro bot com este prefixo? sem problemas com este comando você altera meu prefixo!",
    category: "config",
    usage: "<prefixo>",
    example: "!",
    permissoes: {
        membro: ['MANAGE_GUILD', 'Gerenciar Servidor'],
        bot: ['MANAGE_GUILD', 'Gerenciar Servidor']
    },
    args: false,

    async run(client, message, args, cmduser, text, prefix, player) {

        if (!message.member.hasPermission(module.exports.permissoes[0])) return;
        //if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

        let prefixo = new Discord.MessageEmbed()
            .setColor("RANDOM")     
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`Como posso alterar o prefixo?\nA configuração do prefixo é realizado pelo website do Resolute!`)
            .addField(`<:setaaa:860626769089265665> Link para o website:`, `https://painel.resolutebot.xyz/dashboard/${message.guild.id}`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
              }))
            .setTimestamp();
        return message.channel.send(prefixo)
    }
}