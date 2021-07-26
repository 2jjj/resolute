const blacklist = require('../.././database/mongoDB/blacklist')
const Discord = require("discord.js");

module.exports = {
    name: "blacklist-add",
    aliases: ['blacklist', 'tchau'],
    cooldown: 1000 * 2,
    description: "Adicionar um usuário na blacklist.",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: true,

    async run(client, message, args) {
    
    
        let motivo = args.slice(1).join(" ");
        if (message.author.id !== '836345581424738354') return message.channel.send('no')
        const User = message.guild.members.cache.get(args[0])
        if (!User) return;

        blacklist.findOne({
            id: User.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.send(`**${User.displayName}** já está na blacklist!`)
            } else {
                data = new blacklist({
                    id: User.user.id
                })
                data.save()
                    .catch(err => console.log(err))
                const embed = new Discord.MessageEmbed()
                    .setTitle("Resolute")
                    .setColor("RANDOM")
                    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                    .addField(`Usuário adicionado na blacklist`, `ﾠ<:setaaa:860626769089265665> ${User.user} | \`${User.id}\``)
                    .addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
                    .addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
                    .setFooter("Resolute - Blacklist 😎", message.author.displayAvatarURL())
                    .setTimestamp();
                message.channel.send(embed);
            }
        })
    }
}