const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const emoji = require("../config/emojis.json");
const config = require("../config/config.json");
const ee = require("../config/embed.json");
const radios = require("../config/radiostations.json");
const ms = require("ms")
module.exports = {
  getMember: function (message, toFind = "") {
    try {
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  shuffle: function (a) {
    try {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  formatDate: function (date) {
    try {
      return new Intl.DateTimeFormat("en-US").format(date);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  duration: function (ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;

    if (d) {
      return `${d} Days, ${h} Hours, ${m} Minutes, ${s} Seconds`
    } else if (h) {
      return `${h} Hours, ${m} Minutes, ${s} Seconds`
    } else if (m) {
      return `${m} Minutes, ${s} Seconds`
    } else {
      return `${s} Seconds`
    }
  },
  promptMessage: async function (message, author, time, validReactions) {
    try {
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  delay: function (delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },

  getRandomInt: function (max) {
    try {
      return Math.floor(Math.random() * Math.floor(max));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },

  getRandomNum: function (min, max) {
    try {
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  createBar: function (player) {

    let size = 25;
    let line = "▬";
    let slider = "🔶";
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
    if (!String(bar).includes(slider)) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;

  },
  format: function (millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  stations: function (client, prefix, message) {
    try {
      let amount = 0;
      const stationsembed = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `s.radio 11`");
      const stationsembed2 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `s.radio 69`");
      const stationsembed3 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `s.radio 180`");
      let United_Kingdom = "";
      for (let i = 0; i < radios.EU.United_Kingdom.length; i++) {
        United_Kingdom += `**${i + 1 + 10 * amount}**[${radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇬🇧 United Kingdom", `>>> ${United_Kingdom}`, true);
      amount++;
      let austria = "";
      for (let i = 0; i < radios.EU.Austria.length; i++) {
        austria += `**${i + 1 + 10 * amount}**[${radios.EU.Austria[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇦🇹 Austria", `>>> ${austria}`, true);
      amount++;
      let Belgium = "";
      for (let i = 0; i < radios.EU.Belgium.length; i++) {
        Belgium += `**${i + 1 + 10 * amount}**[${radios.EU.Belgium[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇧🇪 Belgium", `>>> ${Belgium}`, true);
      amount++;
      let Bosnia = "";
      for (let i = 0; i < radios.EU.Bosnia.length; i++) {
        Bosnia += `**${i + 1 + 10 * amount}**[${radios.EU.Bosnia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇧🇦 Bosnia", `>>> ${Bosnia}`, true);
      amount++;
      let Czech = "";
      for (let i = 0; i < radios.EU.Czech.length; i++) {
        Czech += `**${i + 1 + 10 * amount}**[${radios.EU.Czech[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇨🇿 Czech", `>>> ${Czech}`, true);
      amount++;
      let Denmark = "";
      for (let i = 0; i < radios.EU.Denmark.length; i++) {
        Denmark += `**${i + 1 + 10 * amount}**[${radios.EU.Denmark[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇩🇰 Denmark", `>>> ${Denmark}`, true);
      amount++;
      let germany = "";
      for (let i = 0; i < radios.EU.Germany.length; i++) {
        germany += `**${i + 1 + 10 * amount}**[${radios.EU.Germany[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇩🇪 Germany", `>>> ${germany}`, true);
      amount++;
      let Hungary = "";
      for (let i = 0; i < radios.EU.Hungary.length; i++) {
        Hungary += `**${i + 1 + 10 * amount}**[${radios.EU.Hungary[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇭🇺 Hungary", `>>> ${Hungary}`, true);
      amount++;
      let Ireland = "";
      for (let i = 0; i < radios.EU.Ireland.length; i++) {
        Ireland += `**${i + 1 + 10 * amount}**[${radios.EU.Ireland[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇮🇪 Ireland", `>>> ${Ireland}`, true);
      amount++;
      let Italy = "";
      for (let i = 0; i < radios.EU.Italy.length; i++) {
        Italy += `**${i + 1 + 10 * amount}**[${radios.EU.Italy[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇮🇹 Italy", `>>> ${Italy}`, true);
      amount++;
      let Luxembourg = "";
      for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
        Luxembourg += `**${i + 1 + 10 * amount}**[${radios.EU.Luxembourg[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇱🇺 Luxembourg", `>>> ${Luxembourg}`, true);
      amount++;
      let Romania = "";
      for (let i = 0; i < radios.EU.Romania.length; i++) {
        Romania += `**${i + 1 + 10 * amount}**[${radios.EU.Romania[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇷🇴 Romania", `>>> ${Romania}`, true);
      amount++;
      let Serbia = "";
      for (let i = 0; i < radios.EU.Serbia.length; i++) {
        Serbia += `**${i + 1 + 10 * amount}**[${radios.EU.Serbia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇷🇸 Serbia", `>>> ${Serbia}`, true);
      amount++;
      let Spain = "";
      for (let i = 0; i < radios.EU.Spain.length; i++) {
        Spain += `**${i + 1 + 10 * amount}**[${radios.EU.Spain[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇪🇸 Spain", `>>> ${Spain}`, true);
      amount++;
      let Sweden = "";
      for (let i = 0; i < radios.EU.Sweden.length; i++) {
        Sweden += `**${i + 1 + 10 * amount}**[${radios.EU.Sweden[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇸🇪 Sweden", `>>> ${Sweden}`, true);
      amount++;
      let Ukraine = "";
      for (let i = 0; i < radios.EU.Ukraine.length; i++) {
        Ukraine += `**${i + 1 + 10 * amount}**[${radios.EU.Ukraine[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇺🇦 Ukraine", `>>> ${Ukraine}`, true);
      amount++;
      let requests = "";
      for (let i = 0; i < 10; i++) {
        requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🧾 Outros", `>>> ${requests}`, true);
      requests = "";
      for (let i = 10; i < 20; i++) {
        try {
          requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
        } catch { }
      }
      stationsembed3.addField("🧾 Outros", `>>> ${requests}`, true);
      message.channel.send(stationsembed);
      message.channel.send(stationsembed2);
      message.channel.send(stationsembed3);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  databasing: function (client, guildid, userid) {
    try {
      client.stats.ensure("global", {
        commands: 0,
        songs: 0,
        setups: 0
      });
      client.premium.ensure("premiumlist", {
        list: [{
          "u": "XXXYYYXXXYYYXXXYYY"
        }, {
          "g": "XXXYYYXXXYYYXXXYYY"
        }]
      });
      if (guildid) {
        client.stats.ensure(guildid, {
          commands: 0,
          songs: 0
        });
        client.premium.ensure(guildid, {
          enabled: false,
        });
        client.setups.ensure(guildid, {
          textchannel: "0",
          voicechannel: "0",
          category: "0",
          message_cmd_info: "0",
          message_queue_info: "0",
          message_track_info: "0"
        });
        client.settings.ensure(guildid, {
          prefix: config.prefix,
          pruning: true,
          requestonly: true,
          djroles: [],
          djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
          botchannel: [],
        });
      }
      if (userid) {
        client.premium.ensure(userid, {
          enabled: false,
        });
        client.queuesaves.ensure(userid, {
          "TEMPLATEQUEUEINFORMATION": ["queue", "sadasd"]
        });
      }
      if (userid && guildid) {
        client.userProfiles.ensure(userid, {
          id: userid,
          guild: guildid,
          totalActions: 0,
          warnings: [],
          kicks: []
        });
      }
      return;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  escapeRegex: function (str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  autoplay: async function (client, player, type) {
    try {
      if (player.queue.length > 0) return;
      const previoustrack = player.get("previoustrack");
      if (!previoustrack) return;

      const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
      const response = await client.manager.search(mixURL, previoustrack.requester);

      if (!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
        let embed = new MessageEmbed()
          .setTitle("❌ Erro | Não encontrei nada relacionado com a última música!")
          .setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? `I'll leave the Channel: ${client.channels.cache.get(player.voiceChannel).name} in: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}, If the Queue stays Empty! ` : `I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon);
        client.channels.cache.get(player.textChannel).send(embed);
        if (config.settings.LeaveOnEmpty_Queue.enabled && type != "skip") {
          return setTimeout(() => {
            try {
              player = client.manager.players.get(player.guild);
              if (player.queue.size === 0) {
                let embed = new MessageEmbed()
                try {
                  embed.setTitle("❌ A Fila terminou.")
                } catch { }
                try {
                  embed.setDescription(`Sai do canal: ${client.channels.cache.get(player.voiceChannel).name} porque a fila acabou por: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
                } catch { }
                try {
                  embed.setColor(ee.wrongcolor)
                } catch { }
                try {
                  embed.setFooter(ee.footertext, ee.footericon);
                } catch { }
                client.channels.cache
                  .get(player.textChannel)
                  .send(embed)
                try {
                  client.channels.cache
                    .get(player.textChannel)
                    .messages.fetch(player.get("playermessage")).then(msg => {
                      try {
                        msg.delete({
                          timeout: 7500
                        }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                      } catch { /* */ }
                    });
                } catch (e) {
                  console.log(String(e.stack).yellow);
                }
                player.destroy();
              }
            } catch (e) {
              console.log(String(e.stack).yellow);
            }
          }, config.settings.LeaveOnEmpty_Queue.time_delay);
        } else {
          player.destroy();
        }
      }
      player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
      return player.play();
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  
  arrayMove: function (array, from, to) {
    try {
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  isrequestchannel: function (client, message) {
    try {
      if (!message) return;
      if (!message.guild) return;

      if (client.setups.get(message.guild.id, "textchannel") !== "0") {

        let channel = message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel"));

        if (!channel) {
          return false;
        }

        if (channel.id === message.channel.id) {
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_track_info: async function (client, player, track) {
    try {
      let message = player.get("message");
      let db = client.setups.get(message.guild.id);

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle("Tocando :notes: **`" + track.title + "`**")
        } catch { }
        try {
          embed.setURL(track.uri)
        } catch { }
        try {
          embed.setColor(ee.color)
        } catch { }
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
        } catch { }
        try {
          embed.addField("⌛️ Duração: ", `${track.isStream ? "LIVE STREAM" : format(track.duration)}`, true)
        } catch { }
        try {
          embed.addField("💯 Artista: ", `${track.author}`, true)
        } catch { }
        try {
          embed.addField("🎚 Equalizador: ", `🎵 Music`, true)
        } catch { }
        try {
          embed.addField("🔊 Volume", `${player.volume}%`, true)
        } catch { }
        try {
          embed.addField(`${player.queueRepeat ? `${emoji.msg.repeat_mode} Queue Loop: ` : `${emoji.msg.repeat_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.enabled} Habilitado` : player.trackRepeat ? `${emoji.msg.enabled} Habilitado` : `${emoji.msg.disabled} Desabilitado`}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.pause_resume}  Estado`, `${player.playing ? `${emoji.msg.resume}  Playing Song` : `${emoji.msg.pause}  Paused Song`}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.time} Progresso: `, createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, `▬`, "🔶"))
        } catch { }
        try {
          embed.setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch { }
        return embed;
      }

      function QueueEmbed(client, player) {
        const queue = player.queue;
        const embed = new MessageEmbed().setAuthor(`Resoute  | Fila`);
        const multiple = 15;
        const page = 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField("**0) Faixa atual**", `**${queue.current.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*request by: ${queue.current.requester.tag}*`);
        if (!tracks.length) embed.setDescription(`Sem músicas na ${page > 1 ? `pagina ${page}` : "fila"}.`);
        else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** **${track.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*request by: ${track.requester.tag}*`).join("\n"));
        embed.setColor(ee.color);
        embed.setFooter(ee.footertext, ee.footericon);
        return embed;
      }

      function format(millis) {
        try {
          var h = Math.floor(millis / 3600000),
            m = Math.floor(millis / 60000),
            s = ((millis % 60000) / 1000).toFixed(0);
          if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
          else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        } catch (e) {
          console.log(String(e.stack).bgRed)
        }
      }

      function createBar(total, current, size = 25, line = "▬", slider = "🔶") {
        if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(slider)) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;

      }

      function edit_10_s_np(track_info_msg, track, queue_info_msg, client, player) {
        track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        queue_info_msg.edit(QueueEmbed(client, player)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      }

      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);

      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(QueueEmbed(client, player)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })

      let track_info_msg = await message.channel.messages.fetch(db.message_track_info);

      if (!track_info_msg) return message.channel.send(new MessageEmbed()).then(msg => {
        msg.react(emoji.react.rewind)
        msg.react(emoji.react.forward)
        msg.react(emoji.react.pause_resume)
        msg.react(emoji.react.stop)
        msg.react(emoji.react.previous_track)
        msg.react(emoji.react.skip_track)
        msg.react(emoji.react.replay_track)
        msg.react(emoji.react.reduce_volume)
        msg.react(emoji.react.raise_volume)
        msg.react(emoji.react.toggle_mute)
        msg.react(emoji.react.repeat_mode)
        msg.react(emoji.react.autoplay_mode)
        msg.react(emoji.react.shuffle)
        msg.react(emoji.react.show_queue)
        msg.react(emoji.react.show_current_track)
        msg.edit(SongEmbed(player.queue.current));
        client.setups.set(message.guild.id, msg.id, "message_track_info");
      })
      track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      queue_info_msg.edit(QueueEmbed(client, player)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 20 * 1000);
        });
        if (i >= 5) i = 0;
        const curplayer = client.manager.players.get(player.guild);
        if (!curplayer) {
          reset(track_info_msg, queue_info_msg);
          break;
        }
        edit_10_s_np(track_info_msg, track, queue_info_msg, client, curplayer)
      }

      function reset(track_info_msg, queue_info_msg) {
        let embed2 = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("Resolute | Fila")
          .setDescription(`**Vazia\nEntre em um canal de voz e a fila ira aparecer aqui!**`)
        let embed3 = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("Resolute | Atualmente não está tocando nenhuma música!")
          .setDescription(`Entre em um canal de voz para tocar uma música!\n[Invite ${client.user.tag}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
        track_info_msg.edit(embed3).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        queue_info_msg.edit(embed2).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_queue_info: async function (client, player) {
    try {
      const queue = player.queue;
      const embed = new MessageEmbed().setAuthor(`Resolute | Fila`);
      const multiple = 15;
      const page = 1;
      const end = page * multiple;
      const start = end - multiple;
      const tracks = queue.slice(start, end);
      if (queue.current) embed.addField("**0) Faixa atual**", `**${queue.current.title.substr(0, 60)}** - ${queue.current.isStream ? "LIVE STREAM" : format(queue.current.duration)}\n*Requisitado por: ${queue.current.requester.tag}*`);
      if (!tracks.length) embed.setDescription(`Sem músicas na ${page > 1 ? `pagina ${page}` : "fila"}.`);
      else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** **${track.title.substr(0, 60)}** - ${track.isStream ? "LIVE STREAM" : format(track.duration)}\n*Requisitado por: ${track.requester.tag}*`).join("\n"));
      embed.setColor(ee.color);
      embed.setFooter(ee.footertext, ee.footericon);
      embed;
      let message = player.get("message");
      let db = client.setups.get(message.guild.id)

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle(`Tocando ${emoji.msg.playing} **\`` + track.title + "`**")
        } catch { }
        try {
          embed.setURL(track.uri)
        } catch { }
        try {
          embed.setColor(ee.color)
        } catch { }
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
        } catch { }
        try {
          embed.addField(`${emoji.msg.time} Duração: `, `${track.isStream ? "LIVE STREAM" : format(track.duration)}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.song_by} Artista: `, `${track.author}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.equalizer} Equalizador: `, `🎵 Music`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.raise_volume} Volume`, `${player.volume}%`, true)
        } catch { }
        try {
          embed.addField(`${player.queueRepeat ? `${emoji.msg.repeat_mode} Queue Loop: ` : `${emoji.msg.repeat_mode} Song Loop: `}`, `${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.pause_resume} State`, `${player.playing ? `${emoji.msg.resume} Playing Song` : `${emoji.msg.pause} Paused Song`}`, true)
        } catch { }
        try {
          embed.addField(`${emoji.msg.time} Progresso: `, createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", "🔶"))
        } catch { }
        try {
          embed.setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch { }
        return embed;
      }

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }

      function createBar(total, current, size = 25, line = "▬", slider = "🔶") {
        if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(slider)) return `**[${slider}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
        return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
      }

      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);

      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(embed).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })
      queue_info_msg.edit(embed)

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  swap_pages: async function (client, message, description, TITLE) {
    let currentPage = 0;

    let embeds = [];

    if (Array.isArray(description)) {
      try {
        let k = 15;
        for (let i = 0; i < description.length; i += 15) {
          const current = description.slice(i, k);
          k += 15;
          const embed = new Discord.MessageEmbed()
            .setDescription(current)
            .setTitle(TITLE)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          embeds.push(embed);
        }
        embeds;
      } catch { }
    } else {
      try {
        let k = 1000;
        for (let i = 0; i < description.length; i += 1000) {
          const current = description.slice(i, k);
          k += 1000;
          const embed = new Discord.MessageEmbed()
            .setDescription(current)
            .setTitle(TITLE)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          embeds.push(embed);
        }
        embeds;
      } catch { }
    }
    if (embeds.length === 1) return message.channel.send(embeds[0])
    const queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );
    let reactionemojis = ["⬅️", "⏹", "➡️"];
    try {
      for (const emoji of reactionemojis)
        await queueEmbed.react(emoji);
    } catch { }

    const filter = (reaction, user) =>
      (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 45000
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          } else {
            currentPage = 0
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          } else {
            currentPage = embeds.length - 1
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch { }
    });

  },
  swap_pages2: async function (client, message, embeds) {
    let currentPage = 0;
    if (embeds.length === 1) return message.channel.send(embeds[0])
    queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );
    let reactionemojis = ["⬅️", "⏹", "➡️"];
    try {
      for (const emoji of reactionemojis)
        await queueEmbed.react(emoji);
    } catch { }

    const filter = (reaction, user) =>
      (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 45000
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          } else {
            currentPage = 0
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          } else {
            currentPage = embeds.length - 1
            queueEmbed.edit(`**Página atual - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch { }
    });

  }
}