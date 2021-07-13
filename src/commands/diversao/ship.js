const Discord = require("discord.js");
const block = "⬛";
const heart = ":red_square:";

module.exports = {
  name: "ship",
  aliases: [],
  cooldown: 1000 * 2,
  description: "Veja se um casal daria certo com este comando!",
  category: "fun",
  usage: "@user1 @user2",
  example: "@Spray#0007 @px0#0001",
  args: true,

  async run(client, message, args) {
    const user = message.mentions.users.first();
    if (!user) return;
    if (user && user.id === message.author.id) {
      return message.reply("Você não pode se shipar.")
    }
    if (message.mentions.users.size < 2) {
      let loveEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Shipando...')
        .setDescription(`${message.author} e ${user}!`)
        .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.author.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user.displayAvatarURL({ dynamic: false, format: "png" })}`)
        .addField(`**Porcentagem de amor**`, ship())

      return message.channel.send(loveEmbed)
    } else if (message.mentions.users.size > 1) {
      let luv = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Shipando...')
        .setDescription(`${message.mentions.users.first()} e ${message.mentions.users.last()}!`)
        .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.mentions.users.first().displayAvatarURL({ dynamic: false, format: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ dynamic: false, format: "png" })}`)
        .addField(`**Porcentagem de amor**`, ship())
      message.channel.send(luv)
    }
  }
}

function ship() {
  const hearts = Math.floor(Math.random() * 110) + 0;
  const hearte = (hearts / 10)

  const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
  return str;
}