const {
    MessageAttachment
} = require("discord.js")
module.exports = {
    name: "pikachu",
    aliases: [],
    cooldown: 1000 * 2,
    description: "",
    category: "manipulacao",
    usage: "<texto>",
    example: "pika pika",
    permissoes: {
        membro: [],
        bot: ['ATTACH_FILES', 'Anexar arquivos']
      },
    args: true,

    async run(client, message, args) {
    
        if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

        const text = args.join(" ")
        let image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(text)}`
        let imgae = new MessageAttachment(image, "pika.png")
        message.channel.send(imgae)

    }
}