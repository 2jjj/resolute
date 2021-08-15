const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
    name: "prefix",
    aliases: ['setprefix', "prefixo"],
    cooldown: 1000 * 2,
    description: "Altere meu prefixo!",
    category: "config",
    usage: "",
    example: "",
    permissoes: {
        membro: ['MANAGE_GUILD', 'Gerenciar Servidor'],
        bot: ['MANAGE_GUILD', 'Gerenciar Servidor']
    },
    args: true,

    run: async (client, message, args) => {
        try {
            
            if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
            if(!args[0]) return;
            //if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

            let prefix = client.settings.get(message.guild.id, `prefix`);

            if (prefix === null) prefix = config.prefix;

            if (!args[0]) return;

            if (args[1])
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} Erro | O prefixo não pode ter 2 espaços.`)
                );

            if (args[0].length > 5)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} Erro | O prefixo não pode ser maior do que 5!`)
                );

            client.settings.set(message.guild.id, args[0], `prefix`);

            return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} Successo | Alterei o prefixo para **\`${args[0]}\`**`)
            );
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
                .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
            );
        }
    }
};