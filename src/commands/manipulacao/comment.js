const canvacord = require('canvacord')
const Discord = require('discord.js');

module.exports = {
    name: "comment",
    aliases: [],
    description: 'Ultiliza seu texto para um comentario do youtube!',
    category: "manipulacao",
    cooldown: 1000 * 2,
    usage: "<texto>",
    example: "oi",
    permissoes: {
        membro: [],
        bot: ['ATTACH_FILES', 'Anexar arquivos']
    },
    args: true,
    
    async run(client, message, args) {

        const comment = args.join('');
        try {
            let yt = await canvacord.Canvas.youtube({
                "avatar": message.author.displayAvatarURL({
                    format: "png"
                }),
                "username": message.author.username,
                "content": args.join(" ")
            })
            let attachment = new Discord.MessageAttachment(yt, 'comment.png')
            message.channel.send(attachment)
        } catch (err) {
            console.log(err)
        }
    }
}