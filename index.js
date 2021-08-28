const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log("MongoDB conectado com sucesso!"));

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./src/handler/index")(client).then(console.log('Carreguei os eventos e comandos'))

client.login(client.config.token);
