const { Client, Collection } = require("discord.js");
const fs = require("fs");
const crystol = require("crystolnetwork-log");
const cor = require("colors");
const db = require("quick.db");
const config = require("./config.json");
const ms = require('ms');
const Discord = require("discord.js")

const client = new Client({
    disableEveryone: true
});

/** || **/
require("./util/inlineReply")
require("./util/quote")
require('discord-buttons')(client);

/** || **/
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
const Timeout = new Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on("message", async message => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if (message.content.startsWith('<')) {
        if (message.content.endsWith('>'))
            if (message.mentions.has(client.user.id)) { return message.inlineReply('Olá meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!') }
    } 

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        crystol.log(`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`, "comandos.log", "America/Sao_Paulo").then(console.log((`[LOGS] - Comando ${cmd} usado por ${message.author.tag}(${message.author.id})`)))
        if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`<:1icon_x:846184439403118624> **|** Espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else command.run(client, message, args);
    }

    if (!args[0]) {
        const help = new Discord.MessageEmbed()
        .setTitle(`Comando de \`${command.name}\``)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${command.description}`)
        .addField(`Forma de Utilização:`, ` \`${prefix}${command.name} ${command.usage}\``)
        .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        return message.channel.send(help);    
    }   
});

fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(__dirname + `/events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      //table.addRow(eventName,'✅')
      console.log(cor.red("[LOGS] - [EVENTO] - "+eventName))
  });
});
  

//v2
//ODU0ODE3NTk3NzA2MzM4MzA0.YMpc7Q.RU_XMocb9mhb_POH0VH8RMGkteA
//canary
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.lb1yyFECRPq42M--GFZCE1UQmCs

client.login(config.token);