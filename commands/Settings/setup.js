const { MessageEmbed } = require(`discord.js`);
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require("../../config/emojis.json");

module.exports = {
  name: "setup",
  category: "config",
  aliases: ["musicsetup"],
  cooldown: 10,
  usage: "setup",
  description: "Cria uma configuração de música única para solicitar músicas!",
  example: "@DJ",
  permissoes: {
    membro: ['ADMINISTRATOR', 'Administrador'],
    bot: []
  },
  cooldown: 5,
  args: false,

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
      if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

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
      
      message.guild.channels.create("Resolute - Requests", {
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
                      topic: `Para solicitar uma música, basta digitar o nome da música no canal ou a **URL** e o bot vai tocar! Certifique-se de que você está no canal de voz **🎧｜Music**!`,
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
                        .setTitle("Resolute | Requests")
                        .setDescription(`Digite o nome ou URL da música para tocar uma música\n\nVocê também pode digitar \`${prefix}command <parametros>\``)
                        .addField(`Comandos`, musiccmds.join(", "))
                        .addField(`Reações`, `${emoji.msg.rewind} Voltar 20 segundos\n${emoji.msg.forward} Avançar 20 segundos\n${emoji.msg.pause_resume} Pausar/Despausar\n${emoji.msg.stop} Parar a música\n${emoji.msg.previous_track} Tocar a música anterior.\n`, true)
                        .addField(`\u200b`, `${emoji.msg.skip_track} Pular / Próxima\n${emoji.msg.replay_track} Replay música.\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Alternar volume para mudo.`, true)
                        .addField(`\u200b`, `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Ativar o autoplay.\n${emoji.msg.shuffle} Embaralhe a fila.\n${emoji.msg.show_queue} Mostrar a fila.\n${emoji.msg.show_current_track} Mostrar a música atual.`, true)
                      let embed2 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Resolute | Fila")
                        .setDescription(`**Vazia\nEntre em um canal de voz e a fila ira aparecer aqui!**`)
                      let embed3 = new MessageEmbed()
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle("Resolute | Atualmente, nenhuma não há nenhuma música tocando!")
                        .setDescription(`Entre em um canal de voz e coloque um nome ou uma url para tocar!\n[Invite Resolute](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6396308735)`)
                        .setImage("https://cdn.discordapp.com/avatars/868871721409736774/672afa4f2a4ac5fee624580229a2efbd.png?size=1024")
                      
                      channel3.send(new MessageEmbed().setColor(ee.color).setDescription(`Carregando ...`)).then(async msg => {
                        
                        await msg.edit(embed1)
                        
                        client.setups.set(message.guild.id, msg.id, "message_cmd_info");
                        
                        channel3.send(new MessageEmbed().setColor(ee.color).setDescription(`Carregando ...`)).then(async msg => {
                          
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
              .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
              .setDescription(String("```" + e.stack + "```").substr(0, 2048))
            );
          }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
        .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
      );
    }
  },
};