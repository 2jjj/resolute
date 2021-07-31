const cor = require("colors");
const { Collection } = require("discord.js");
const fs = require("fs");
const Discord = require('discord.js');
const config = require("./config/config.json");
const Enmap = require("enmap");
const DBL = require("dblapi.js");

const client = new Discord.Client({
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_MESSAGES"
    ]
  }
});

require("./src/util/inlineReply");
require("./src/util/quote");
require('discord-buttons')(client);
client.categories = fs.readdirSync("./src/commands/");
client.queue = new Map();
client.commands = new Collection();
client.aliases = new Collection();

client.config = config;

["mongoose", "clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
  require(`./src/handlers/${handler}`)(client);
});

client.premium = new Enmap({ name: "premium", dataDir: "./src/database/enmap/premium" })
client.stats = new Enmap({ name: "stats", dataDir: "./src/database/enmap/stats" })
client.settings = new Enmap({ name: "setups", dataDir: "./src/database/enmap/settings" })
client.setups = new Enmap({ name: "setups", dataDir: "./src/database/enmap/setups" })
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./src/database/enmap/queuesaves", ensureProps: false})
client.modActions = new Enmap({ name: 'actions', dataDir: "./src/database/enmap/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./src/database/enmap/warns" })

const dbl = new DBL(config.topgg_token, client);

dbl.on('posted', () => {
  console.log('Top.gg servers updated!');
})

dbl.on('error', e => {
  console.log(`Error to update top.gg servers!\n ${e}`);
})

client.login(require("./config/config.json").token);