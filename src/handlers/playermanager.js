const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../config/config.json")
const ee = require("../config/embed.json")
const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_queue_info,
  arrayMove
} = require("./functions")

module.exports = async (client, message, args, type) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;

  try {
    let guildstring = ` - ${message.guild ? message.guild.name : "Unknown Guild Name"} `.substr(0, 22)
    let userstring = ` - ${message.author.tag} `.substr(0, 22)

    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `NEW SONG REQUEST: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `NEW SONG REQUEST: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + ` - ${args.join(" ")}`.substr(0, 60).bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - ` - ${args.join(" ")}`.substr(0, 60).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `REQUESTED BY: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `REQUESTED BY: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + userstring.bold.cyan + "━".repeat(stringlength / 3 - userstring.length).bold.brightRed + "━━>".bold.brightRed + ` ${message.author.id}`.bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - userstring.length - "━━>".length - ` ${message.author.id}`.length - "━".repeat(stringlength / 3 - userstring.length).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `REQUESTED IN: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `REQUESTED IN: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + guildstring.bold.cyan + "━".repeat(stringlength / 3 - guildstring.length).bold.brightRed + "━━>".bold.brightRed + ` ${message.guild.id}`.bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - guildstring.length - "━━>".length - ` ${message.guild.id}`.length - "━".repeat(stringlength / 3 - guildstring.length).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
    console.log("\n")
  } catch (e) {
    console.log(e) /* */
  }

  let {
    channel
  } = message.member.voice;
  const permissions = channel.permissionsFor(client.user);

  if (!permissions.has("CONNECT"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Erro | Eu preciso de permissões para entrar no seu canal!")
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Erro | Eu preciso de permissões para falar no seu canal de voz!")
    );

  if (method[0] === "song")
    song(client, message, args, type);
  else if (method[0] === "playlist")
    playlist(client, message, args, type);
  else if (method[0] === "similar")
    similar(client, message, args, type);
  else if (method[0] === "search")
    search(client, message, args, type);
  else if (method[0] === "skiptrack")
    skiptrack(client, message, args, type);
  else
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Erro | Nenhum termo de pesquisa válido?... Por favor entre em contato: `Spray#7725`")
    );
}

async function similar(client, message, args, type) {
  try {

    const mixURL = args.join(" ");

    const player = client.manager.players.get(message.guild.id);

    const res = await client.manager.search(mixURL, message.author);

    if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') {
      return client.channels.cache.get(player.textChannel).send(new MessageEmbed()
        .setTitle("❌ Erro | Não encontrei nada relacionado com a última música")
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
      );
    }

    if (type.split(":")[1] === "add") {

      player.queue.add(res.tracks[0]);

      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);

      let embed2 = new Discord.MessageEmbed()
      try {
        embed2.setTitle(`Adicionado à fila 🩸 **\`${res.tracks[0].title}`.substr(0, 256 - 3) + "`**")
      } catch { }
      try {
        embed2.setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      } catch { }
      try {
        embed2.setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
      } catch { }
      try {
        embed2.addField("⌛ Duração: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
      } catch { }
      try {
        embed2.addField("💯 Artista: ", `\`${res.tracks[0].author}\``, true)
      } catch { }
      try {
        embed2.addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
      } catch { }
      try {
        embed2.setFooter(`Requisitado por: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
          dynamic: true
        }))
      } catch { }

      return message.channel.send(embed2).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
    }

    if (type.split(":")[1] === "search") {
      let max = 15,
        collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
      if (res.tracks.length < max) max = res.tracks.length;
      track = res.tracks[0]

      const results = res.tracks
        .slice(0, max)
        .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
        .join('\n');
      let searchembed = new Discord.MessageEmbed()
        .setTitle(`Resultado da pesquisa para: 🔎 **\`${player.queue.current.title}`.substr(0, 256 - 3) + "`**")
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(results)
        .setFooter(`Pesquisa requisitada por: ${track.requester.tag}`, track.requester.displayAvatarURL({
          dynamic: true
        }))
      message.channel.send(searchembed)
      await message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("👍 Escolha sua música com o `número de índice`")
      )
      try {
        collected = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 30e3,
          errors: ['time']
        });
      } catch (e) {
        if (!player.queue.current) player.destroy();
        return message.channel.send(new MessageEmbed()
          .setTitle("❌ Erro | Você não forneceu uma seleção.")
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
      const first = collected.first().content;
      if (first.toLowerCase() === 'end') {
        if (!player.queue.current) player.destroy();
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle('❌ Erro | Seleção cancelada.')
        );
      }
      const index = Number(first) - 1;
      if (index < 0 || index > max - 1)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ Erro | O número que você forneceu foi muito pequeno ou muito grande (1-${max}).`)
        );
      track = res.tracks[index];
      if (!res.tracks[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(String("❌ Erro | Não encontrei nada para: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**")
          .setDescription(`Please retry!`)
        );
      if (player.state !== "CONNECTED") {

        player.connect();
        player.queue.add(track);
        player.play();
        if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      } else {
        player.queue.add(track);
        let embed = new Discord.MessageEmbed()
        try {
          embed.setTitle(`Adicionado à fila 🩸 **\`${track.title}`.substr(0, 256 - 3) + "`**")
        } catch { }
        try {
          embed.setURL(track.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        } catch { }
        try {
          embed.setThumbnail(track.displayThumbnail(1))
        } catch { }
        try {
          embed.addField("⌛ Duração: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        } catch { }
        try {
          embed.addField("💯 Artista: ", `\`${track.author}\``, true)
        } catch { }
        try {
          embed.addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
        } catch { }
        try {
          embed.setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }))
        } catch { }
        if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
        return message.channel.send(embed).then(msg => {
          try {
            msg.delete({
              timeout: 4000
            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
          } catch { /* */ }
        });
      }
    }
  } catch (e) {
    console.log(String(e.stack).red)
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Erro | Não encontrei nada para: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**")
    )
  }
}

async function search(client, message, args, type) {
  const search = args.join(" ");
  try {
    let res;
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: config.settings.selfDeaf,
    });
    let state = player.state;
    if (state !== "CONNECTED") {
      player.connect();
      player.stop();
    }
    try {

      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "As playlists não são suportadas com este comando. use o comando playlist."
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | Houve um erro ao procurar`)
        //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }


    let max = 10,
      collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
    if (res.tracks.length < max) max = res.tracks.length;
    track = res.tracks[0]

    const results = res.tracks
      .slice(0, max)
      .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
      .join('\n');

    message.channel.send(new Discord.MessageEmbed()
      .setTitle(`Resultado de pesquisa para: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setDescription(results)
      .setFooter(`Pesquisa requisitada por: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))
    )

    await message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("Escolha sua música com o `número de índice`")
    )
    try {
      collected = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30e3,
        errors: ['time']
      });
    } catch (e) {
      if (!player.queue.current) player.destroy();
      return message.channel.send(new MessageEmbed()
        .setTitle("❌ Erro | Você não forneceu uma seleção")
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
      );
    }
    const first = collected.first().content;
    if (first.toLowerCase() === 'end') {
      if (!player.queue.current) player.destroy();
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle('❌ Erro | Seleção cancelada.')
      );
    }
    const index = Number(first) - 1;
    if (index < 0 || index > max - 1)
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | O número que você forneceu foi muito pequeno ou muito grande (1-${max}).`)
      );
    track = res.tracks[index];
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    if (state !== "CONNECTED") {
      player.connect();

      player.queue.add(track);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else if (!player.queue || !player.queue.current) {

      player.queue.add(track);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else {
      player.queue.add(track);
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      let embed3 = new Discord.MessageEmbed()
        .setTitle(`Adicionado à fila 🩸 **\`${track.title}`.substr(0, 256 - 3) + "`**")
        .setURL(track.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(track.displayThumbnail(1))
        .addField("⌛ Duração.: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        .addField("💯 Artista: ", `\`${track.author}\``, true)
        .addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
        .setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({
          dynamic: true
        }))
      return message.channel.send(embed3).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
    }

  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

async function searchplaylist(client, message, args, type) {
  const search = args.join(" ");
  try {
    let res;
    try {

      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "As playlists não são suportadas com este comando. Use o comando playlist."
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | Houve um erro ao procurar!`)
        //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }


    let max = 10,
      collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
    if (res.tracks.length < max) max = res.tracks.length;
    track = res.tracks[0]

    const results = res.tracks
      .slice(0, max)
      .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
      .join('\n');

    message.channel.send(new Discord.MessageEmbed()
      .setTitle(`Resultado de pesquisa para: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setDescription(results)
      .setFooter(`Pesquisa requisitada por: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))
    )

    await message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("Escolha sua música com o `número de índice`")
    )
    try {
      collected = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30e3,
        errors: ['time']
      });
    } catch (e) {
      if (!player.queue.current) player.destroy();
      return message.channel.send(new MessageEmbed()
        .setTitle("❌ Erro | Você não forneceu uma seleção!")
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
      );
    }
    const first = collected.first().content;
    if (first.toLowerCase() === 'end') {
      if (!player.queue.current) player.destroy();
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle('❌ Erro | Seleção cancelada.')
      );
    }
    const index = Number(first) - 1;
    if (index < 0 || index > max - 1)
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | O número que você forneceu foi muito pequeno ou muito grande (1-${max}).`)
      );
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
      selfDeafen: config.settings.selfDeaf,
    });
    if (player.state !== "CONNECTED") {

      player.connect();
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.queue.add(track);
      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    } else {
      player.queue.add(track);
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      let embed3 = new Discord.MessageEmbed()
      try {
        embed3.setTitle(`Adicionado à fila 🩸 **\`${track.title}`.substr(0, 256 - 3) + "`**")
      } catch { }
      try {
        embed3.setURL(track.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      } catch { }
      try {
        embed3.setThumbnail(track.displayThumbnail(1))
      } catch { }
      try {
        embed3.addField("⌛ Duração: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
      } catch { }
      try {
        embed3.addField("💯 Artista: ", `\`${track.author}\``, true)
      } catch { }
      try {
        embed3.addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
      } catch { }
      try {
        embed3.setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({
          dynamic: true
        }))
      } catch { }
      return message.channel.send(embed3).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
    }

  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

async function playlist(client, message, args, type) {
  const search = args.join(" ");
  try {
    let res;
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: config.settings.selfDeaf,
    });
    let state = player.state;
    if (state !== "CONNECTED") {
      player.connect();
      player.stop();
    }
    try {

      res = await client.manager.search(search, message.author);

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "SEARCH_RESULT") throw {
        message: "As pesquisas não são suportadas com este comando. Use o comando Play ou Search"
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | Houve um erro ao procurar.`)
        //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );

    if (state !== "CONNECTED") {
      player.connect();

      player.queue.add(res.tracks);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      let playlistembed = new Discord.MessageEmbed()
        .setTitle(`Adicionada a playlist 🩸 **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
        .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duração: ", `\`${format(res.playlist.duration)}\``, true)
        .addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
        .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      message.channel.send(playlistembed).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else if (!player.queue || !player.queue.current) {

      player.queue.add(res.tracks);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      let playlistembed = new Discord.MessageEmbed()
        .setTitle(`Adicionada a playlist 🩸 **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
        .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duração: ", `\`${format(res.playlist.duration)}\``, true)
        .addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Músicas\``, true)
        .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      message.channel.send(playlistembed).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else {
      player.queue.add(res.tracks);
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      let playlistembed2 = new Discord.MessageEmbed()
        .setTitle(`Adicionada a playlist 🩸 **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
        .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duração: ", `\`${format(res.playlist.duration)}\``, true)
        .addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      return message.channel.send(playlistembed2).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch { /* */ }
      });
    }

  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

async function song(client, message, args, type) {
  const search = args.join(" ");
  try {
    let res;
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: config.settings.selfDeaf,
    });
    let state = player.state;
    if (state !== "CONNECTED") {
      player.connect();
      player.stop();
    }
    try {

      if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      else {
        res = await client.manager.search(search, message.author);
      }

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "As playlists não são suportadas com este comando. Use o comando playlist"
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | Houve um erro ao procurar.`)
        //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );

    if (state !== "CONNECTED") {
      player.connect();

      player.queue.add(res.tracks[0]);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else if (!player.queue || !player.queue.current) {

      player.queue.add(res.tracks[0]);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    } else {

      player.queue.add(res.tracks[0]);

      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);

      let playembed = new Discord.MessageEmbed()
      try {
        playembed.setTitle(`Adicionado a fila 🩸 **\`${res.tracks[0].title}`.substr(0, 256 - 3) + "`**")
      } catch { }
      try {
        playembed.setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      } catch { }
      try {
        playembed.setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
      } catch { }
      try {
        playembed.addField("⌛ Duração: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
      } catch { }
      try {
        playembed.addField("💯 Artista: ", `\`${res.tracks[0].author}\``, true)
      } catch { }
      try {
        playembed.addField("🔂 Tamanho da fila: ", `\`${player.queue.length} Música\``, true)
      } catch { }
      try {
        playembed.setFooter(`Requisitado por: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
          dynamic: true
        }))
      } catch { }
      return message.channel.send(playembed).then(msg => {
        try {
          msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        } catch {
          /* */
        }
      });
    }
  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }

}

async function skiptrack(client, message, args, type) {
  const search = args.join(" ");
  try {
    let res;
    let player;
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: config.settings.selfDeaf,
    });
    let state = player.state;
    if (state !== "CONNECTED") {
      player.connect();
      player.stop();
    }
    try {

      if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      else {
        res = await client.manager.search(search, message.author);
      }

      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "As playlists não são suportadas com este comando. Use o comando playlist"
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Erro | Houve um erro ao procurar.`)
        //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );

    if (state !== "CONNECTED") {
      player.connect();

      player.queue.add(res.tracks[0]);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    }
    else if (!player.queue || !player.queue.current) {

      player.queue.add(res.tracks[0]);

      player.set("message", message);
      player.set("playerauthor", message.author.id);

      player.play();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    } else {
      player.queue.add(res.tracks[0]);

      let song = player.queue[player.queue.length - 1];

      let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);

      player.queue.clear();

      for (const track of QueueArray)
        player.queue.add(track);

      player.stop();
      if (isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      return;
    }
  } catch (e) {
    console.log(String(e.stack).red)
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Erro | Não encontrei nada para: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}