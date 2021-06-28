const Discord = require("discord.js")
const db = require("quick.db")


module.exports = {
    name: "imc",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Pegar a imagem de um emoji pelo nome.",
    category: "outros",
    usage: "70 65",
  
    async run (client, message, args) {
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    let color = await db.get(`color_${message.author.id}`)
    if (color === null) color = 'RANDOM'

    let weight = args[0]
    let height = args[1]

    let imc = (weight / ((height * height) / 10000)).toFixed(2)

    if (args[0] && args[1]) {
        let category;
        if (imc < 18.5) category = "Abaixo do peso"
        if (imc > 24.9) category = "Acima do peso"
        if (imc > 30) category = "Obesidade"
        if (imc < 24.9 && imc > 18.5) category = "Padrão"

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`📉 Índice de Massa Corporal`)
            .addField('Peso', weight)
            .addField('Altura', height)
            .addField('IMC', imc)
            .addField('Categoria', category)

        return message.inlineReply(embed)
    } else {
        return message.inlineReply('Algo deu errado, por favor, verifique os dados informados e tente novamente.')
    }
}}