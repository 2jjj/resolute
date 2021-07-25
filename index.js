const cor = require("colors");
const crystol = require("crystolnetwork-log");
const Enmap = require("enmap")
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

require("./src/util/inlineReply")
require("./src/util/quote")
require('discord-buttons')(client);
client.categories = fs.readdirSync("./src/commands/");
client.queue = new Map();
client.commands = new Collection();
client.aliases = new Collection();
const { SlashCommandHandler } = require("djs-slash-commands");
client.SlashCommands = new SlashCommandHandler(client);

client.on("slashCreate", async (interaction) => {
  if (interaction.commandName === "somecommand")
    return interaction.reply("Some reply...");
  if (interaction.commandName === "someothercommand")
    return interaction.reply("This is an ephemeral.", { ephemeral: true });

  if (interaction.commandName === "ping") {
    interaction.reply("Ping?!");
    interaction.followUp("Pong!");
  }

  // Editing & deleting reply.
  if (interaction.commandName === "thatonecommand") {
    await interaction.reply("REPLIED?!");
    await interaction.editReply("EDITED?!");
    // DELETED?!
    interaction.deleteReply();
  }

  // Deferring an interaction. Makes it say "{Name} is thinking..." and gives you 15 minutes to reply.
  if (interaction.commandName === "defer") {
    interaction.defer();
    setTimeout(
      async () => await interaction.reply("I have stopped thinking."),
      9000
    );
  }
});

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