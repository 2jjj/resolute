const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require(`../../config/emojis.json`);
const { logs } = require(`../../config/webhooks.json`);
const Discord = require("discord.js");
const moment = require('moment');
const sourcebin = require('sourcebin_js');
const { createBar, format, databasing, escapeRegex, isrequestchannel, getRandomInt, delay } = require("../../handlers/functions");
const requestcmd = require("../../handlers/requestcmds");
const { MessageEmbed } = require(`discord.js`);
const GuildSettings = require("../../databases/mongoDB/settings");
const blacklist = require("../../databases/mongoDB/blacklist");

module.exports = async (client, message) => {
  try {
    var storedSettings = await GuildSettings.findOne({
      gid: message.guild.id
    });
    
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        gid: message.guild.id
      });
      await newSettings.save().catch(() => {});
      storedSettings = await GuildSettings.findOne({
        gid: message.guild.id
      });
    }
  
    if(!storedSettings.prefix) {
      storedSettings.prefix = "s."
    }

    var prefix = storedSettings.prefix;

    if (message.content.startsWith('<')) {
      if (message.content.endsWith('>'))
        if (message.mentions.has(client.user.id)) {
          return message.inlineReply('Olá! meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
        }
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    databasing(client, message.guild.id, message.author.id)
    if (isrequestchannel(client, message)) return requestcmd(client, message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    var command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));  

    let not_allowed = false;

    if (client.settings.get(message.guild.id, `botchannel`).toString() !== "") {

      if (!client.settings.get(message.guild.id, `botchannel`).includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {

        let leftb = "";
        for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
          leftb += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> / "
        }

        not_allowed = true;
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ Error | Not in the Bot Chat!`)
          .setDescription(`There is a Bot chat setup in this GUILD! try using the Bot Commands here:\n> ${leftb.substr(0, leftb.length - 3)}`)
        ).then(msg => {
          try {
            msg.delete({ timeout: 5000 }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
          } catch { /* */ }
        });
      }
    }

    if (command) {

      try {
        client.stats.inc(message.guild.id, "commands");
        client.stats.inc("global", "commands");

        if (client.settings.get(message.guild.id, `djonlycmds`) && client.settings.get(message.guild.id, `djonlycmds`).join(" ").toLowerCase().split(" ").includes(command.name.toLowerCase())) {

          if (client.settings.get(message.guild.id, `djroles`).toString() !== "") {
            const player = client.manager.players.get(message.guild.id);

            let isdj = false;
            let leftb = "";
            if (client.settings.get(message.guild.id, `djroles`).join("") === "")
              leftb = "no Dj Roles, aka all Users are Djs"
            else
              for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                if (message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                if (!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
              }

            if (!isdj && !message.member.hasPermission("ADMINISTRATOR")) {
              if (player && player.queue.current.requester.id !== message.author.id) {
                not_allowed = true;
                return message.channel.send(new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle("❌ Error | You are not allowed to run this command!")
                  .setDescription(`You need to have one of those Roles:\n${leftb.substr(0, leftb.length - 3)}\n\nOr be the Requester (${player.queue.current.requester}) of the current Track!`)
                ).then(msg => {
                  try {
                    msg.delete({ timeout: 5000 }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                  } catch { /* */ }
                });
              }
            }
          }
        }

        if (message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel")) &&
          (command.category.toLowerCase().includes("music") || command.category.toLowerCase().includes("filter")) &&
          client.setups.get(message.guild.id, "textchannel") !== message.channel.id &&
          client.settings.get(message.guild.id, `requestonly`)) {
          not_allowed = true;
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this Command here!")
            .setDescription(`Please run it in: ${message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel"))} | To enable that you can use the Command anywhere type: \`${prefix}togglerequestonly\``)
          )

        }


        if (command.category.toLowerCase().includes("admin") || command.category.toLowerCase().includes("settings") || command.category.toLowerCase().includes("owner")) {
          let required_perms = ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "ADD_REACTIONS", "VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES"
            , "EMBED_LINKS", "ATTACH_FILES", "CONNECT", "SPEAK", "MANAGE_ROLES"]
          if (!message.guild.me.hasPermission(required_perms)) {
            not_allowed = true;
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | I don't have enough Permissions!")
              .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") + "`")
            )
          }
        }

        const player = client.manager.players.get(message.guild.id);

        if (command.parameters) {
          if (command.parameters.type == "music") {

            const { channel } = message.member.voice;
            const mechannel = message.guild.me.voice.channel;

            if (!channel) {
              not_allowed = true;
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
              );
            }

            if (!player && mechannel) {
              message.guild.me.voice.kick().catch(e => console.log("This prevents a Bug"));
            }

            if (command.parameters.activeplayer) {
              if (!player) {
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
                );
              }
              if (!mechannel) {
                if (player) try { player.destroy() } catch { }
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} Error | I am not connected to a Channel`)
                );
              }
            }

            if (command.parameters.previoussong) {
              if (!player.queue.previous || player.queue.previous === null) {
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} Error | There is no previous song yet!`)
                );
              }
            }

            if (player && channel.id !== player.voiceChannel && !command.parameters.notsamechannel)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
                .setDescription(`Channelname: \`🔈 ${message.guild.channels.cache.get(player.voiceChannel).name}\``)
              );

            if (mechannel && channel.id !== mechannel.id && !command.parameters.notsamechannel)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
                .setDescription(`Channelname: \`🔈 ${mechannel.name}\``)
              );
          }
        }

        if (not_allowed) return;
        command.run(client, message, args, message.member, args.join(" "), prefix, player);

        let channel = client.channels.cache.get(logs.comandos)
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        var argumentos

        if (args.slice(0).join(" ").length > 1000) {
          try {
            const link = await sourcebin.create([
              {
                name: 'Resolute logs',
                content: args.slice(0).join(" "),
                languageId: 'text'
              }
            ]);
            argumentos = link.url;
          } catch (e) {
            argumentos = `ERROR: ${e}`;
          }
        } else {
          argumentos = args.slice(0).join(" ");
        }

        const embed_logs = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`<:setaaa:860626769089265665> Nova comando executado`)
          .addField('**Servidor**', message.guild.name)
          .addField('**Servidor ID**', message.guild.id)
          .addField('**Executada por**', message.author.tag + ' ( ' + message.author.id + ' )')
          .addField('**Comando**', command.name)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png" }))
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp();
        if (argumentos) embed_logs.addField('**Argumentos**', argumentos)

        await webhook.send(embed_logs);

      } catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Um erro ocorreu ao executar o comando `" + command.name + "`")
          //.setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
        ).then(msg => {
          try {
            msg.delete({ timeout: 5000 }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey))
          } catch { /* */ }
        });
      }
    }
  } catch (e) {
    console.log(e)
    return message.channel.send(new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`\`\`\`Ocorreu um erro!\`\`\``)
    );
  }

  
  if(command.permissoes.length === 0) {
    if (command.args == true) {
      if (!argumentos[0]) {
        const help = new Discord.MessageEmbed()
          .setTitle(`Menu de ajuda - \`${command.name}\``)
          .setColor("RANDOM")
          .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
          .setDescription(`${command.description}`)
          .addField(`:bulb: Modos de Uso:`, ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
          .addField(`:thinking: Exemplo:`, ` \`${command.example !== undefined ? `${prefix}${command.name} ${command.example}` : `Sem exemplos para este comando.` }\``)
          .addField(`🔹 Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
          .addField(`🔹 Permissões que você precisa:`, `\`Não é necessário nenhuma permissão!\``)
          .addField(`🔹 Permissões que eu preciso:`, `\`Não é necessário nenhuma permissão!\``)
          .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp();
        return message.channel.send(help);
      }  
    }

  } else {
    if (command.args == true) {
      if (!argumentos[0]) {
        const help = new Discord.MessageEmbed()
          .setTitle(`Menu de ajuda - \`${command.name}\``)
          .setColor("RANDOM")
          .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
          .setDescription(`${command.description}`)
          .addField(`:bulb: Modos de Uso:`, ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
          .addField(`:thinking: Exemplo:`, ` \`${command.example !== undefined ? `${prefix}${command.name} ${command.example}` : `Sem exemplos para este comando.` }\``)
          .addField(`🔹 Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
          .addField(`🔹 Permissões que você precisa:`, ` \`${command.permissoes.membro[0, 1] !== undefined ? `${command.permissoes.membro[1]}` : `Não é necessário nenhuma permissão!` }\``)
          .addField(`🔹 Permissões que eu preciso:`, ` \`${command.permissoes.bot[0, 1] !== undefined ? `${command.permissoes.bot[1]}` : `Não é necessário nenhuma permissão!` }\``)
          .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp();
        return message.channel.send(help);
      }
    } else if (command.args == false) return;
  }

if (!message.member.hasPermission(command.permissoes.membro[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${command.permissoes.membro[1]}\`!`)
if (!message.guild.me.hasPermission(command.permissoes.bot[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${command.permissoes.bot[1]}\`!`)

}