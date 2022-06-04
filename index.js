const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const config = require("./config.json"); 
const db = require("quick.db");

client.login(config.token); 

client.once('ready', async () => {

    console.log("✅ - Logado em "+client.user.username+" com sucesso!")

})

module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.on("guildMemberAdd", (member) => {
  let id = db.get(`contador_${member.guild.id}`);
  let canal = member.guild.channels.cache.get(id);
  if (!canal) return;

  let membros = member.guild.memberCount;
  canal.setName(`👥 Membros: ${membros}`)
})
client.on("guildMemberRemove", (member) => {
  let id = db.get(`contador_${member.guild.id}`);
  let canal = member.guild.channels.cache.get(id);
  if (!canal) return;

  let membros = member.guild.memberCount;
  canal.setName(`👥 Membros: ${membros}`)
})

client.on("interactionCreate", async (interaction) => {

    if (!interaction.guild) return;
  
    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
        
    }
});