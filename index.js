const { Client, Collection } = require("discord.js");
const fs = require("fs");
const crystol = require("crystolnetwork-log");
const cor = require("colors");
const db = require("quick.db");
const ms = require('ms');
const Discord = require("discord.js")

const client = new Client({
  disableEveryone: true
});

/** || **/
require("./util/inlineReply")
require("./util/quote")
require('discord-buttons')(client);

/** || **/
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.queue = new Map();

/** || **/

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("guildMemberAdd", async (member) => {
  let autorole_resolute = db.get(`autorole_${member.guild.id}`);
  if (!autorole_resolute === null) return;
  member.roles.add(autorole_resolute)
});


["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  try {
    require(`./handlers/lavalink/${handler}`)(client);
  } catch (e) {
  }
});

client.login(require("./botconfig/config.json").token);

const Enmap = require("enmap")
client.settings = new Enmap({
  name: "settings",
  dataDir: "./database/settings"
})


process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});