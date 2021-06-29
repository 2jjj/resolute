const Discord = require('discord.js')
const ownerid = "836345581424738354";

module.exports = {
    name: "eval",
    description: "Owner Only Command",
    aliases: [],
    category: "dev",
    description: "Apenas para devs.",
    usage: "Este comando só pode ser ultilizado por desenvolvedores do Resolute.",

    async run (client, message, args) {

    
        if (message.author.id == ownerid) {

            message.delete()
            const code = args.join(' ')

            if (!code) return;

            try {
                const evaled = eval(code)
                let errorStuff = ['token', 'exit']
                if (errorStuff.some(word => message.content.toLowerCase().includes(word))) {

                    const Embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription(`***\`\`\`\n ❎ • Você não pode pegar meu token ou me reiniciar! \`\`\`***`)

                    return message.channel.send(Embed).then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                }
                const { inspect } = require('util')
                const Embed1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`**🐱💻 • Evaculated Complete \n\n • Input \n \`\`\`\n${code} \`\`\` \n\n • Output \n \`\`\`\n${inspect(evaled, {depth: 0})}\`\`\` \n\n • Type \n \`\`\`\n${typeof(evaled)} \`\`\` \n\n ⌛ • Time Taken \n \`\`\`\n${Date.now() - message.createdAt}ms\`\`\`**`)

                message.channel.send(Embed1)
            } catch (err) {
                const Embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`**🐱💻 • Evaculated Not Complete \n\n • Code \n \`\`\`\n${code}\`\`\` \n\n • Error \n \`\`\`\n${err}\`\`\`**`)
                message.channel.send(Embed)
            }
        } else {
            message.channel.send("Você não é o Spray#0007 xD")
        }
    }
}