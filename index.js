const cor = require("colors");
const crystol = require("crystolnetwork-log");
const Enmap = require("enmap")
const { Collection } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const mongoose = require("mongoose");
const Discord = require('discord.js');
const config = require("./config/config.json");

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

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log("mongodb on"));
client.config = config;

["command", "events"].forEach(handler => {
  require(`./src/handlers/${handler}`)(client);
});
["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  require(`./src/handlers/lavalink/${handler}`)(client);
});

try {
  //autorole
  client.on("guildMemberAdd", async (member) => {
    var autorole_resolute = db.get(`autorole_${member.guild.id}`);
    if (!autorole_resolute === null) {
      return;
    } else {
      member.roles.add(autorole_resolute)
    }

    //ENMAP
    client.settings = new Enmap({
      name: "settings",
      dataDir: "./src/database/settings"
    })
  });
} catch (e) {
  crystol.log(e, "erros.log", "America/Sao_Paulo")
}

client.login(require("./config/config.json").token);

//normal
//ODY4ODcxNzIxNDA5NzM2Nzc0.YP192Q.pj6BxzDg5C-47vMGLICSVdtPQfo
//canary
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.cV3lxlyktIMb1HjMN2rv48O33BI