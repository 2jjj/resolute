const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: "play",
  description: "To play songs :D",
  category: "musica",
  usage: "<song_name>",
  aliases: ["p"],
  cooldown: 1000 * 2, 

  run: async function(client, message, args) {

    console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

    const channel = message.member.voice.channel;
    if (!channel) {
      message.channel.send("> Você precisa estar em um canal de voz para usar esse comando.");
    }

    if (!message.guild.me.hasPermission("CONNECT")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "Eu não tenho permissão para entrar no canal de voz."
        }
      });
    }
    if (!message.guild.me.hasPermission("SPEAK")) {
      message.channel.send({
        embed: {
          color: "FF0000",
          description:
            "Eu preciso de permissões para **falar** no canal de voz."
        }
      });
    }
    var searchString = args.join(" ");
    if (!searchString) {
      message.channel.send("Por favor, insira apenas links e nomes de músicas.");
    }

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0) {
      message.channel.send("Eu não consegui achar a música.");
    }
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setTitle("Nova música adicionada na fila.")
        .setImage(song.img)
        .setColor("ORANGE")
        .setDescription(
          `**Nome**   
          [${song.title}](${song.url})     
          **Duração**
          ${song.duration}
          **Requisitada por**
          [${message.author}]
          `
        )
        .setFooter(`Resolute`);
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3.5,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
         message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setTitle("Estou tocando")
        .setDescription(
          `**Nome**   
          [${song.title}](${song.url})     
          **Duração**
          ${song.duration}
          **Requisitada por**
          [${message.author}]
          `
        )

        .setImage(song.img)
        .setColor("GREEN")
        .setFooter(`Resolute`);
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Eu não consegui entrar no canal de voz: ${error}`);
      message.client.queue.delete(message.guild.id);
      //await channel.leave();
      return console.log(
        `Eu não consegui entrar no canal de voz: ${error}`,
        message.channel
      );
    }
  }
};