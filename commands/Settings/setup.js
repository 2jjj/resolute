const {
  MessageEmbed
} = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require("../../config/emojis.json");

module.exports = {
  name: "setup",
  category: "⚙️ Settings",
  aliases: ["musicsetup"],
  cooldown: 10,
  usage: "setup",
  description: "Creates an unique Music Setup for Requesting Songs!",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let musiccmds = [];
      const commands = (category) => {
        return client.commands.filter((cmd) => cmd.category.toLowerCase().includes("music")).map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        if (client.categories[i].toLowerCase().includes("music")) {
          musiccmds = commands(client.categories[i]);
        }
      }
      
      let oldsetup = client.setups.get(message.guild.id);
      
      if (oldsetup.textchannel != "0") {
        try {
          message.guild.channels.cache.get(oldsetup.textchannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.voicechannel).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
        try {
          message.guild.channels.cache.get(oldsetup.category).delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        } catch {}
      }
      
      message.guild.channels.create("Tortuguita- Requests", {
          type: 'category',
          permissionOverwrites: [{
            id: message.guild.id,
            allow: ['VIEW_CHANNEL'],
          }, ],
        })
        .then((channel1) => {
          try {
            
            let maxbitrate = 96000;
            
            let boosts = message.guild.premiumSubscriptionCount;
            
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;

            message.guild.channels.create(`🎧｜Music`, {
                type: 'voice',
                bitrate: maxbitrate, 
                userLimit: 10, 
                parent: channel1.id, 
                permissionOverwrites: [{
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                }, ],
              })
              .then((channel2) => {
                try {
                  message.guild.channels.create(`🎵｜requests`, {
                      type: 'text', 
                      rateLimitPerUser: 6, 
                      topic: `To request a Track, simply Type the **SONG NAME** into the Channel or the **URL** and the Bot will play it! Make sure that you are in the **right** Voice Channel (🎧｜Music)!`,
                      parent: channel1.id,
                      permissionOverwrites: [{
                          id: message.guild.id,
                          allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                        },
                        { 
                          id: client.user.id,
                          allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                        }
                      ],
                    })
                    .then(async (channel3) => {
                      let embed1 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Tortuguita| Request | Guide")
                        .setDescription(`Enter the song name or URL to play a song\n\nYou can also type \`${prefix}command <Parameters>\``)
                        .addField(`Commands`, musiccmds.join(", "))
                        .addField(`Reactions`, `${emoji.msg.rewind} Rewind 20 seconds\n${emoji.msg.forward} Forward 20 seconds\n${emoji.msg.pause_resume} Pause/Resume\n${emoji.msg.stop} Stop Track\n${emoji.msg.previous_track} Play previous\n`, true)
                        .addField(`\u200b`, `${emoji.msg.skip_track} Skip / Next\n${emoji.msg.replay_track} Replay Track\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Toggle Volume Mute`, true)
                        .addField(`\u200b`, `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Toggle Autoplay\n${emoji.msg.shuffle} Shuffle the queue\n${emoji.msg.show_queue} Show the Queue\n${emoji.msg.show_current_track} Shows Current Track`, true)
                      let embed2 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Tortuguita| Music Queue")
                        .setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)
                      let embed3 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Tortuguita | Currently no song is playing!")
                        .setDescription(`Join a voice channel and enter a song name or url to play.\n[Invite Tortuguita](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6396308735) • [Support Server](https://discord.com/invite/g3ZYKk5C7A)`)
                        .setImage("https://media.discordapp.net/attachments/783778738243502081/857219575687151626/batch_ted.png")
                      
                      channel3.send(new MessageEmbed().setColor(ee.color).setDescription(`Loading ...`)).then(async msg => {
                        
                        await msg.edit(embed1)
                        
                        client.setups.set(message.guild.id, msg.id, "message_cmd_info");
                        
                        channel3.send(new MessageEmbed().setColor(ee.color).setDescription(`Loading ...`)).then(async msg => {
                          
                          await msg.edit(embed2)
                          
                          client.setups.set(message.guild.id, msg.id, "message_queue_info");
                          
                          channel3.send(new MessageEmbed().setColor(ee.color).setDescription(`Loading ...`)).then(async msg => {
                      
                            await msg.edit(embed3)
                            
                            await msg.react(emoji.react.rewind) 
                            await msg.react(emoji.react.forward)
                            await msg.react(emoji.react.pause_resume) 
                            await msg.react(emoji.react.stop) 
                            await msg.react(emoji.react.previous_track)
                            await msg.react(emoji.react.skip_track) 
                            await msg.react(emoji.react.replay_track) 
                            await msg.react(emoji.react.reduce_volume) 
                            await msg.react(emoji.react.raise_volume) 
                            await msg.react(emoji.react.toggle_mute) 
                            await msg.react(emoji.react.repeat_mode) 
                            await msg.react(emoji.react.autoplay_mode) 
                            await msg.react(emoji.react.shuffle) 
                            await msg.react(emoji.react.show_queue) 
                            await msg.react(emoji.react.show_current_track)
                            
                            client.setups.set(message.guild.id, msg.id, "message_track_info");
                            client.setups.set(message.guild.id, channel3.id, "textchannel");
                            client.setups.set(message.guild.id, channel2.id, "voicechannel");
                            client.setups.set(message.guild.id, channel1.id, "category");
                            client.stats.inc("global", "setups");
                          });
                        })
                      })
                    })
                    
                } catch (e) {
                  
                  console.log(String(e.stack).red)
                  
                  return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                    .setDescription(String("```" + e.stack + "```").substr(0, 2048))
                  );
                }
              })
          } catch (e) {
            
            console.log(String(e.stack).red)

            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
              .setDescription(String("```" + e.stack + "```").substr(0, 2048))
            );
          }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
        .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
  },
};