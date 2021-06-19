const { Client, Collection } = require("discord.js");
const fs = require("fs");
const crystol = require("crystolnetwork-log");
const cor = require("colors");
const db = require("quick.db");
const config = require("./config.json");

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


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on("message", async message => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
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
  

client.login(config.token);