const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const ee = require("../../../config/embed.json")
const {
format,
delay,
isrequestchannel,
edit_request_message_queue_info,
arrayMove
} = require("../functions")

module.exports = async (client, message, args, type, channel, guild) => {

  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild && !guild) return;
  if (method[0] === "play")
    play(client, message, args, type);
  else if (method[0] === "search")
    search(client, message, args, type);
  else if (method[0] === "playtop")
    playtop(client, message, args, type);
  else if (method[0] === "playskip")
    playskip(client, message, args, type);
  else
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Erro |Nenhum termo de pesquisa válido? ...")
    );
}
//function for searching songs
async function search(client, message, args, type) {
const search = args.join(" ");
  let res;

  res = await client.manager.search({
    query: search,
    source: type.split(":")[1]
  }, message.author);

  if (res.loadType === "LOAD_FAILED") throw res.exception;

  var max = 10;
  var collected;
  if (res.tracks.length < max) max = res.tracks.length;
  track = res.tracks[0]

  var results = "";
  if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")){
    results = res.tracks.slice(0, max).map((track, index) => `\`${++index}.\` [${String(track.title).split("[").join("\[").split("]").join("\]")}](${track.uri}) **[${format(track.duration).split(" | ")[0]}]**`).join('\n\n');
    results += "\n\n\n**Digite um número para fazer uma escolha. Escreva \`cancel\` para sair**";
    results = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}), "https://www.resolutebot.xyz")
    .setColor(ee.color)
    .setDescription(results)
  }else {
    results = res.tracks.slice(0, max).map((track, index) => `\`${++index}.\` \`${String(track.title).split("[").join("\[").split("]").join("\]")}\` **[${format(track.duration).split(" | ")[0]}]**`).join('\n\n');
    results += "\n\n\n**Digite um número para fazer uma escolha. Escreva \`cancel\` para sair**";
  }
  
  let searchmsg = await message.channel.send(results)

  waitforanswer()
  function waitforanswer(){
    message.channel.awaitMessages(m => m.author.id == message.author.id, {
      max: 1,
      time: 30000,
      errors: ['time']
    }).then(collected => {
      searchmsg.delete().catch(e=>console.log("Não foi possível excluir a mensagem."))
  
      const first = collected.first().content;
      if (first.toLowerCase() === 'cancel') {
        message.channel.send("✅")
        if (player && player.queue && !player.queue.current) player.destroy().catch(e=>console.log("e"));
        return;
      }
      const index = Number(first) - 1;
      if (index < 0 || index > max - 1) return waitforanswer();
  
        track = res.tracks[index];
        if (!res.tracks[0])
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
            .setDescription(`Por favor tente novamente!`)
          );

          let player = client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          selfDeafen: false,
        });
        if (player.state !== "CONNECTED") {
          player.connect();
          player.set("message", message);
          player.set("playerauthor", message.author.id);
          player.queue.add(track);
          player.play();
        } else {
        player.queue.add(track);
        var time = 0;

        let playembed = new Discord.MessageEmbed()
          .setAuthor(`Adicionado à fila`, message.author.displayAvatarURL({dynamic: true}), "https://www.resolutebot.xyz")
          .setURL(track.uri)
          .setTitle("**" + track.title + "**").setColor(ee.color)
          .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
          .addField("Canal", track.author, true)
          .addField("Duração da música: ", track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0], true)

          if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
          time += player.queue.current.duration - player.position;
          time -= track.duration;
          playembed.addField("Tempo estimado até tocar", format(time).split(" | ")[0], true)
          playembed.addField("Posição na fila", `${player.queue.length}`, true)
          
          if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
          return message.channel.send(playembed);
        else
          return message.channel.send(`Adicionada: \`${track.title}\` - para a fila\n**Canal:** ${track.author}\n**Duração da música:** ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]}\n**Tempo estimado até jogar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${track.uri}`);
        }
      }).catch(e=>{
        searchmsg.edit({content: "**:x: Tempo esgotado!**", embed: null}) 
      })
  }
}

async function play(client, message, args, type) {
  const search = args.join(" ");
    let res;
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") {
        playlist_()
      } else {
        song_()
      }

    function song_() {
      if (!res.tracks[0]){
        return message.channel.send(`**:x: Não encontrei nada para: \`${search}\`**`);
      }
      
      if(res.tracks[0].duration > 3 * 60 * 60 * 1000){
        return message.channel.send(`**:x: Não é possível tocar uma música que tem mais de 3 horas**`)
      }

      let player;
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: false,
      });

      if (player.state !== "CONNECTED") {
        player.connect()
        player.queue.add(res.tracks[0]);
        player.play();
      }

      else {
          player.queue.add(res.tracks[0]);
          var time = 0;

          let playembed = new Discord.MessageEmbed()
            .setAuthor(`Adicionado à fila`, message.author.displayAvatarURL({dynamic: true}), "https://www.resolutebot.xyz")
            .setURL(res.tracks[0].uri)
            .setTitle("**" + res.tracks[0].title + "**").setColor(ee.color)
            .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
            .addField("Canal", res.tracks[0].author, true)
            .addField("Duração da música: ", res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0], true)
            
            if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
            time += player.queue.current.duration - player.position;
            time -= res.tracks[0].duration;
            playembed.addField("Tempo estimado até tocar", format(time).split(" | ")[0], true)
            playembed.addField("Posição na fila", `${player.queue.length}`, true)
          
          if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
            return message.channel.send(playembed);
          else
            return message.channel.send(`Adicionada: \`${res.tracks[0].title}\` - para a fila\n**Canal:** ${res.tracks[0].author}\n**Duração da música:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Tempo estimado até tocar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${res.tracks[0].uri}`);
      }
    }

    function playlist_() {
      if (!res.tracks[0]){
        return message.channel.send(`**:x: Não encontrou nada para: \`${search}\`**`);
      }
      for(const track of res.tracks)
        if(track.duration > 3 * 60 * 60 * 1000){
          return message.channel.send(`**:x: Não é possível reproduzir uma música que tem mais de 3 horas -> lista de reprodução ignorada!**`)
        }
      let player;
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: false,
      });

      if (player.state !== "CONNECTED") {
        player.connect();
        player.queue.add(res.tracks);
        player.play();
      }else{
        player.queue.add(res.tracks);
      }
      var time = 0;
        let playlistembed = new Discord.MessageEmbed()

          .setAuthor(`Playlist adicionada à fila`, message.author.displayAvatarURL({dynamic:true}), "https://www.resolutebot.xyz" )
          .setColor(ee.color)
          .setTitle("**"+res.playlist.name+"**")
          .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
            
            if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
            time += player.queue.current.duration - player.position;
            for(const track of res.tracks)
              time -= track.duration;
    
            playlistembed.addField("Tempo estimado até jogar", time > 10 ? format(time).split(" | ")[0] : "NOW")
            .addField("Posição na fila", `${player.queue.length - res.tracks.length + 1 === 0 ? "Agora" : player.queue.length - res.tracks.length + 1}`, true)
            .addField("Lista da fila", `\`${res.tracks.length}\``, true)

          if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
            message.channel.send(playlistembed);
          else
            message.channel.send(`Adicionada: \`${res.tracks[0].title}\` - para a fila\n**Canal:** ${res.tracks[0].author}\n**Duração da música:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Tempo estimado até jogar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${res.tracks[0].uri}`);
    }
}

async function playskip(client, message, args, type) {
  const search = args.join(" ");
  let res;
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
    
    if (res.loadType === "LOAD_FAILED") throw res.exception;
    else if (res.loadType === "PLAYLIST_LOADED") {
      playlist_()
    } else {
      song_()
    }
  function song_() {
    
    if (!res.tracks[0]){
      return message.channel.send(`**:x: Não encontrou nada para: \`${search}\`**`);
    }
    
    if(res.tracks[0].duration > 3 * 60 * 60 * 1000){
      return message.channel.send(`**:x: Não é possível tocar uma música que tem mais de 3 horas**`)
    }
   
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
   
    if (player.state !== "CONNECTED") {
      player.connect()
      player.queue.add(res.tracks[0]);
      player.play();
    }
    
    else {
    
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      player.queue.clear();
      player.queue.add(res.tracks[0]);
      for (const track of oldQueue)
        player.queue.add(track);
      player.stop();
    }
  }

  function playlist_() {
    if (!res.tracks[0]){
      return message.channel.send(`**:x: Não encontrou nada para: \`${search}\`**`);
    }
    for(const track of res.tracks)
      if(track.duration > 3 * 60 * 60 * 1000){
        return message.channel.send(`**:x: Não é possível reproduzir uma música que tem mais de 3 horas -> lista de reprodução ignorada!**`)
      }
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
    
    if (player.state !== "CONNECTED") {
      player.connect();
      player.queue.add(res.tracks);
      player.play();
    }else{
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      player.queue.clear();
      player.queue.add(res.tracks);
      for (const track of oldQueue)
        player.queue.add(track);
      player.stop();
    }
    var time = 0;
      let playlistembed = new Discord.MessageEmbed()

        .setAuthor(`Playlist adicionada à fila`, message.author.displayAvatarURL({dynamic:true}), "https://www.resolutebot.xyz" )
        .setColor(ee.color)
        .setTitle("**"+res.playlist.name+"**")
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
          
          if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
          time += player.queue.current.duration - player.position;
          for(const track of res.tracks)
            time -= track.duration;
  
          playlistembed.addField("Tempo estimado até tocar", time > 10 ? format(time).split(" | ")[0] : "NOW")
          .addField("Posição na fila", `${player.queue.length - res.tracks.length + 1 === 0 ? "NOW" : player.queue.length - res.tracks.length + 1}`, true)
          .addField("Na fila", `\`${res.tracks.length}\``, true)
        
        if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
          message.channel.send(playlistembed);
        else
          message.channel.send(`Adicionada: \`${res.tracks[0].title}\` - para a fila\n**Canal:** ${res.tracks[0].author}\n**Duração da música:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Tempo estimado até tocar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${res.tracks[0].uri}`);
  }
}

async function playtop(client, message, args, type) {
  const search = args.join(" ");
  let res;
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
    
    if (res.loadType === "LOAD_FAILED") throw res.exception;
    else if (res.loadType === "PLAYLIST_LOADED") {
      playlist_()
    } else {
      song_()
    }
  function song_() {
    
    if (!res.tracks[0]){
      return message.channel.send(`**:x: Não encontrou nada para: \`${search}\`**`);
    }
    
    if(res.tracks[0].duration > 3 * 60 * 60 * 1000){
      return message.channel.send(`**:x: Não é possível tocar uma música que tem mais de 3 horas**`)
    }
    
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
    
    if (player.state !== "CONNECTED") {
      player.connect()
      player.queue.add(res.tracks[0]);
      player.play();
    }
    else {
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      player.queue.clear();
      player.queue.add(res.tracks[0]);
      for (const track of oldQueue)
        player.queue.add(track);
      let playembed = new Discord.MessageEmbed()
      .setAuthor(`Adicionado à fila`, message.author.displayAvatarURL({dynamic: true}), "https://www.resolutebot.xyz")
      .setURL(res.tracks[0].uri)
      .setTitle("**" + res.tracks[0].title + "**").setColor(ee.color)
      .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
      .addField("Canal", res.tracks[0].author, true)
      .addField("Duração da música: ", res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0], true)

      if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
      time += player.queue.current.duration - player.position;
      time -= res.tracks[0].duration;
      playembed.addField("Tempo estimado até tocar", format(time).split(" | ")[0], true)
      
      playembed.addField("Posição na fila", `${player.queue.length}`, true)

      if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
      return message.channel.send(playembed);
    else
      return message.channel.send(`Adicionada: \`${res.tracks[0].title}\` - para a fila\n**Canal:** ${res.tracks[0].author}\n**Duração da música:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Tempo estimado até jogar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${res.tracks[0].uri}`);
  }
  }

  function playlist_() {
    if (!res.tracks[0]){
      return message.channel.send(`**:x: Não encontrou nada para: \`${search}\`**`);
    }
    for(const track of res.tracks)
      if(track.duration > 3 * 60 * 60 * 1000){
        return message.channel.send(`**:x: Não é possível reproduzir uma música que é mais de 3 horas -> lista de reprodução ignorada!**`)
      }
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });

    if (player.state !== "CONNECTED") {
      player.connect();
      player.queue.add(res.tracks);
      player.play();
    }else{
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      player.queue.clear();
      player.queue.add(res.tracks);
      for (const track of oldQueue)
        player.queue.add(track);
    }
    var time = 0;
      let playlistembed = new Discord.MessageEmbed()

        .setAuthor(`Playlist adicionada à fila`, message.author.displayAvatarURL({dynamic:true}), "https://www.resolutebot.xyz" )
        .setColor(ee.color)
        .setTitle("**"+res.playlist.name+"**")
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
          if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
          time += player.queue.current.duration - player.position;
          for(const track of res.tracks)
            time -= track.duration;
  
          playlistembed.addField("Tempo estimado até jogar", time > 10 ? format(time).split(" | ")[0] : "NOW")
          .addField("Posição na fila", `${player.queue.length - res.tracks.length + 1 === 0 ? "NOW" : player.queue.length - res.tracks.length + 1}`, true)
          .addField("Lista de fila", `\`${res.tracks.length}\``, true)
        if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
          message.channel.send(playlistembed);
        else
          message.channel.send(`Adicionada: \`${res.tracks[0].title}\` - para a fila\n**Canal:** ${res.tracks[0].author}\n**Duração da música:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Tempo estimado até jogar:** ${time}\n**Posição na fila:** ${player.queue.length}\n${res.tracks[0].uri}`);
  }
}