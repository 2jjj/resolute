const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  name: "stonks",
  aliases: ["stonksmeme"],
  cooldown: 1000 * 2,
  description: "dev",
  category: "manipulacao",
  usage: "@user",
  example: "",
  permissoes: [],
  args: false,

  async run(client, message, args) {

    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Stonk().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "resolute.png");
    message.channel.send(attach);
  }
}