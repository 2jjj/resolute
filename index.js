const cor = require("colors");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const mongoose = require("mongoose");
const ascii = require("ascii-table");
let table = new ascii("MongoDB");
table.setHeading("Mongo", "Load status");
const client = new Client({
  disableEveryone: true
});

require("./util/inlineReply")
require("./util/quote")
require('discord-buttons')(client);
client.categories = fs.readdirSync("./commands/");
client.queue = new Map();
client.commands = new Collection();
client.aliases = new Collection();

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(table.addRow("Database", '✅'))
console.log(table.toString().cyan);

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("guildMemberAdd", async (member) => {
  let autorole_resolute = db.get(`autorole_${member.guild.id}`);
  if (!autorole_resolute === null) return;
  member.roles.add(autorole_resolute)
});

["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  require(`./handlers/lavalink/${handler}`)(client);
});

client.on('shardReady', (shardid) => {
  client.user.setActivity(`Online | Shard: ${shardid}`, { shardID: shardid });
})

const Enmap = require("enmap")
client.settings = new Enmap({
  name: "settings",
  dataDir: "./database/settings"
})

client.login(require("./src/config/config.json").token);

//v2
//ODU0ODE3NTk3NzA2MzM4MzA0.YMpc7Q.ju8crL6WopqcsbkDEjmAdco22xY
//canary
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.mb2_OlpUqIvf05xIAjt2l4gdixg