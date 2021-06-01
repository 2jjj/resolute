const DIG = require("discord-image-generation");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "confusedstonks",
  aliases: ["confusedstonksmeme"],
  cooldown: 1000 * 2, 
  description: "dev",
  category: "manipulacao",

  async run (client, message, args) {

 //   const m = client.findMember(message, args, true);
   
    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.ConfusedStonk().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "resolute.png");
    message.channel.send(attach);
  }
}