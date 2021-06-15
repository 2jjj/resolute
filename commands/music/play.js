const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')

module.exports = {
  name: 'play',
  category: "music",
  usage: "<nome/url>",
  aliases: ["p"],
  description: "Comece o batidão no canal de voz.",

  async run (client, message, args) {

    if(!args[0]) return message.channel.send('**❌ Você precisa colocar alguma musica para eu tocar!**')
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send('❌ **Você precisa estar em um canal de voz, para iniciar a musica.**')

    if (!channel.permissionsFor(message.client.user).has("CONNECT")) return message.channel.send('🐸 Seu Bobo(a). Estou sem permissões para entrar no canal de voz. \`:P\`')
    if (!channel.permissionsFor(message.client.user).has("SPEAK"))return message.channel.send('🐸 Seu Bobo(a). Estou sem permissões de falar no canal de voz. \`:P\`')


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
    date.setSeconds(song.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
        let olha;
        if (song.views === null) {
          olha = "**Ao Vivo**"
        } else {
          olha = song.views
        }
        
        let tempo;
        if (timeString === "00:00:00") {
          tempo = "**Ao Vivo**"
        } else {
          tempo = timeString
        }
        
      if (server) {
        server.songs.push(song);
        console.log(server.songs);
        let embed = new discord.MessageEmbed()
        .setTitle('Adicionado a Fila!')
        .setColor('GREEN')
        .addField('Nome', song.title, true)
        .setThumbnail(song.thumbnail)
        .addField('Visualizações', olha, true)
        .addField('Pedido por', song.requester, true)
        .addField('Duração', tempo, true)
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
        let endmusic = new discord.MessageEmbed()
         .setColor("GREEN")
         .setDescription("🐸 O Batidão acabou! Como não tem nenhuma musica na fila estou saindo do canal de voz.")
        if (!song) {
            queue.voiceChannel.leave();
            message.client.queue.delete(message.guild.id);
            message.channel.send(endmusic)
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
        .setTitle('Iniciando Musica')
        .setThumbnail(song.thumbnail)
        .addField('Nome', song.title, true)
        .addField('Pedido por', song.requester, true)
        .addField('Visualizações', olha, true)
        .addField('Duração', tempo, true)
        queue.textChannel.send(noiceEmbed);
    };


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`❌ Erro -> Canal de Voz`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`❌ Eu não consegui entrar no canal de voz: ${error}`);
    }
}
}