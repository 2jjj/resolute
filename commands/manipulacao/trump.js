const fetch = require('node-fetch');

module.exports = {
    name: "trump",
    aliases: ["trumpmeme"],
    cooldown: 1000 * 2,
    description: "Trump meme",
    category: "manipulacao",
    usage: "<texto>",
    example: "teste de texto",
    permissoes: {
        membro: [],
        bot: ['ATTACH_FILES', 'Anexar arquivos']
    },
    args: true,

    async run(client, message, args) {

        if (!args[0]) return;
        if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

        let text = args.join(" ");

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new(require("discord.js")).MessageAttachment(json.message, `trump-${message.author.id}.png`);

            message.quote(message.author, attachment).then(m2 => {
                message.channel.stopTyping()
            })
        } catch (e) {
            console.log(e.message)
        };
    }
}