const Discord = require('discord.js');
const db = require("quick.db")
const cor = require("colors");
const { readdirSync, read } = require('fs');
const fs = require("fs")
const Timeout = new Discord.Collection();
const ms = require('ms');
const ascii = require('ascii-table')
const config = require("./config.json")
const crystol = require("crystolnetwork-log");
const client = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } });
const mongoose = require("mongoose");
let table = new ascii("Commands");
const translate = require("@k3rn31p4nic/google-translate-api");
//const database = require('./database/reconDB');
client.queue = new Map();
client.commands = new Discord.Collection();
require("./util/inlineReply")
require("./util/quote")
require('discord-buttons')(client);
module.exports = client;

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    console.log("MongoDB conectado com sucesso.")
)

//*************//
table.setHeading('Command', 'Status');
const commandFolders = readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        table.addRow(file,'✅')
}}
console.log(table.toString());

client.on("message", async (message) => {

    var prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    if (message.content.startsWith('<')) {
        if (message.content.endsWith('>'))
            if (message.mentions.has(client.user.id)) { return message.inlineReply('Olá meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!!') }
      } 

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return; //optional#

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command) {
            crystol.log(`[LOGS] - Comando ${commandName} usado por ${message.author.tag}(${message.author.id})`, "comandos.log", "America/Sao_Paulo").then(console.log((`[LOGS] - Comando ${commandName} usado por ${message.author.tag}(${message.author.id})`)))
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`<:SmugAnimeSip:853799948511084616> **|** Ei, espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);
                command.run(client, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(client, message, args);
        }
    }
})
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

/*
client.translate = async(text, message) => {
    const lang = await database.has(`lang-${message.guild.id}`) ? await database.get(`lang-${message.guild.id}`) : `pt-br`;
}
*/
//NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.ACmB_7hwECCMfCrO-2TyX9k_UZY
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.fUm4cDC90dHY-_tQQ4GsXgD2w0o
client.login(config.token)