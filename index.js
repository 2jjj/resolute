const Discord = require('discord.js');
const client = new Discord.Client(); 
const config = require("./config.json");
require("./inlineReply")
require("./quote")
const fs = require("fs")
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'
const db = require("quick.db")
client.queue = new Map();


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
//Se mencionar o bot
client.on("message",e=>{if(e.content.startsWith("<")&&e.content.endsWith(">")&&e.mentions.has(client.user.id))return e.inlineReply(`<:dy_girlHello:841125764690739203> Olá! ${e.author}\n > Meu prefixo é \`s.\`, use \`s.ajuda\` para ajuda!\n > Me adicione -> **https://resolutebot.xyz**`).then(e=>e.delete({timeout:15e3})).catch(e=>{})});


//Command Handler
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
 console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/mod/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/economia/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/diversao/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/configuraveis/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/manipulacao/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
try {
  const commandFile = require(`./src/commands/music/${command}.js`)
  commandFile.run(client, message, args);
} catch (err) {
console.error('Erro:' + err);
}
});
   
//Carregando eventos
fs.readdir(__dirname + "/src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/src/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("[EVENTO] - "+eventName)
  });
});


//NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.H9PcHgR0A-fKMBP3bANolnziRM4 | Bot normal
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c | Canary
client.login("NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.H9PcHgR0A-fKMBP3bANolnziRM4");