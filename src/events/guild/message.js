const db = require("quick.db")
const Discord = require("discord.js");
const crystol = require("crystolnetwork-log");
const Timeout = new Discord.Collection();
const ms = require("ms")
const blacklist = require("../../../src/database/mongoDB/blacklist")

module.exports = async (client, message) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  if (message.content.startsWith('<')) {
    if (message.content.endsWith('>'))
      if (message.mentions.has(client.user.id)) {
        return message.inlineReply('Olá! meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
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
  if (!message.content.startsWith(prefix)) return;

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
      } else command.run(client, message, args);
    } else {
      message.channel.send('Você está na blacklist\nAcha que isto é um engano? -> Chame o `Spray#7725`')
    }
  })


  if(command.args == true) {
    if (!args[0]) {
      const help = new Discord.MessageEmbed()
        .setTitle(`Menu de ajuda - \`${command.name}\``)
        .setColor("RANDOM")
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${command.description}`)
        .addField(`:bulb: Modos de Uso:`, ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
        .addField(`:thinking: Exemplo:`, ` \`${command.example !== undefined ? `${prefix}${command.name} ${command.example}` : `Sem exemplos para este comando.` }\``)
        .addField(`🔹 Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
        .addField(`🔹 Permissões necessárias:`, ` \`${command.permissoes !== undefined ? `${command.permissoes}` : `Não é necessário nenhuma permissão!` }\``)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setTimestamp();
      return message.channel.send(help);
    }
  } else if(command.args == false) {
    return;
  } else return;

  if (!message.member.hasPermission(command.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${command.permissoes[1]}\`!`)
  if (!message.guild.me.hasPermission(command.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${command.permissoes[1]}\`!`)
}