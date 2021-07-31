const db = require("quick.db");
const Discord = require("discord.js");
const crystol = require("crystolnetwork-log");
const Timeout = new Discord.Collection();
const ms = require("ms");
const blacklist = require("../../../src/database/mongoDB/blacklist");
const GuildSettings = require("../../database/mongoDB/settings");
const webhook = new Discord.WebhookClient(`869699890077376602`, "XbGs1o8sfimwuX6V1lWTf8n8sewzG1xM6hdCUrAyRmptuds7rc7pEEZamI9NA8BN3oQr")

module.exports = async (client, message) => {

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

  var prefix = storedSettings.prefix

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

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  var command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  //if (!message.content.startsWith(prefix)) return;

  //Executando o comando e verificando se o usuário está na blacklist
  try {
    blacklist.findOne({ id: message.author.id }, async (err, data) => {
      if (err) return;
      //Isso de data é se o usuário NÃO estiver na blacklist
      if (!data) {        
        if (command) {
          //Sistema de logs
          crystol.log(`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`, "comandos.log", "America/Sao_Paulo").then(console.log((`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`)))
          webhook.send(`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`)

          //Cooldown
          if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`<:x_:856894534071746600> **|** Espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);

          //Rodando o comando
          command.run(client, message, args, prefix, args.join(" "))

          //Setando o cooldown
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
          setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
          }, command.cooldown)

        } else return;

      //Se o usuário estiver na blacklist
      } else {
        message.channel.send('Você está na blacklist\nAcha que isto é um engano? -> Chame o `Spray#7725`')
      }

    })

    //Sistema de argumentos automático
    if (command.args == true) {
      if (!args[0]) {
        const help = new Discord.MessageEmbed()
          .setTitle(`Menu de ajuda - \`${command.name}\``)
          .setColor("RANDOM")
          .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
          .setDescription(`${command.description}`)
          .addField(`:bulb: Modos de Uso:`, ` \`${command.usage.length !== 0 ? `${prefix}${command.name} ${command.usage}` : `${command.name}` }\``)
          .addField(`:thinking: Exemplo:`, ` \`${command.example !== undefined ? `${prefix}${command.name} ${command.example}` : `Sem exemplos para este comando.` }\``)
          .addField(`🔹 Aliases:`, ` \`${command.aliases.length !== 0 ? `${command.aliases}` : `Sem sinonimos para este comando.` }\``)
          .addField(`🔹 Permissões necessárias:`, ` \`${command.permissoes[0, 1] !== undefined ? `${command.permissoes[1]}` : `Não é necessário nenhuma permissão!` }\``)
          .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp();
        return message.channel.send(help);
      }
    } else if (command.args == false) return;

    //Se o membor não tiver permissão

    if(command.permissoes.membro.length === 0) {
      return;
    } else {
      if (!message.member.hasPermission(command.permissoes.membro[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${command.permissoes.membro[1]}\`!`)
    }
    
    //Se eu não tiver perm
    if (!message.guild.me.hasPermission(command.permissoes.bot[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${command.permissoes.bot[1]}\`!`)
  
  } catch(e) {}
}