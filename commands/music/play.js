const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')

module.exports = {
    name: "play",

    async run(client, message, args) {

        if (!args[0]) return;

        let channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Você deve estar em um canal de voz para utlizar esse comando!')


        const server = message.client.queue.get(message.guild.id);
        let video = await scrapeYt.search(args.join(' '))
        let result = video[0]

        const song = {
            id: result.id,
            title: result.title,
            duration: result.duration,
            thumbnail: result.thumbnail,
            upload: result.uploadDate,
            views: result.viewCount,
            requester: message.author,
            channel: result.channel.name,
            channelurl: result.channel.url
        };

        var date = new Date(0);
        date.setSeconds(song.duration);
        var timeString = date.toISOString().substr(11, 8);

        if (server) {
            server.songs.push(song);
            console.log(server.songs);
            let embed = new discord.MessageEmbed()
                .setTitle('🎵 **|** Adicionado a lista')
                .setColor('#000001')
                .addField('Nome', song.title)
                .setThumbnail(song.thumbnail)
                .addField('Visualizações', song.views)
                .addField('Requerido por', song.requester)
                .addField('Duração', timeString)
            return message.channel.send(embed)
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);


        const play = async song => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                queue.voiceChannel.leave();
                message.client.queue.delete(message.guild.id);
                message.channel.send('Sem músicas na fila, então eu sai da call...')
                return;
            }

            const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
                    filter: format => ['251'],
                    highWaterMark: 1 << 25
                }), {
                    type: 'opus'
                })
                .on('finish', () => {
                    queue.songs.shift();
                    play(queue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 5);
            let noiceEmbed = new discord.MessageEmbed()
                .setTitle('🎵 **|** Nova música na fila!')
                .setColor("#000001")
                .setImage(song.thumbnail)
                .addField('Nome', song.title)
                .addField('Requerido por', song.requester)
                .addField('Visualizações', song.views)
                .addField('Duração', timeString)
            queue.textChannel.send(noiceEmbed);
        };


        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Eu não consigo entrar nesse canal de voz!`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(`Eu não consigo entrar nesse canal de voz **|** ${error}`);
        }
    }
}