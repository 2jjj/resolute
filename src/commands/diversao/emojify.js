module.exports = {
    name: "emojify",
    aliases: [],
    cooldown: 1000 * 2,
    description: ":regional_indicator_f::regional_indicator_a::regional_indicator_c::regional_indicator_a:   :regional_indicator_a::regional_indicator_s:   :regional_indicator_p::regional_indicator_a::regional_indicator_l::regional_indicator_a::regional_indicator_v::regional_indicator_r::regional_indicator_a::regional_indicator_s:   :regional_indicator_f::regional_indicator_i::regional_indicator_c::regional_indicator_a::regional_indicator_r::regional_indicator_e::regional_indicator_m:   :regional_indicator_a::regional_indicator_s::regional_indicator_s::regional_indicator_i::regional_indicator_m:",
    category: "fun",
    usage: "<texto>",
    example: "teste de texto",
    args: true,

    async run(client, message, args) {

        if (!args[0]) return;

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
            if (/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        message.channel.send(text)
    }
}