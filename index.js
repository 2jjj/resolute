const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");
const { APIMessage, Structures } = require("discord.js");
const fs = require("fs")
const mongoose = require('mongoose');
const db = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'

mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true
      })
    .then(() => console.log('MongoDB Conectado.'))
    .catch(err => console.log(err));

client.on("message",e=>{if(e.content.startsWith("<")&&e.content.endsWith(">")&&e.mentions.has(client.user.id))return e.inlineReply(`<:dy_girlHello:841125764690739203> Olá! ${e.author}\n > Meu prefixo é **s.**, use **s.ajuda** para ajuda!\n > Me adicione -> **http://resolutebot.xyz**`).then(e=>e.delete({timeout:15e3})).catch(e=>{})});

//Comandos
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/fun/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/admin/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/outros/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/economia/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});

//InlineMessage
class Message extends(Structures.get("Message")){async inlineReply(e,s){const a=void 0===((s||e||{}).allowedMentions||{}).repliedUser||(s||e).allowedMentions.repliedUser;delete((s||e||{}).allowedMentions||{}).repliedUser;const t=e instanceof APIMessage?e.resolveData():APIMessage.create(this.channel,e,s).resolveData();if(Object.assign(t.data,{message_reference:{message_id:this.id}}),t.data.allowed_mentions&&0!==Object.keys(t.data.allowed_mentions).length||(t.data.allowed_mentions={parse:["users","roles","everyone"]}),void 0===t.data.allowed_mentions.replied_user&&Object.assign(t.data.allowed_mentions,{replied_user:a}),Array.isArray(t.data.content))return Promise.all(t.split().map(e=>(e.data.allowed_mentions=t.data.allowed_mentions,e)).map(this.inlineReply.bind(this)));const{data:n,files:l}=await t.resolveFiles();return this.client.api.channels[this.channel.id].messages.post({data:n,files:l}).then(e=>this.client.actions.MessageCreate.handle(e).message)}}Structures.extend("Message",()=>Message);

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventBind = file.split('.')[0];
  console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Loading event: ${file}; Bind: ${eventBind}`);
  client.on(eventBind, event.bind(null, client));
}

client.login(config.token);