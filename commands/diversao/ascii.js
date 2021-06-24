const Discord = require ('discord.js')
const figlet = require ("figlet")

module.exports = {
    name: "ascii",
    aliases: ["asciitext"],
    cooldown: 1000 * 2, 
    description: "Converte o seu texto em para ascii!",
    category: "fun",
    usage: "<texto>",

    async run (client, message, args) {
        figlet.text(args.join(" "), (err, text) => {

            if (err) {
                console.log(err) 
                return message.channel.send(`Um erro ocorreu! -> \`${err}\` **|** Mande este erro no servidor de suporte! -> https://discord.gg/9rwuhF6CJz`)
            }
            
            const embed = new Discord.MessageEmbed()
            .setTitle(`Ascii`)
            .setColor('#36393f')
            .setDescription(`\`\`\`${text.trimRight()}\`\`\``) 
            
            message.channel.send(embed)
        })} }