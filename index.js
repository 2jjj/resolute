const Discord = require('discord.js');
const client = new Discord.Client(); 
const config = require("./config.json");
const { APIMessage, Structures } = require("discord.js");
const fs = require("fs")
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/test'
const db = require("quick.db")

mongoose
    .connect(mongodb, { 
        useNewUrlParser: true,
        useCreateIndex: true
      })
    .then(() => console.log('MongoDB Conectado.'))
    .catch(err => console.log(err));

client.on("message",e=>{if(e.content.startsWith("<")&&e.content.endsWith(">")&&e.mentions.has(client.user.id))return e.inlineReply(`<:dy_girlHello:841125764690739203> Olá! ${e.author}\n > Meu prefixo é **s.**, use **s.ajuda** para ajuda!\n > Me adicione -> **http://resolutebot.xyz**`).then(e=>e.delete({timeout:15e3})).catch(e=>{})});

//Comandos
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/diversao/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/mod/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/outros/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/economia/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./src/commands/configuraveis/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});

class Message extends Structures.get("Message") {
  async inlineReply(content, options) {
      const mentionRepliedUser = typeof ((options || content || {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
      delete ((options || content || {}).allowedMentions || {}).repliedUser;

      const apiMessage = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this.channel, content, options).resolveData();
      Object.assign(apiMessage.data, { message_reference: { message_id: this.id } });
  
      if (!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0)
          apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
      if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
          Object.assign(apiMessage.data.allowed_mentions, { replied_user: mentionRepliedUser });

      if (Array.isArray(apiMessage.data.content)) {
          return Promise.all(apiMessage.split().map(x => {
              x.data.allowed_mentions = apiMessage.data.allowed_mentions;
              return x;
          }).map(this.inlineReply.bind(this)));
      }

      const { data, files } = await apiMessage.resolveFiles();
      return this.client.api.channels[this.channel.id].messages
          .post({ data, files })
          .then(d => this.client.actions.MessageCreate.handle(d).message);
  }
}

Structures.extend("Message", () => Message)

fs.readdir(__dirname + "/src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/src/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("[EVENTO] - "+eventName)
  });
});

client.login(config.token);