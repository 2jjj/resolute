const db = require("quick.db")
const Discord = require("discord.js");
const crystol = require("crystolnetwork-log");
const Timeout = new Discord.Collection();

module.exports = async (client, message) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  if (message.content.startsWith('<')) {
    if (message.content.endsWith('>'))
      if (message.mentions.has(client.user.id)) {
        return message.inlineReply('Olá meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
      }
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  var command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    crystol.log(`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`, "comandos.log", "America/Sao_Paulo").then(console.log((`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`)))
    if (command.cooldown) {
      if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`<:1icon_x:846184439403118624> **|** Espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);
      command.run(client, message, args)
      Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`)
      }, command.cooldown)
    } else command.run(client, message, args);
  }

  let x = command.name;


  if (x == "loopfila" || x == "limparfila" || x == "shuffle" || x == "disconnect" || x == "avancar" || x == "play" || x == "unlock" || x == "lock" || x == "nuke" || x == "queue" || x == "skip" || x == "triggered" || x == "trash" || x == "stonks" || x == "rip" || x == "rickroll" || x == "preso" || x == "pikachu" || x == "palhaco" || x == "notstonks" || x == "mm" || x == "gay" || x == "drip" || x == "facepalm" || x == "delete" || x == "dababy" || x == "confusedstonks" || x == "blur" || x == "beautiful" || x == "ata" || x == "arte" || x == "ad" || x == "serverlist" || x == "sus" || x == "snake" || x == "jokenpo" || x == "jogodavelha" || x == "invite" || x == "calculadora" || x == "lideres" || x == "banlist" || x == "ping" || x == "help" || x == "userinfo" || x == "ticket" || x == "serverinfo" || x == "servericon" || x == "random" || x == "horas" || x == "avatar" || x == "badges" || x == "close" || x == "help" || x == "botinfo" || x == "shards" || x == "status" || x == "uptime" || x == "daily" || x == "mendigar" || x == "money" || x == "perfil" || x == "trabalhar" || x == "warnlist") {
    return;
  }

  if (!args[0]) {
    const help = new Discord.MessageEmbed()
      .setTitle(`Comando de \`${command.name}\``)
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
      .setDescription(`${command.description}`)
      .addField(`Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
      .addField(`Forma de ultilização:`, ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
      .addField(`Exemplo:`, ` \`${command.example !== undefined ? `${prefix}${command.example}` : `Sem exemplos para este comando.` }\``)
      .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp();
    return message.channel.send(help);
  }
}