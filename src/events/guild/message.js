const db = require("quick.db");
const Discord = require("discord.js");
const crystol = require("crystolnetwork-log");
const Timeout = new Discord.Collection();
const ms = require("ms");
const blacklist = require("../../../src/database/mongoDB/blacklist");
const GuildSettings = require("../../database/mongoDB/settings");

module.exports = async (client, message) => {

  if (!message.guild) return;
  let xpReward;
  if (client.user.id === "837785205061976096") xpReward = Math.floor(Math.random() * 0) + 0
  if (xpReward == 0) xpReward = 10
  let xp = db.fetch(`xp.${message.author.id}`)
  let level = db.fetch(`level.${message.author.id}`) || "0"
  let level2 = level + 1
  let levels = level2 * 1000

  if (!xp) {
    db.add(`xp.${message.author.id}`, xpReward)
  } else if (xp) {
    db.add(`xp.${message.author.id}`, xpReward)
  }

  if (xp > levels) {
    db.add(`level.${message.author.id}`, 1)
    //message.author.send(`<@${message.author.id}>, subiu pro nivel **${level2}**`)
  }

  if (message.content.startsWith('<')) {
    if (message.content.endsWith('>'))
      if (message.mentions.has(client.user.id)) {
        return message.inlineReply('Olá! meu prefixo atual é `' + storedSettings.prefix + '`, use `' + storedSettings.prefix + 'help` para obter ajuda!')
      }
  }

  var storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  if (!storedSettings) {
    const newSettings = new GuildSettings({
      gid: message.guild.id
    });
    await newSettings.save().catch(()=>{});
    storedSettings = await GuildSettings.findOne({ gid: message.guild.id });
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.indexOf(storedSettings.prefix) !== 0) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  var command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  //if (!message.content.startsWith(prefix)) return;

  blacklist.findOne({
    id: message.author.id
  }, async (err, data) => {
    if (err) throw err;
    if (!data) {
      crystol.log(`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`, "comandos.log", "America/Sao_Paulo").then(console.log((`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`)))
      if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`<:1icon_x:846184439403118624> **|** Espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);
        command.run(client, message, args)
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`)
        }, command.cooldown)
      } else command.run(client, message, args, storedSettings);
    } else {
      message.channel.send('Você está na blacklist\nAcha que isto é um engano? -> Chame o `Spray#7725`')
    }
  })

  if (command.args == true) {
    if (!args[0]) {
      const help = new Discord.MessageEmbed()
        .setTitle(`Menu de ajuda - \`${command.name}\``)
        .setColor("RANDOM")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${command.description}`)
        .addField(`:bulb: Modos de Uso:`, ` \`${command.usage.length !== 0 ? `${storedSettings.prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
        .addField(`:thinking: Exemplo:`, ` \`${command.example !== undefined ? `${storedSettings.prefix}${command.name} ${command.example}` : `Sem exemplos para este comando.` }\``)
        .addField(`🔹 Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
        .addField(`🔹 Permissões necessárias:`, ` \`${command.permissoes[0, 1] !== undefined ? `${command.permissoes[1]}` : `Não é necessário nenhuma permissão!` }\``)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setTimestamp();
      return message.channel.send(help);
    }
  } else if (command.args == false) {
    return;
  } else return;

  if (!message.member.hasPermission(command.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${command.permissoes[1]}\`!`)
  if (!message.guild.me.hasPermission(command.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${command.permissoes[1]}\`!`)
}