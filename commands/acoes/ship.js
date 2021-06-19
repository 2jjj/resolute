const Discord = require("discord.js")

module.exports = {
  name: "ship",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "Shipe alguém",
  category: "gifs",
  usage: "@user1 @user2",

async run (client, message, args) {

  let user = message.mentions.members.first()
  if (!user || message.author.id === user.id)
    return message.inlineReply("Você não pode fazer um Ship com você mesmo.")
    
  if (user.id === message.author.id) {
    return message.inlineReply('Você não pode usar este comando com você mesmo.')
  }

  var love = Math.random() * 100
  var loveIndex = Math.floor(love / 10)
  var loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex)
  var avatar = message.author.displayAvatarURL({ format: 'png' })

  var embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, avatar)
    .setColor("RED")
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .addField(`${user.user.username} ama você em:`, `💟 ${Math.floor(love)}% \n${loveLevel}`)

  return message.inlineReply(embed)
}}