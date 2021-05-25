const Discord = require('discord.js');
require("./inlineReply")
require("./quote")
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'
const db = require("quick.db")
const cor = require("colors");
const client = new Discord.Client();
client.queue = new Map();
client.commands = new Discord.Collection();
const { readdirSync, read } = require('fs');
const Timeout = new Discord.Collection();
const ms = require('ms');

// Commands

const commandFolders = readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
}}

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
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`[cooldown] Espere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` antes de usar esse comando novamente!`);
                command.run(client, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(client, message, args);
        }
    }
})

// Events
/*
for (const fileName of readdirSync(`${__dirname}/events/`)) {
    let file = require(`${__dirname}/events/${fileName}`);
    let eventEmiter = file.emiter;

    client[eventEmiter](file.name, file.run.bind(null, client));
}
*/

client.login("ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c")