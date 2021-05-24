const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
const YouTube = require("youtube-sr");
const sendError = require("../../util/error");
const fs = require('fs');

module.exports = {
  info: {
    name: "search",
    description: "Para pesquisar musicas",
    usage: "",
    aliases: ["sc", "procurar", "buscar"],
  },

  run: async function (client, message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    let channel = message.member.voice.channel;
    if (!channel)return sendError("<:Resoluteinfo:844971535927083088> Sinto muito, mas você precisa estar em um canal de voz para tocar música", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("<:Resoluteinfo:844971535927083088> Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!", message.channel);
    if (!permissions.has("SPEAK"))return sendError("<:Resoluteinfo:844971535927083088> Não posso falar neste canal de voz, verifique se tenho as permissões adequadas!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("<:Resoluteinfo:844971535927083088> Você nao pesquisou por nada!", message.channel);

    var serverQueue = message.client.queue.get(message.guild.id);
    try {
           var searched = await YouTube.search(searchString, { limit: 10 });
          if (searched[0] == undefined)return sendError("Parece que não consegui encontrar a música no YouTube", message.channel);
                    let index = 0;
                    let embedPlay = new MessageEmbed()
                        .setColor("BLUE")
                        .setAuthor(`Resultados para \"${args.join(" ")}\"`, message.author.displayAvatarURL())
                        .setDescription(`${searched.map(video2 => `**\`${++index}\`  |** [\`${video2.title}\`](${video2.url}) - \`${video2.durationFormatted}\``).join("\n")}`)
                        .setFooter("Digite o número da música para adicioná-la à lista de reprodução");
                    // 
                    message.channel.send(embedPlay).then(m => m.delete({
                        timeout: 15000
                    }))
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send({
                            embed: {
                                color: "RED",
                                description: "Nada foi selecionado em 20 segundos, a solicitação vai ser cancelada."
                            }
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await (searched[videoIndex - 1])
		    
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "🆘  **|**  Não consegui obter nenhum resultado de pesquisa"
                        }
                    });
                }
            
            response.delete();
  var songInfo = video

    const song = {
      id: songInfo.id,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      ago: songInfo.uploadedAt,
      duration: songInfo.durationFormatted,
      url: `https://www.youtube.com/watch?v=${songInfo.id}`,
      img: songInfo.thumbnail.url,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Musica foi adicionada na fila", "https://cdn.discordapp.com/attachments/754170388115619872/784270025577463849/7b7a49c20326e3cbfdccb534ca0366f1.gif")
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedido por", song.req.tag, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

   const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        sendError("Sai do canal pois não tem nenhuma musica na fila!.", message.channel)
        message.guild.me.voice.channel.leave();//
        message.client.queue.delete(message.guild.id);
      }
            return message.client.queue.delete(message.guild.id);
}
let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
  	  return sendError(`Um erro ocorreu. \`${er}\``, message.channel)

       }
      }
    });  
}
 
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
      .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0]);
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setAuthor("Musica iniciada!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedido por", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true)
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Eu não poderia entrar no canal de voz por: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`Eu não poderia entrar no canal de voz por: ${error}`, message.channel);
    }
 
  },

};
