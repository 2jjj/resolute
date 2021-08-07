const { Manager } = require("erela.js"), { MessageEmbed } = require("discord.js"),
  ms = require("ms"),
  Spotify = require("erela.js-spotify"),
  Deezer = require("erela.js-deezer"),

  config = require("../config/config.json"),
  emoji = require("../config/emojis.json"),
  ee = require("../config/embed.json"),

  {
    createBar,
    delay,
    format,
    databasing,
    playANewTrack,
    isrequestchannel,
    edit_request_message_track_info,
    getRandomInt,
    autoplay
  } = require("../handlers/functions"),
  playermanager = require("../handlers/playermanager"),

  clientID = config.spotify.clientID,
  clientSecret = config.spotify.clientSecret,

  hasmap = new Map();

module.exports = (client) => {
  try {
    if (!clientID || !clientSecret) {
      client.manager = new Manager({
        nodes: config.clientsettings.nodes,
        plugins: [
          new Deezer()
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      });
    } else {
      client.manager = new Manager({
        nodes: config.clientsettings.nodes,
        plugins: [
          new Spotify({
            clientID,
            clientSecret
          }),
          new Deezer()
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      });
    }
    client.manager
      .on("nodeConnect", (node) => {
        try {
          const stringlength = 69;
          console.log("\n")
          console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + `Node connected: `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node connected: `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
          console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
        } catch { /* */ }
      })
      .on("nodeCreate", (node) => {
        try {
          const stringlength = 69;
          console.log("\n")
          console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + `Node created: `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node created: `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightGreen)
          console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
          console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
        } catch { /* */ }
      })
      .on("nodeReconnect", (node) => {
        try {
          const stringlength = 69;
          console.log("\n")
          console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightYellow)
          console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
          console.log(`     ┃ `.bold.brightYellow + `Node reconnected: `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightYellow)
          console.log(`     ┃ `.bold.brightYellow + ` { ${node.options.identifier} } `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightYellow)
          console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
          console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightYellow)
        } catch { /* */ }
      })
      .on("nodeDisconnect", (node) => {
        try {
          const stringlength = 69;
          console.log("\n")
          console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightMagenta)
          console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightMagenta)
          console.log(`     ┃ `.bold.brightMagenta + `Node Disconnected: `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightMagenta)
          console.log(`     ┃ `.bold.brightMagenta + ` { ${node.options.identifier} } `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightMagenta)
          console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightMagenta)
          console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightMagenta)

        } catch { /* */ }
      })
      .on("nodeError", (node, error) => {
        try {
          const stringlength = 69;
          console.log("\n")
          console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
          console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
          console.log(`     ┃ `.bold.brightRed + `Node Error: `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightRed)
          console.log(`     ┃ `.bold.brightRed + ` { ${node.options.identifier} } `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightRed)
          console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
          console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
        } catch { /* */ }
      })
      .on("playerCreate", async (player) => {
        player.setVolume(50);
        player.set("autoplay", false);
        player.set(`afk-${player.guild}`, false)
        player.set(`afk-${player.get("playerauthor")}`, false)
        player.setEQ(client.eqs.music);
        try {
          let guild = client.guilds.cache.get(player.guild)
          if (config.settings.serverDeaf) guild.me.voice.setDeaf(true);
        } catch (e) {
          console.log(e)
        }
        databasing(client, player.guild, player.get("playerauthor"));

        var embed = new MessageEmbed();
        try {
          embed.setTitle(`:thumbsup: **Entrei em:** \`${client.channels.cache.get(player.voiceChannel).name}\``)
        } catch { }
        try {
          embed.setDescription(`**Ligado no chat: ** <#${client.channels.cache.get(player.textChannel).id}>`)
        } catch { }
        if (isrequestchannel(client, player.get("message"))) return;
        client.channels.cache.get(player.textChannel).send(embed.setColor(ee.color)).catch(e => console.log("this prevents a crash"));
      })
      .on("playerMove", (player, oldChannel, newChannel) => {
        if (!newChannel) {
          try {
            var embed = new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon);
          } catch { }
          try {
            embed.setTitle(`${emoji.msg.ERROR} A fila acabou`)
          } catch { }
          try {
            embed.setDescription(`Deixei o canal: \`🔈 ${client.channels.cache.get(player.voiceChannel).name}\``)
          } catch { }
          client.channels.cache.get(player.textChannel).send(embed);
          try {
            client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(msg => {
              try {
                msg.delete({
                  timeout: 1500
                }).catch(e => console.log("Couldn't delete message this is a catch to prevent a crash".grey));
              } catch { /* */ }
            });
          } catch (e) {
            console.log(String(e.stack).yellow);
          }
          player.destroy();
        } else {
          player.voiceChannel = newChannel;
          if (player.paused) return;
          setTimeout(() => {
            player.pause(true);
            setTimeout(() => player.pause(false), client.ws.ping * 2);
          }, client.ws.ping * 2);
        }
      })
      .on("trackStart", async (player, track) => {
        try {

          player.set("votes", "0");

          for (const userid of client.guilds.cache.get(player.guild).members.cache.map(member => member.user.id))
            player.set(`vote-${userid}`, false);

          player.set("previoustrack", track);

          client.stats.inc(player.guild, "songs");
          client.stats.inc("global", "songs");

          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(2);
            }, 500);
          });

          var embed = new MessageEmbed().setColor(ee.color)
          try {
            embed.setTitle(`**${emoji.msg.playing} | ${track.title}**`)
          } catch { }
          try {
            embed.setURL(track.uri)
          } catch { }
          try { 
            embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
          } catch { }
          try {
            embed.addField(`**${emoji.msg.time} Duração: **`, `\`❯ ${track.isStream ? `LIVE STREAM` : format(track.duration)}\``, true)
          } catch { }
          try {
            embed.addField(`**${emoji.msg.song_by} Artista:**`, `\`❯ ${track.author}\``, true)
          } catch { }
          try {
            embed.addField(`**${emoji.msg.repeat_mode} Tamanho da fila:**`, `\`❯ ${player.queue.length} Músicas\``, true)
          } catch { }
          try {
            embed.setFooter(`Requisitado por: ${track.requester.tag}`, track.requester.displayAvatarURL({ dynamic: true }));
          } catch { }

          if (isrequestchannel(client, player.get(`message`))) return edit_request_message_track_info(client, player, track);

          if (client.settings.get(player.guild, `pruning`))
            client.channels.cache.get(player.textChannel).send(embed).then(msg => {

              try {
                if (player.get(`playingsongmsg`) && msg.id !== player.get(`playingsongmsg`).id)
                  player.get(`playingsongmsg`).delete().catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
              } catch { /* */ }

              player.set(`playingsongmsg`, msg)

              var failed = false;
              try {
                msg.react(emoji.react.rewind).catch(e => failed = true);
                msg.react(emoji.react.forward).catch(e => failed = true);
                msg.react(emoji.react.pause_resume).catch(e => failed = true);
                msg.react(emoji.react.stop).catch(e => failed = true);
                msg.react(emoji.react.previous_track).catch(e => failed = true);
                msg.react(emoji.react.skip_track).catch(e => failed = true);
                msg.react(emoji.react.replay_track).catch(e => failed = true);
                msg.react(emoji.react.reduce_volume).catch(e => failed = true);
                msg.react(emoji.react.raise_volume).catch(e => failed = true);
                msg.react(emoji.react.toggle_mute).catch(e => failed = true);
                msg.react(emoji.react.repeat_mode).catch(e => failed = true);
                msg.react(emoji.react.autoplay_mode).catch(e => failed = true);
                msg.react(emoji.react.shuffle).catch(e => failed = true);
                msg.react(emoji.react.show_queue).catch(e => failed = true);
                msg.react(emoji.react.show_current_track).catch(e => failed = true);
              } catch (e) {
                msg.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setTitle(`${emojis.msg.ERROR} ERRO | Um erro ocorreu`)
                  .setDescription(`\`\`\`${e.message}\`\`\`\n Certifique-se que eu tenho permissões para adicionar reações (personalizadas)`)
                )
              }
              if (failed)
                msg.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emojis.msg.ERROR} ERRO | Não foi possível adicionar reação`)
                  .setDescription(`Certifique-se que eu tenho permissões para adicionar reações (personalizadas)`)
                )

              var collector = msg.createReactionCollector((reaction, user) => user.id !== client.user.id, {
                time: track.duration > 0 ? track.duration : 600000
              });

              collector.on(`collect`, async (reaction, user) => {
                try {
                  if (user.bot) return;

                  const {
                    message
                  } = reaction;

                  var db = client.setups.get(message.guild.id)

                  try {
                    reaction.users.remove(user.id).catch(e => console.log(String(e.stack).yellow));
                  } catch { /* */ }

                  const member = message.guild.members.cache.get(user.id);

                  const {
                    channel
                  } = member.voice;

                  if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`${emoji.msg.ERROR} ERROR | You need to join a voice channel.`));

                  var player = client.manager.players.get(message.guild.id);

                  if (player && channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`${emoji.msg.ERROR} ERROR | I am already playing somewhere else!`).setDescription(`You can listen to me in: ${message.guild.channels.cache.get(player.VoiceChannel).name}`));

                  var reactionemoji = reaction.emoji.id || reaction.emoji.name;
                  switch (reactionemoji) {
                    case String(emoji.react.rewind):

                      var rewind = player.position - 20 * 1000;

                      if (rewind >= player.queue.current.duration - player.position || rewind < 0) {
                        rewind = 0;
                      }

                      player.seek(Number(rewind));

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.rewind} | Voltei 20 segundos na música atual!`)//${format(Number(player.position))}
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.forward):

                      var forward = Number(player.position) + 20 * 1000;

                      if (Number(forward) >= player.queue.current.duration) {
                        forward = player.queue.current.duration - 1000;
                      }

                      player.seek(Number(forward));

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.forward} | Avançei 20 Segundos na música atual!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.pause_resume):

                      player.pause(player.playing);

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${player.playing ? `${emoji.msg.resume} | Despausei` : `${emoji.msg.pause} | Pausei`} o Player!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;

                    case String(emoji.react.stop):

                      player.destroy();

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.stop} | Parei a música e sai de seu canal de voz!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.previous_track):

                      if (!player.queue.previous || player.queue.previous === null)
                        return message.channel.send(new MessageEmbed()
                          .setColor(ee.wrongcolor)
                          .setFooter(ee.footertext, ee.footericon)
                          .setTitle(`${emoji.msg.ERROR} Erro | Não há nenhuma música anterior!`)
                        ).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        });
                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.previous_track} | Tocando a música anterior!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });

                      var type = "skiptrack:youtube";

                      if (player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"

                      playermanager(client, message, Array(player.queue.previous.uri), type);
                      break;
                    case String(emoji.react.skip_track):

                      if (client.settings.get(message.guild.id, `djroles`).toString() !== "") {

                        var channelmembersize = channel.members.size;
                        var voteamount = 0;
                        if (channelmembersize <= 3) voteamount = 1;
                        voteamount = Math.ceil(channelmembersize / 3);

                        if (!player.get(`vote-${user.id}`)) {
                          player.set(`vote-${user.id}`, true);
                          player.set("votes", String(Number(player.get("votes")) + 1));
                          if (voteamount <= Number(player.get("votes"))) {
                            message.channel.send(new MessageEmbed()
                              .setColor(ee.color)
                              .setFooter(ee.footertext, ee.footericon)
                              .setTitle(`${emoji.msg.SUCCESS} Sucesso | Adicionei o seu voto!`)
                              .setDescription(`Agora tem: ${player.get("votes")} votos de ${voteamount} votos necessários\n\n> Quantidade alcançada! Pulando ${emoji.msg.skip_track}`)
                            );
                            if (player.queue.size == 0) {
                              player.destroy();
                            } else {
                              player.stop();
                            }
                          } else {
                            return message.channel.send(new MessageEmbed()
                              .setColor(ee.color)
                              .setFooter(ee.footertext, ee.footericon)
                              .setTitle(`${emoji.msg.SUCCESS} Sucesso | Adicionei o seu voto!`)
                              .setDescription(`Agora tem: ${player.get("votes")} votos de ${voteamount} votos necessários`)
                            );
                          }
                        } else {
                          player.set(`vote-${user.id}`, false)
                          player.set("votes", String(Number(player.get("votes")) - 1));
                          return message.channel.send(new MessageEmbed()
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`${emoji.msg.SUCCESS} Sucesso | Removi o seu voto!`)
                            .setDescription(`Agora tem: ${player.get("votes")} votos de ${voteamount} votos necessários`)
                          );
                        }
                      } else {

                        if (player.queue.size == 0) {

                          if (player.get("autoplay")) return autoplay(client, player, "skip");

                          player.destroy();

                          return message.channel.send(new MessageEmbed()
                            .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.stop} Parei a música e sai de seu canal de voz!`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          );
                        }

                        player.stop();

                        return message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.skip_track} Pulei para a próxima música!`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        );
                      }
                      break;

                    case String(emoji.react.replay_track):

                      player.seek(0);

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.replay_track} | Repetindo a primeira música!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.reduce_volume):

                      var volumedown = player.volume - 10;

                      if (volumedown < 0) volumedown = 0;

                      player.setVolume(volumedown);

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.reduce_volume} | Volume setado para: **${player.volume} %**`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.raise_volume):

                      var volumeup = player.volume + 10;

                      if (volumeup > 150) volumeup = 0;

                      player.setVolume(volumeup);

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.raise_volume} | Volume setado para: **${player.volume} %**`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;

                    case String(emoji.react.toggle_mute):

                      var volumemute = player.volume === 0 ? 50 : 0;

                      player.setVolume(volumemute);

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${player.volume === 0 ? `${emoji.msg.toggle_mute} | O player foi mutado` : `${emoji.msg.reduce_volume} | O player foi desmutado`}`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch {  /* */ }
                      });
                      break;
                    case String(emoji.react.repeat_mode):

                      if (!player.trackRepeat && !hasmap.get(message.guild.id)) {
                        hasmap.set(message.guild.id, 1)

                        player.setQueueRepeat(!player.queueRepeat);

                        player.setTrackRepeat(!player.trackRepeat);

                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.repeat_mode} Sucesso! | O Loop na faixa está ${player.trackRepeat ? `Habilitado` : `Desabilitado`}.`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        });
                      }

                      else if (player.trackRepeat && hasmap.get(message.guild.id) === 1) {
                        hasmap.set(message.guild.id, 2)

                        player.setTrackRepeat(!player.trackRepeat);

                        player.setQueueRepeat(!player.queueRepeat);

                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.repeat_mode} Loop na fila está ${player.queueRepeat ? `${emoji.msg.enabled} Habilitado` : `${emoji.msg.disabled} Desabilitado`}.`)
                          .setDescription(`Loop na faixa está ${player.trackRepeat ? `${emoji.msg.enabled} Habilitado` : `${emoji.msg.disabled} Desabilitado`}.`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        });
                      }

                      else {
                        hasmap.delete(message.guild.id)

                        player.setTrackRepeat(false);

                        player.setQueueRepeat(false);

                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.repeat_mode} Loop na fila está ${player.queueRepeat ? `${emoji.msg.enabled} Habilitado` : `${emoji.msg.disabled} Desabilitado`}.`)
                          .setDescription(`Loop na faixa está ${player.trackRepeat ? `${emoji.msg.enabled} Habilitado` : `${emoji.msg.disabled} Desabilitado`}.`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        });
                      }
                      break;
                    case String(emoji.react.autoplay_mode):

                      player.set("autoplay", !player.get("autoplay"))

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.SUCCESS} Successo! | O Autoplay agora está ${player.get("autoplay") ? `Habilitado` : `Desabilitado`}.`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;

                    case String(emoji.react.shuffle):
                      
                      player.queue.shuffle();

                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.shuffle} | A fila agora está embaralhada!`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });
                      break;
                    case String(emoji.react.show_queue):

                      const embed = new MessageEmbed()
                        .setAuthor(`Fila para ${message.guild.name}  -  [ ${player.queue.length} Faixas ]`, message.guild.iconURL({
                          dynamic: true
                        }))
                        .setColor(ee.color);

                      if (player.queue.current) embed.addField("**0) Faixa atual**", `[${player.queue.current.title.substr(0, 35)}](${player.queue.current.uri}) - ${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0]} - Requisitado por: **${player.queue.current.requester.tag}**`);

                      const tracks = player.queue;

                      if (!tracks.length)
                        return message.channel.send(embed.setDescription(`${emoji.msg.ERROR} Sem faixas na fila`)).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        });
                      if (tracks.length < 15)
                        return message.channel.send(embed.setDescription(tracks.map((track, i) => `**${++i})** [${track.title.substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))).then(msg => {
                          try {
                            msg.delete({
                              timeout: 4000
                            }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          } catch { /* */ }
                        })

                      var quelist = [];
                      for (var i = 0; i < tracks.length; i += 15) {
                        var songs = tracks.slice(i, i + 15);
                        quelist.push(songs.map((track, index) => `**${i + ++index})** [${track.title.split("[").join("{").split("]").join("}").substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))
                      }
                      var limit = quelist.length <= 5 ? quelist.length : 5
                      for (var i = 0; i < limit; i++) {
                        await user.send(embed.setDescription(String(quelist[i]).substr(0, 2048)));
                      }
                      user.send(new MessageEmbed()
                        .setDescription(`${emoji.msg.SUCCESS} Enviado de <#${message.channel.id}>${quelist.length <= 5 ? "" : "\nNote: Enviei 5 embeds, mas haveria mais ..."}`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      )
                      message.channel.send(new MessageEmbed()
                        .setTitle(`${emoji.msg.SUCCESS} Verifique suas mensagens diretas para ver a fila`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch { /* */ }
                      });

                      break;
                    case String(emoji.react.show_current_track):

                      return message.channel.send(new MessageEmbed()
                        .setAuthor("Música atual tocando:", user.displayAvatarURL({
                          dynamic: true
                        }))
                        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
                        .setURL(player.queue.current.uri)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`${player.playing ? emoji.msg.resume : emoji.msg.pause} **${player.queue.current.title}**`)
                        .addField(`${emoji.msg.time} Duração: `, "`" + format(player.queue.current.duration) + "`", true)
                        .addField(`${emoji.msg.song_by} Artista: `, "`" + player.queue.current.author + "`", true)
                        .addField(`${emoji.msg.repeat_mode} Tamanho da fila: `, `${player.queue.length} Músicas`, true)
                        .addField(`${emoji.msg.time} Progress: `, createBar(player))
                        .setFooter(`Requisitado por: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
                          dynamic: true
                        }))
                      ).then(msg => {
                        try {
                          msg.delete({
                            timeout: 4000
                          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        } catch {  /* */ }
                      });
                      break;
                  }
                } catch (e) {
                  console.log(e) /* */
                }
              });
            })
        } catch (e) {
          console.log(String(e.stack).yellow)
        }
      })
      .on("trackStuck", (player, track, payload) => {
        var embed = new MessageEmbed()
        try {
          embed.setTitle(`${emoji.msg.ERROR} A Faixa ficou presa!`)
        } catch { }
        try {
          embed.setDescription(`${emoji.msg.skip_track} Eu pulei a faixa: [${track.title}](${track.uri})`)
        } catch { }
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
        } catch { }
        try {
          embed.setColor(ee.wrongcolor)
        } catch { }
        try {
          embed.setFooter(ee.footertext, ee.footericon);
        } catch { }
        client.channels.cache
          .get(player.textChannel)
          .send(embed).then(msg => {
            try {
              msg.delete({
                timeout: 7500
              }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
            } catch { /* */ }
          });
        player.stop();
      })
      .on("trackError", (player, track, payload) => {
        var embed = new MessageEmbed()
        try {
          embed.setTitle(`${emoji.msg.ERROR} Deu um erro na faixa!`)
        } catch { }
        try {
          embed.setDescription(`${emoji.msg.skip_track} Eu pulei a faixa: **${track.title}**`)
        } catch { }
        try {
          embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
        } catch { }
        try {
          embed.setColor(ee.wrongcolor)
        } catch { }
        try {
          embed.setFooter(ee.footertext, ee.footericon);
        } catch { }
        player.stop();
        client.channels.cache
          .get(player.textChannel)
          .send(embed).then(msg => {
            try {
              msg.delete({
                timeout: 7500
              }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
            } catch { /* */ }
          });

      })
      .on("queueEnd", async (player) => {

        databasing(client, player.guild, player.get("playerauthor"));
        if (player.get("autoplay")) return autoplay(client, player);

        if (config.settings.LeaveOnEmpty_Queue.enabled) {
          setTimeout(() => {
            try {
              player = client.manager.players.get(player.guild);
              if (player.queue.size === 0) {
                var embed = new MessageEmbed()
                try {
                  embed.setTitle(`${emoji.msg.ERROR} A fila acabou.`)
                } catch { }
                try {
                  embed.setDescription(`Eu sai do canal: \`${client.channels.cache.get(player.voiceChannel).name}\` Pois a fila estava vazia!`)// | ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}
                } catch { }
                try {
                  embed.setColor(ee.wrongcolor)
                } catch { }
                try {
                  embed.setFooter(ee.footertext, ee.footericon);
                } catch { }

                if (player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                  return client.channels.cache.get(player.textChannel).send(embed.setDescription(`Eu não irei deixar o canal o pois meu afk está ✔️ Habilitado`)).then(msg => {
                    try {
                      msg.delete({
                        timeout: 4000
                      }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    } catch {
                      /* */
}
                  });

                client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                  try {
                    msg.delete({
                      timeout: 4000
                    }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                  } catch { /* */ }
                });

                try {
                  client.channels.cache
                    .get(player.textChannel)
                    .messages.fetch(player.get("playermessage")).then(msg => {
                      try {
                        msg.delete({
                          timeout: 4000
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
        }
      });
    client.once("ready", () => {
      client.manager.init(client.user.id);
    });
    client.on("raw", (d) => client.manager.updateVoiceState(d));

    client.on("channelDelete", channel => {
      try {
        if (channel.type === "voice") {
          if (channel.members.has(client.user.id)) {
            var player = client.manager.players.get(channel.guild.id);
            if (!player) return;
            if (channel.id === player.voiceChannel) {

              player.destroy();
            }
          }
        }
      } catch { }
    })

    client.on("guildRemove", guild => {
      try {
        var player = client.manager.players.get(guild.id);
        if (!player) return;
        if (guild.id == player.guild) {

          player.destroy();
        }
      } catch { /* */ }
    })
    client.on("voiceStateUpdate", (oldState, newState) => {
      if (newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false) {
        try {
          const channel = newState.member.guild.channels.cache.find(
            channel =>
              channel.type === "text" &&
              (channel.name.toLowerCase().includes("cmd") || channel.name.toLowerCase().includes("command") || channel.toLowerCase().name.includes("bot")) &&
              channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
          );
          channel.send("Não me desmute!, Eu me muto novamente! Isso lhe da uma experiência mais rápida e mais suave!")
          newState.setDeaf(true);
        } catch (error) {
          try {
            console.log("could not send info msg in a botchat")
            const channel = newState.member.guild.channels.cache.find(
              channel =>
                channel.type === "text" &&
                channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
            );
            channel.send("Não me desmute!, Eu me muto novamente! Isso lhe da uma experiência mais rápida e mais suave!")
            newState.setDeaf(true);
          } catch (error) {
            console.log("could not send info msg in a random chat")
            newState.setDeaf(true);
          }
        }
      }

      if (oldState.channelID && !newState.channelID) {

        try {
          if (oldState.member.user.id === client.user.id) {
            var player = client.manager.players.get(oldState.guild.id);
            if (!player) return;

            player.destroy();
          }
        } catch { }
      }
      var player = client.manager.players.get(newState.guild.id);
      if (!player) return;
      databasing(client, player.guild, player.get("playerauthor"));
      if (config.settings.leaveOnEmpty_Channel.enabled && oldState && oldState.channel) {
        player = client.manager.players.get(oldState.guild.id);

        if (!oldState.guild.me.voice.channel) return player.destroy();

        if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
          setTimeout(() => {
            try {
              player = client.manager.players.get(oldState.guild.id);

              if (!oldState.guild.me.voice.channel && player) return player.destroy();

              if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                var embed = new MessageEmbed()
                  .setTitle(`${emoji.msg.ERROR} A fila acabou | Canal vazio`)
                  .setDescription(`Eu sai do canal: ${client.channels.cache.get(player.voiceChannel).name} Porque o canal estava vazio! | ${ms(config.settings.leaveOnEmpty_Channel.time_delay, { long: true })}`)
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon);

                if (player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                  return client.channels.cache.get(player.textChannel).send(embed.setDescription(`Eu não irei deixar o canal o pois meu afk está ✔️ Habilitado`)).then(msg => {
                    try {
                      msg.delete({
                        timeout: 4000
                      }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    } catch { /* */ }
                  });
                client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                  try {
                    msg.delete({
                      timeout: 4000
                    }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                  } catch {  /* */ }
                });
                try {
                  client.channels.cache
                    .get(player.textChannel)
                    .messages.fetch(player.get("playermessage")).then(msg => {
                      try {
                        msg.delete({
                          timeout: 4000
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
          }, config.settings.leaveOnEmpty_Channel.time_delay);
        }
      }
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};
