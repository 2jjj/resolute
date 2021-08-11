const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const DBL = require("dblapi.js");
const { token, topgg_token } = require("./config/config.json")
const mongoose = require("mongoose");

const client = new Discord.Client({
  messageCacheLifetime: 604800,
  messageSweepInterval: 604800,
  fetchAllMembers: false,
  messageCacheMaxSize: 200,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: 32767,
});
module.exports = client;

["clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log("MongoDB conectado com sucesso!"));


client.premium = new Enmap({ name: "premium", dataDir: "./databases/premium" });
client.stats = new Enmap({ name: "stats", dataDir: "./databases/stats" });
client.settings = new Enmap({ name: "setups", dataDir: "./databases/settings" });
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" });
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./databases/queuesaves", ensureProps: false });
client.modActions = new Enmap({ name: 'actions', dataDir: "./databases/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./databases/warns" });

const dbl = new DBL(topgg_token, client);

dbl.on('posted', () => {
  console.log('Top.gg servers updated!');
})

dbl.on('error', e => {
  console.log(`Error to update top.gg servers!\n ${e}`);
})

client.login(token);