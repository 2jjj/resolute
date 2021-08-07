const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "invite",
    aliases: ['convidar'],
    cooldown: 1000 * 2, 
    description: "Convidar o bot Resolute para o seu servidor!",
    category: "info",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run (client, message, args) {
        let button = new MessageButton()
        .setLabel("Me adicione!")
        .setStyle("url")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=868871721409736774&permissions=8&scope=bot%20applications.commands")
        message.channel.send("Está querendo me adicionar? clique no botão abaixo!", button)
    }
}