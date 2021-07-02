module.exports = {
    name: "skip",
    aliases: ['s'],
    cooldown: 1000 * 2,
    description: "Irei pular a música para a próxima da fila.",
    category: "music",
    usage: "",
    example: "",

    async run(client, message, args) {

        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Você deve estar em um canal de voz para utlizar esse comando!');
        let queue = message.client.queue.get(message.guild.id)
        if (!queue) {
            return message.channel.send({
                embed: {
                    description: 'Não há nada tocando no momento para eu poder pular!',
                    color: 'BLACK'
                }
            })
        }

        if (queue.songs.length !== 0) {
            message.react('🎵')
            queue.connection.dispatcher.end('A música foi pulada!')
        }
    }
}