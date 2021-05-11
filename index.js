const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");
const { APIMessage, Structures } = require("discord.js");
const db = require("quick.db");
const fs = require("fs")
const colors = require("colors");

client.on("ready",()=>{let e=["",`Em ${client.guilds.cache.size} servidores, com ${client.users.cache.size} pessoas!`,"resolutebot.xyz","Versão 1.2.5(Beta)","Meu criador -> Spray#0007"];setInterval(()=>{const s=Math.floor(Math.random()*(e.length-1)+1);client.user.setActivity(e[s])},5e3),console.log(`[INFO] => Ligado Com Sucesso em ${client.guilds.cache.size} servidores, ${client.users.cache.size} Usuarios!`)});
client.on("message",e=>{if(e.content.startsWith("<")&&e.content.endsWith(">")&&e.mentions.has(client.user.id))return e.inlineReply(`<:dy_girlHello:841125764690739203> Olá! ${e.author}\n > Meu prefixo é **s.**, use **s.ajuda** para ajuda!\n > Me adicione -> **http://resolutebot.xyz**`).then(e=>e.delete({timeout:15e3})).catch(e=>{})});

//comandos
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/fun/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/admin/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/outros/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/economia/${r}.js`).run(client,t,e)}catch(t){console.error("[+]Erro:"+t)}});

//InlineMessage
class Message extends(Structures.get("Message")){async inlineReply(e,s){const a=void 0===((s||e||{}).allowedMentions||{}).repliedUser||(s||e).allowedMentions.repliedUser;delete((s||e||{}).allowedMentions||{}).repliedUser;const t=e instanceof APIMessage?e.resolveData():APIMessage.create(this.channel,e,s).resolveData();if(Object.assign(t.data,{message_reference:{message_id:this.id}}),t.data.allowed_mentions&&0!==Object.keys(t.data.allowed_mentions).length||(t.data.allowed_mentions={parse:["users","roles","everyone"]}),void 0===t.data.allowed_mentions.replied_user&&Object.assign(t.data.allowed_mentions,{replied_user:a}),Array.isArray(t.data.content))return Promise.all(t.split().map(e=>(e.data.allowed_mentions=t.data.allowed_mentions,e)).map(this.inlineReply.bind(this)));const{data:n,files:l}=await t.resolveFiles();return this.client.api.channels[this.channel.id].messages.post({data:n,files:l}).then(e=>this.client.actions.MessageCreate.handle(e).message)}}Structures.extend("Message",()=>Message);

//Eventos
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("------------------------------")
    console.log("Carregando Evento: "+eventName)
    console.log("------------------------------")
  });
});
client.login(config.token);