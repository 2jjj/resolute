const Discord = require('discord.js')
const config = require('../../../config/config.json')

module.exports = {
    name: "eval",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Faça um eval.",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        if (!config.ownerIDS.includes(message.author.id)) return message.channel.send("Apenas desenvolvedores.");

            const code = args.join(' ')
            if (!code) return message.channel.send("kd o eval");

            try {
                const evaled = eval(code)
                let errorStuff = ['token', 'exit']
                if (errorStuff.some(word => message.content.toLowerCase().includes(word))) {

                    const Embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription(`***\`\`\`\n ❎ • Você não pode pegar meu token ou me reiniciar! \`\`\`***`)

                    return message.channel.send({embeds: [Embed] });
                }
                const {
                    inspect
                } = require('util')
                const Embed1 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`**🐱💻 • Eval completo \n\n • Entrada \n \`\`\`\n${code} \`\`\` \n\n • Saida \n \`\`\`\n${inspect(evaled, {depth: 0})}\`\`\` \n\n • Modelo \n \`\`\`\n${typeof(evaled)} \`\`\` \n\n ⌛ • Tempo \n \`\`\`\n${Date.now() - message.createdAt}ms\`\`\`**`)

                message.channel.send({embeds: [Embed1] })
            } catch (err) {
                const Embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`**🐱💻 • Eval não completo \n\n • Código \n \`\`\`\n${code}\`\`\` \n\n • Erro \n \`\`\`\n${err}\`\`\`**`)
                message.channel.send({embeds: [Embed] })
            }
        }
    }