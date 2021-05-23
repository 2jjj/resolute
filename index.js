const { Discord, Collection, Client } = require("discord.js");
const client = new Client();
require("./inlineReply")
require("./quote")
const fs = require("fs")
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'
const db = require("quick.db")
client.queue = new Map();
client.commands = new Collection();

//Conexão ao MongoDB
/* 
mongoose
    .connect(mongodb, { 
        useNewUrlParser: true,
        useCreateIndex: true
      })
    .then(() => console.log('MongoDB Conectado.'))
    .catch(err => console.log(err));

*/


client.on('message', message => {

  var prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) { prefix = "s." }

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
    const commandFile = require(`./src/commands/outros/${command}.js`)
    commandFile.run(client, message, args);
 } catch (err) {
}
try {
  const commandFile = require(`./src/commands/mod/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
try {
  const commandFile = require(`./src/commands/economia/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
try {
  const commandFile = require(`./src/commands/diversao/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
try {
  const commandFile = require(`./src/commands/configuraveis/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
try {
  const commandFile = require(`./src/commands/manipulacao/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
try {
  const commandFile = require(`./src/commands/music/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
}
});

fs.readdir(__dirname + "/src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/src/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("[EVENTO] - "+eventName)
  });
});


var numWorkers = require('os').cpus().length;
console.log(`SHARDS(numWorkers) -> ${numWorkers}`)

//NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.H9PcHgR0A-fKMBP3bANolnziRM4 | Resolute
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c | Canary
client.login("ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c");