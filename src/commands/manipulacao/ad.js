const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  name: "ad",
  aliases: ["admeme"],
  cooldown: 1000 * 2,
  description: "ad",
  category: "manipulacao",
  usage: "@user",
  example: "",
  permissoes: {
    membro: [''],
    bot: ['']
  },
  args: false,

  async run(client, message, args) {

    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Ad().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "resolute.png");
    message.channel.send(attach);
  }
}