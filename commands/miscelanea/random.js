module.exports = {
    name: "random",
    aliases: ['sorteador', 'numero'],
    cooldown: 1000 * 2, 
    description: "Obtenha um número aleatório de 0 a 100.",
    category: "outros",
    usage: "",

    async run (client, message, args) {

    let numero = Math.ceil(Math.random() * 100) 
    message.channel.send(`> ` + numero) 
//⇝
}}