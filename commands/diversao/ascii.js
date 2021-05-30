const Discord = require ('discord.js')
const figlet = require ("figlet")
module.exports = {
    name: "ascii",
    aliases: ["asciitext"],
    cooldown: 1000 * 2, 
    description: "Converte teu texto em acii!",
    category: "fun",

    async run (client, message, args) {
        figlet.text(args.join(" "), (err, text) => {

            if (err) {
                return message.channel.send(err) 
            }
            
            const embed = new Discord.MessageEmbed()
            .setTitle(`Seu texto em Ascii`)
            .setColor('#36393f')
            .setDescription(`\`\`\`${text.trimRight()}\`\`\``) 
            
            message.channel.send(embed)
        })} }