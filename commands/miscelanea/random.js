module.exports = {
    name: "random",
    aliases: ['sorteador', 'numero'],
    cooldown: 1000 * 2, 
    description: "Um número aleatório",
    category: "outros",
    usage: "",

    async run (client, message, args) {

    let numero = Math.ceil(Math.random() * 100) 
    message.channel.send(`> ` + numero) 
//⇝
}}