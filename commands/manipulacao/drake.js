const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'drake',
    aliases: [],
    description: 'drake meme',
    category: "manipulacao",
    cooldown: 1000 * 2,
    usage: '<texto1>, <texto2>',
    example: "comprar um ps4, comprar um pc",
    args: true,
    
    async run(client, message, args) {

        const split = args.join(" ").split(",")
        const user = split[0];
        const user2 = split[1]
        const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`, {

        });
        let Image = await res.buffer();
        const drakememe = new Discord.MessageAttachment(Image);
        message.channel.send(drakememe);

    }
}