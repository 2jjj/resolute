const Discord = require("discord.js")
const db = require("quick.db")
const Respostas8Ball = require("./8ball.json")

module.exports = {
    name: "8ball",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Faça um pergunta ao 8ball",
    category: "fun",
    usage: "<Pegunta>",

    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "-" }

    let respostas = Respostas8Ball[Math.floor(Math.random() * Respostas8Ball.length)]
    let pergunta = args.join(" ")

    if (!pergunta) {
        const help = new Discord.MessageEmbed()
        .setTitle("Comando de 8ball")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription("Faça um pergunta ao 8ball.")
        .addField(`Forma de Utilização:`, ` \`${prefix}8ball <pergunta>\``)
        .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setImage(rand)
        .setTimestamp();
        return message.channel.send(help);
    }

    setTimeout(function () {
        message.inlineReply(respostas)
    }, 2000)
    return message.inlineReply('Buscando resposta divina...').then(msg => msg.delete({ timeout: 1900 }).catch(err => { return }))

}}