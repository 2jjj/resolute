const { Discord, Collection, Client, ShardingManager } = require("discord.js");
const client = new Client();
require("./inlineReply")
require("./quote")
const { fs, readdirSync} = require("fs")
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'
const db = require("quick.db")
const cor = require("colors");
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

for (const subFolder of readdirSync(`${__dirname}/src/commands/`)) {
  for (const fileName of readdirSync(`${__dirname}/src/commands/${subFolder}/`)) {
      let file = require(`${__dirname}/src/commands/${subFolder}/${fileName}`);
      
      client.commands.set(file.name, file);
  }
}

fs.readdir(__dirname + "/src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/src/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log(cor.red("[INFO] - [EVENTO] - "+eventName))
  });
});

//NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.H9PcHgR0A-fKMBP3bANolnziRM4 | Resolute
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c | Canary

client.login("ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c")