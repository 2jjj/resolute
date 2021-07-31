﻿const cor = require("colors");
const { Collection } = require("discord.js");
const fs = require("fs");
const Discord = require('discord.js');
const config = require("./config/config.json");
const Enmap = require("enmap");

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

client.premium = new Enmap({ name: "premium", dataDir: "./src/database/premium" })
client.stats = new Enmap({ name: "stats", dataDir: "./src/database/stats" })
client.settings = new Enmap({ name: "setups", dataDir: "./src/database/settings" })
client.setups = new Enmap({ name: "setups", dataDir: "./src/database/setups" })
client.queuesaves = new Enmap({ name: "queuesaves", dataDir: "./src/database/queuesaves", ensureProps: false})
client.modActions = new Enmap({ name: 'actions', dataDir: "./src/database/warns" });
client.userProfiles = new Enmap({ name: 'userProfiles', dataDir: "./src/database/warns" })

client.login(require("./config/config.json").token);

//normal
//ODY4ODcxNzIxNDA5NzM2Nzc0.YP192Q.pj6BxzDg5C-47vMGLICSVdtPQfo
//canary
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.cV3lxlyktIMb1HjMN2rv48O33BI