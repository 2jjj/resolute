const { MessageEmbed , Client, CommandInteraction} = require("discord.js");
const config = require("../../../config/config.json")

module.exports = {
    name: "botinfo",
    description: "[📝 INFO]  Obtenha as minhas informacões.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, prefix) => {


        const totalGuilds = client.guilds.cache.size
        const totalMembers = client.users.cache.size

        let { version } = require("discord.js");
        let secs = Math.floor(client.uptime % 60);
        let days = Math.floor((client.uptime % 31536000) / 86400);
        let hours = Math.floor((client.uptime / 3600) % 24);
        let mins = Math.floor((client.uptime / 60) % 60);

        let embed = new MessageEmbed()
            //.setTitle("**Outras informações**")
            .setColor("RANDOM")
            .setDescription(`
        > **Outras informações:**
        > <:early_developer_badge:854716150076538901> **|** Desenvolvedor: ${config.spray}
        > <:1520blurplesettings:856520144851435540> **|** Versão: 3.0.5
        > <:1598blurplesupport:856520144599777291> **|** Prefixo: ${prefix}
        > <:djs:868314375751102484> **|** Versão Discord.Js: ${version}
        > <:node:845780252940959744> **|** Versão do Node.Js: ${process.version}
        > <:offfzz:868635422086013018> **|** Uptime de ${hours}h ${mins}m
        > <:mine_foguete:852197847754604565> **|** Estou em ${totalGuilds} servidores com o total de ${totalMembers} usuários.

        > **Links úteis:**
        > <:1113blurpleplus:856520144797040690> **|** [Me adicione!](https://www.resolutebot.xyz/add)
        > <:8512blurplelink:856520144843046922> **|** [Website](https://www.resolutebot.xyz)
        `)

        const message = await interaction.followUp({ embeds: [embed] });
        message.react('👍');

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === interaction.user.id;
        };
        
        const collector = message.createReactionCollector({ filter, time: 40000 });

        collector.on('collect', (reaction, user) => {
            if(user.id == client.user.id) return;
            console.log(0)
            interaction.editReply('Clico')
        });
    },
};