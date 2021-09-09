const { Client, Collection } = require("discord.js");
require("colors")
const { readdirSync } = require("fs");
const { Database } = require("quickmongo");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const FaceBook = require("erela.js-facebook");
const mongoose = require("mongoose");

const client = new Client({
  intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});
module.exports = client;

mongoose.connect('mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(console.log("MongoDB conectado com sucesso!"));

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./src/config/config.json");
//client.db = new Database(client.config.mongourl);
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./src/commands/Message/");
client.logger = require("./src/util/logger.js");
client.emoji = require("./src/util/emoji.json");

require("./src/handler/index")(client).then(console.log('Carreguei os comandos'))
require("./src/handler/events")(client).then(console.log('Carreguei os eventos'))
client.manager = new Manager({
  nodes: client.config.nodes,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
  autoPlay: true,
  plugins: [new Spotify({
    clientID: client.config.SpotifyID,
    clientSecret: client.config.SpotifySecret,
  }),
      new Deezer(),
      new FaceBook()
    ],
 });

 readdirSync("./src/events/lavalink/").forEach(file => {
  const event = require(`./src/events/lavalink/${file}`);
  let eventName = file.split(".")[0];
  client.logger.log(`Loading Events Lavalink ${eventName}`, "event");
  client.manager.on(eventName, event.bind(null, client));
});

client.on("raw", (d) => client.manager.updateVoiceState(d));


client.login(client.config.token);