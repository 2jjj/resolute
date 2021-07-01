const { MessageButton, MessageActionRow } = require('discord-buttons'); // To require only certain extensions that actually do the work!

module.exports = {
    name: "invite",
    aliases: ['convidar'],
    cooldown: 1000 * 2, 
    description: "Convidar o bot Resolute para o seu servidor, (Com botões)",
    category: "botoes",
    usage: "",
    example: "",

    async run (client, message, args) {
        let button = new MessageButton()
        .setLabel("Me adicione!")
        .setStyle("url")
        .setURL("https://discord.com/oauth2/authorize?client_id=854817597706338304&permissions=8&scope=bot")
        message.channel.send("Está querendo me adicionar? clique no botão abaixo!", button)
    }
}