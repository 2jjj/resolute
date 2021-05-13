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

//InlineMessage
class Message extends(Structures.get("Message")){async inlineReply(e,s){const a=void 0===((s||e||{}).allowedMentions||{}).repliedUser||(s||e).allowedMentions.repliedUser;delete((s||e||{}).allowedMentions||{}).repliedUser;const t=e instanceof APIMessage?e.resolveData():APIMessage.create(this.channel,e,s).resolveData();if(Object.assign(t.data,{message_reference:{message_id:this.id}}),t.data.allowed_mentions&&0!==Object.keys(t.data.allowed_mentions).length||(t.data.allowed_mentions={parse:["users","roles","everyone"]}),void 0===t.data.allowed_mentions.replied_user&&Object.assign(t.data.allowed_mentions,{replied_user:a}),Array.isArray(t.data.content))return Promise.all(t.split().map(e=>(e.data.allowed_mentions=t.data.allowed_mentions,e)).map(this.inlineReply.bind(this)));const{data:n,files:l}=await t.resolveFiles();return this.client.api.channels[this.channel.id].messages.post({data:n,files:l}).then(e=>this.client.actions.MessageCreate.handle(e).message)}}Structures.extend("Message",()=>Message);


client.config = config;

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(config.token);