const db = require("quick.db")

module.exports = {
    name: "skip",
    aliases: ['pular'],
    cooldown: 1000 * 2, 
    description: "Pular a música que está tocando para a música da fila.",
    category: "musica",
    usage: "",

    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('> Você deve estar em um canal de voz para utlizar esse comando!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue){ return message.channel.send({
        embed: {
            description: '> Nada está tocando no momento para eu poder pular!',
            color: 'BLACK'
        }
    })
}

    if(queue.songs.length !== 0) {
        message.react('<a:check_ravena:843602746543439902>')
        queue.connection.dispatcher.end('Pulei para a próxima música da fila!')
    }
}}