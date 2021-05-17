const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const db = require("quick.db")

module.exports = {
    name: 'slowmode',
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");

        if (!args[0]) return message.channel.send('Coloque o tempo para o slowmode!').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Slowmode do canal está desativado.').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Slowmode Desativado.')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('Tempo invalido!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('Esse limite de modo lento é muito alto, digite qualquer coisa menor que 6 horas.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode já está definido para ${args[0]}`);

        embed.setTitle('Slowmode Ativado')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}