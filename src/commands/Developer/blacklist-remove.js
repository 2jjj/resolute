const blacklist = require('../../databases/Schemas/blacklist')
const Discord = require("discord.js");
const config = require('../../config/config.json')

module.exports = {
    name: "blacklist-remove",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Adicionar um usário na blacklist do Resolute.",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: true,

    async run(client, message, args) {

        if (message.author.id !== '836345581424738354') return message.channel.send('no')
        let motivo = args.slice(1).join(" ");

        const User = message.guild.members.cache.get(args[0])
        if (!User) return;

        blacklist.findOne({ id: User.user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await blacklist.findOneAndDelete({
                        id: User.user.id
                    })
                    .catch(err => console.log(err))
                const embed = new Discord.MessageEmbed()
                    .setTitle("Resolute")
                    .setColor("RANDOM")
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                    .addField(`Usuário REMOVIDO da blacklist`, `ﾠ<:setaaa:860626769089265665> ${User.user} | \`${User.id}\``)
                    .addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
                    .addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
                    .setFooter("Resolute - Blacklist 😎", message.author.displayAvatarURL())
                    .setTimestamp();
                message.channel.send(embed);
            } else {
                message.channel.send(`**${User.displayName}** Não está na blacklist.`)
            }

        })
    }
} 