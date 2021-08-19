const db = require("quick.db");
const emoji = require("../../config/emojis.json")

module.exports = {
    name: "aboutme",
    aliases: ['sobremim'],
    cooldown: 1000 * 2,
    description: "Troque o seu sobremim!",
    category: "social",
    usage: "<texto>",
    example: "Ola!",
    permissoes: [],
    args: true,

    async run(client, message, args, cmduser, text, prefix, player) {
        const user = message.member
        if(!args[0]) return;

        db.set(`sobre_mim_${user.id}`, `${args[0]}`)
        message.inlineReply(` ${emoji.msg.check}**|** Sucesso! sua mensagem foi alterada.`)
    }
}
