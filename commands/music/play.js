const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "play",
    aliases: ['tocar'],
    cooldown: 1000 * 2, 
    description: "play",
    category: "musica",
  
    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if(!args[0]) return message.channel.send('> Você deve me informar o **nome** ou um **link** de uma música ou video!')
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send('> Você deve estar em um canal de voz para utlizar esse comando!')


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
        .setTitle('Adcionado a lista')
        .setColor('#000001')
        .addField('<:music:843602147051700284> Nome', song.title)
        .setThumbnail(song.thumbnail)
        .addField('<:Resoluteinfo:844971535927083088> Visualizações', song.views)
        .addField('<:Resoluteinfo:844971535927083088> Requerido por', song.requester)
        .addField('<:Resoluteinfo:844971535927083088> Duração', timeString)
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
            message.channel.send('> Sem músicas na fila, então sai do canal de voz.')
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
        .setTitle('Começei a tocar')
        .setColor("#000001")
        .setImage(song.thumbnail)
        .addField('<:music:843602147051700284> Nome', song.title)
        .addField('<:Resoluteinfo:844971535927083088> Requerido por', song.requester)
        .addField('<:Resoluteinfo:844971535927083088> Visualizações', song.views)
        .addField('<:Resoluteinfo:844971535927083088> Duração', timeString)
        queue.textChannel.send(noiceEmbed);
        message.react("<:check:843604256455000075>")
    };


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`> Eu não consigo entrar nesse canal de voz`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`> Eu não consigo entrar nesse canal de voz | ${error}`);
    }
}}