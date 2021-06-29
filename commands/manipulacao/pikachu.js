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

    async run(client, message, args) {

        const text = args.join(" ")
        let image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(text)}`
        let imgae = new MessageAttachment(image, "pika.png")
        message.channel.send(imgae)
    }
}