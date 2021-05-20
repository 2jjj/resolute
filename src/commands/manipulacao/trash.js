const DIG = require("discord-image-generation");
const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async (bot, message, args) => {

let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    let img = new DIG.Trash().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "trash.png");
    message.channel.send(attach);
  }