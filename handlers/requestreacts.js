const { MessageEmbed } = require("discord.js")
const config = require("../config/config.json")
const emoji = require("../config/emojis.json");
const ee = require("../config/embed.json")
const {
  format,
  databasing,
  escapeRegex,
  autoplay,
  createBar
} = require("../handlers/functions")
const playermanager = require("../handlers/playermanager");
let hasmap = new Map();

module.exports = async (client, message) => {
  try {
    client.on("messageReactionAdd", async (reaction, user) => {
      try {
        if (reaction.message.channel.partial) await reaction.message.channel.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        const {
          message
        } = reaction;

        let db = client.setups.get(message.guild.id)

        if(!db) return;

        if (message.channel != db.textchannel) return;

        try {
          reaction.users.remove(user.id).catch(e => console.log(String(e.stack).yellow));
        } catch { /* */ }

        const member = message.guild.members.cache.get(user.id);

        const {
          channel
        } = member.voice;

        if (!channel)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You need to join a voice channel.`)
          );

        const player = client.manager.players.get(message.guild.id);

        if (!player)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
          );

        if (player && channel.id !== player.voiceChannel)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | I am already playing somewhere else!`)
            .setDescription(`You can listen to me in: \`${message.guild.channels.cache.get(player.VoiceChannel).name}\``)
          );

        if (channel.id !== db.voicechannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`${emoji.msg.ERROR} ERROR | You need to be in the: \`${message.guild.channels.cache.get(db.voicechannel).name}\` VoiceChannel`));

        let reactionemoji = reaction.emoji.id || reaction.emoji.name;
        switch (reactionemoji) {
          case String(emoji.react.rewind):

            let rewind = player.position - 20 * 1000;

            if (rewind >= player.queue.current.duration - player.position || rewind < 0) {
              rewind = 0;
            }

            player.seek(Number(rewind));

            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.rewind} Rewinded the song for: 20 Seconds, to: ${format(Number(player.position))}`)
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

            let forward = Number(player.position) + 20 * 1000;

            if (Number(forward) >= player.queue.current.duration) {
              forward = player.queue.current.duration - 1000;
            }

            player.seek(Number(forward));

            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.forward} Forwarded the Song for: 20 Seconds, to: ${format(Number(player.position))}`)
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
              .setTitle(`${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
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
              .setTitle(`${emoji.msg.stop} Stopped and left your channel`)
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
                .setTitle(`${emoji.msg.ERROR} Error | There is no previous song yet!`)
              ).then(msg => {
                try {
                  msg.delete({
                    timeout: 4000
                  }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                } catch { /* */ }
              });
            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.previous_track} Playing Previous Track`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            ).then(msg => {
              try {
                msg.delete({
                  timeout: 4000
                }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
              } catch { /* */ }
            });

            let type = "skiptrack:youtube";

            if (player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"

            playermanager(client, message, Array(player.queue.previous.uri), type);
            break;
          case String(emoji.react.skip_track):

            if (client.settings.get(message.guild.id, `djroles`).toString() !== "") {

              let channelmembersize = channel.members.size;
              let voteamount = 0;
              if (channelmembersize <= 3) voteamount = 1;
              voteamount = Math.ceil(channelmembersize / 3);

              if (!player.get(`vote-${user.id}`)) {
                player.set(`vote-${user.id}`, true);
                player.set("votes", String(Number(player.get("votes")) + 1));
                if (voteamount <= Number(player.get("votes"))) {
                  message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
                    .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes\n\n> Amount reached! Skipping ${emoji.msg.skip_track}`)
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
                    .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
                    .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes`)
                  );
                }
              } else {
                player.set(`vote-${user.id}`, false)
                player.set("votes", String(Number(player.get("votes")) - 1));
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.color)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.SUCCESS} Success | Removed your Vote!`)
                  .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes`)
                );
              }
            } else {

              if (player.queue.size == 0) {

                if (player.get("autoplay")) return autoplay(client, player, "skip");

                player.destroy();

                return message.channel.send(new MessageEmbed()
                  .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
                  .setColor(ee.color)
                  .setFooter(ee.footertext, ee.footericon)
                );
              }

              player.stop();

              return message.channel.send(new MessageEmbed()
                .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.skip_track} Skipped to the next Song`)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
              );
            }
            break;

          case String(emoji.react.replay_track):

            player.seek(0);

            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.replay_track} Replaying Current Track`)
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

            let volumedown = player.volume - 10;

            if (volumedown < 0) volumedown = 0;

            player.setVolume(volumedown);

            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.reduce_volume} Volume set to: **${player.volume} %**`)
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

            let volumeup = player.volume + 10;

            if (volumeup > 150) volumeup = 0;

            player.setVolume(volumeup);

            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.raise_volume} Volume set to: **${player.volume} %**`)
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

            let volumemute = player.volume === 0 ? 50 : 0;

            player.setVolume(volumemute);

            message.channel.send(new MessageEmbed()
              .setTitle(`${player.volume === 0 ? `${emoji.msg.toggle_mute} Muted the Player` : `${emoji.msg.reduce_volume} Unmuted the Player`}`)
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
          case String(emoji.react.repeat_mode):

            if (!player.trackRepeat && !hasmap.get(message.guild.id)) {
              hasmap.set(message.guild.id, 1)

              player.setQueueRepeat(!player.queueRepeat);

              player.setTrackRepeat(!player.trackRepeat);

              message.channel.send(new MessageEmbed()
                .setTitle(`${emoji.msg.repeat_mode} Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                .setDescription(`And Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
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
                .setTitle(`${emoji.msg.repeat_mode} Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                .setDescription(`And Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
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
                .setTitle(`${emoji.msg.repeat_mode} Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                .setDescription(`And Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
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
              .setTitle(`${emoji.msg.SUCCESS} Success | ${player.get("autoplay") ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Autoplay`)
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
              .setTitle(`${emoji.msg.shuffle} The queue is now shuffled.`)
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
              .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
                dynamic: true
              }))
              .setColor(ee.color);

            if (player.queue.current) embed.addField("**0) CURRENT TRACK**", `[${player.queue.current.title.substr(0, 35)}](${player.queue.current.uri}) - ${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0]} - request by: **${player.queue.current.requester.tag}**`);

            const tracks = player.queue;

            if (!tracks.length)
              return message.channel.send(embed.setDescription(`${emoji.msg.ERROR} No tracks in the queue`)).then(msg => {
                try {
                  msg.delete({
                    timeout: 5000
                  }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                } catch { /* */ }
              })

            if (tracks.length < 15)
              return message.channel.send(embed.setDescription(tracks.map((track, i) => `**${++i})** [${track.title.substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))).then(msg => {
                try {
                  msg.delete({
                    timeout: 5000
                  }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                } catch { /* */ }
              });

            let quelist = [];
            for (let i = 0; i < tracks.length; i += 15) {
              let songs = tracks.slice(i, i + 15);
              quelist.push(songs.map((track, index) => `**${i + ++index})** [${track.title.split("[").join("{").split("]").join("}").substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))
            }
            let limit = quelist.length <= 5 ? quelist.length : 5
            for (let i = 0; i < limit; i++) {
              await user.send(embed.setDescription(String(quelist[i]).substr(0, 2048)));
            }
            user.send(new MessageEmbed()
              .setDescription(`${emoji.msg.SUCCESS} Sent from <#${message.channel.id}>${quelist.length <= 5 ? "" : "\nNote: Send 5 Embeds, but there would be more..."}`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            )
            message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Check your direct messages to see the Queue`)
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
              .setAuthor("Current song playing:", user.displayAvatarURL({
                dynamic: true
              }))
              .setThumbnail(player.queue.current.displayThumbnail(1))
              .setURL(player.queue.current.uri)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${player.playing ? emoji.msg.resume : emoji.msg.pause} **${player.queue.current.title}**`)
              .addField(`${emoji.msg.time} Duration: `, "`" + format(player.queue.current.duration) + "`", true)
              .addField(`${emoji.msg.song_by} Song By: `, "`" + player.queue.current.author + "`", true)
              .addField(`${emoji.msg.repeat_mode} Queue length: `, `${player.queue.length} Songs`, true)
              .addField(`${emoji.msg.time} Progress: `, createBar(player))
              .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
                dynamic: true
              }))
            ).then(msg => {
              try {
                msg.delete({
                  timeout: 4000
                }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
              } catch { /* */ }
            });
            break;
        }
      } catch (e) {
        console.log(String(e.stack).yellow) /* */
      }
    })
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}