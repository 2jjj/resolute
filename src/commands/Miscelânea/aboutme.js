const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "aboutme",
    aliases: ['sobremim'],
    cooldown: 1000 * 2,
    description: "Troque o seu sobremim!",
    category: "misc",
    usage: "<texto>",
    example: "Ola!",
    permissoes: [],
    args: true,

    async run(client, message, args, cmduser, text, prefix, player) {
        const user = message.member
        if(!args[0]) return;

        db.set(`${user.id}`, `${args[0]}`)
        message.inlineReply("Sucesso! sua mensagem foi alterada.")
    }
}
