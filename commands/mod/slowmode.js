const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "slowmode",
    aliases: ['slow'],
    cooldown: 1000 * 2, 
    description: "Colocar Slowmode em um canal.",
    category: "mod",
    usage: "<tempo(MS)> || Exemplo: slowmode 1000",

    async run (client, message, args) {
    
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("<:1598blurplesupport:856520144599777291> **|** Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");
        if (!args[0]) {
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de slowmode")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Coloque o modo lento no chat!")
            .addField(`Forma de Utilização:`, `<:pontin:852197383974551582> \`${prefix}slowmode <tempo(ms)>\``)
            .addField(`Como desligar:`, `<:pontin:852197383974551582> \`${prefix}slowmode off\``)
            .addField(`Exemplo:`, `<:pontin:852197383974551582> \`${prefix}slowmode 5000\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();
            return message.channel.send(help);
        }

        const currentCooldown = message.channel.rateLimitPerUser;
        const reason = args[1] ? args.slice(1).join(' ') : 'Sem motivos.';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send(`<:v_:856894534184468480> **|** O slowmode foi desativado com sucesso por ${message.author}`)

            embed.setTitle('Slowmode Desativado.')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('<:x_:856894534071746600> **|** O tempo que você colocou é inválido!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('<:x_:856894534071746600> **|** Esse limite de modo lento é muito alto, digite qualquer coisa menor que 6 horas.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`O Slowmode já está definido para ${args[0]}`);

        embed.setTitle('Slowmode Ativado com sucesso!')
            .addField('Slowmode: ', args[0])
            .addField('Ativado por: ', message.author)
            .addField('Razão: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}