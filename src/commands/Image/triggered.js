const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
  name: "triggered",
  aliases: ["provocado"],
  cooldown: 1000 * 2,
  description: "Triggered",
  category: "manipulacao",
  usage: "@user",
  example: "",
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: false,

  async run(client, message, args) {

    if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

    let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let gif = await new DIG.Triggered().getImage(avatar);

    let attach = new Discord.MessageAttachment(gif, "resolute.gif");
    message.channel.send(attach);
  }
}