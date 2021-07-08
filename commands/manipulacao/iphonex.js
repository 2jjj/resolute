const Discord = require('discord.js');
const fetch = require('node-fetch') //npm i node-fetch if you have it then dont do it :\

module.exports = {
    name: 'iphonex',
    aliases: [],
    category: 'manipulacao',
    description: 'Iphone X User Profile',
    usage: 'iphonex <user>',
    cooldown: 1000 * 2,
    run: async (client, message, args) => {
    
        let mention = message.mentions.members.first();

        let m = await message.channel.send("**Aguarde...**");

        if (!mention) return;

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=iphonex&url=${mention.user.displayAvatarURL({ size: 1024 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "iphonex-syze.png");
            await message.channel.send(attachment);
            message.channel.stopTyping();
            m.delete();
        } catch (e) {
            m.edit("⚠ Erro!");
            //return message.channel.stopTyping();
        }
    }
};