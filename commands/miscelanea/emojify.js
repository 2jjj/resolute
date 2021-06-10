const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "emojify",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Emojify command.",
    category: "outros",
    usage: "<texto>",

    async run (client, message, args) {

        if(!args.length) return message.reply('Especifique o texto.')
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
          }
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        message.channel.send(text)
    }
}