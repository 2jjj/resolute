const cor = require("colors");
const crystol = require("crystolnetwork-log");
const {
  Client,
  Collection
} = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const mongoose = require("mongoose");
const ascii = require("ascii-table");
let table = new ascii("MongoDB");
table.setHeading("Mongo", "Load status");
const client = new Client({
  disableEveryone: true
});

require("./src/util/inlineReply")
require("./src/util/quote")
require('discord-buttons')(client);
client.categories = fs.readdirSync("./src/commands/");
client.queue = new Map();
client.commands = new Collection();
client.aliases = new Collection();

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(table.addRow("Database", '✅'))
console.log(table.toString().cyan);

["command", "events"].forEach(handler => {
  require(`./src/handlers/${handler}`)(client);
});

["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  require(`./src/handlers/lavalink/${handler}`)(client);
});

client.on('shardReady', async (shardid) => {
  const promises = [client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
  ];
  Promise.all(promises)
    .then(async results => {
      const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
      const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

      const status = [{
          name: `${totalGuilds} guilds & ${totalMembers} users. | Shard: ${shardid}`,
          type: 'PLAYING'
        },
        {
          name: `${totalMembers} users & ${totalGuilds} guilds. | Shard: ${shardid}`,
          type: 'PLAYING'
        },
      ]

      function Presence() {
        const base = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(base)
      }

      Presence();
      setInterval(() => Presence(), 5000)
    })
  /*client.user.setActivity(`Online | Shard: ${shardid}`, {
    shardID: shardid
  });*/
})

try {
  client.on("guildMemberAdd", async (member) => {
    var autorole_resolute = db.get(`autorole_${member.guild.id}`);
    if (!autorole_resolute === null) {
      return;
    } else {
      member.roles.add(autorole_resolute)
    }
  });
} catch (e) {
  crystol.log(e, "erros.log", "America/Sao_Paulo")
}


const Enmap = require("enmap")
try {
  client.settings = new Enmap({
    name: "settings",
    dataDir: "./src/database/settings"
  })
} catch (e) {
  crystol.log(e, "erros.log", "America/Sao_Paulo")
}

client.login(require("./config/config.json").token);

//normal
//ODU0ODE3NTk3NzA2MzM4MzA0.YMpc7Q.ju8crL6WopqcsbkDEjmAdco22xY
//canary
//ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.mb2_OlpUqIvf05xIAjt2l4gdixg