const Discord = require(`discord.js`)
const {
    MessageEmbed
} = require(`discord.js`)
const config = require(`../../config/config.json`)
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`)
const {
    createBar,
    format
} = require(`../../handlers/functions`);
module.exports = {
    name: `searchplaylist`,
    category: `🎶 Music`,
    aliases: [`searchpl`],
    description: `Searches a playlist from youtube`,
    usage: `searchplaylist <Name / URL>`,
    example: "",
    permissoes: [],
    cooldown: 8,
    args: false,
    parameters: { "type": "music", "activeplayer": false, "previoussong": false },
    run: async (client, message, args, cmduser, text, prefix, player) => {
        try {
            message.channel.send(`THIS CMD IS NOT FINISHED YET!`)
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
                .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
            );
        }
    }
};