const { Discord, Collection, Client } = require("discord.js");
const client = new Client();
const config = require("./config.json");
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


fs.readdir("./src/commands/outros/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./src/commands/outros/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("[Comando]: "+commandName)
  });
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


//NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.H9PcHgR0A-fKMBP3bANolnziRM4 | Resolute
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c | Canary
client.login("ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c");