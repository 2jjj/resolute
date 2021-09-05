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

        const os = require('os')
        const cpuStat = require("cpu-stat");

        let { version } = require("discord.js");
        let secs = Math.floor(client.uptime % 60);
        let days = Math.floor((client.uptime % 31536000) / 86400);
        let hours = Math.floor((client.uptime / 3600) % 24);
        let mins = Math.floor((client.uptime / 60) % 60);

        let embed = new MessageEmbed()
            //.setTitle("**Outras informações**")
            .setColor("RANDOM")
            .setDescription(`
        ・ Olá ${interaction.user} como vai? me chamo Resolute, tenho o intuito de melhorar o seu servidor!
        Fui criado na linguagem Javascript e atualmente possuo mais de ${client.commands.size} comandos para ajudar o seu servidor!

        ** ・ Outras informações:**
            > <:early_developer_badge:854716150076538901> **|** Desenvolvedor: ${config.spray}
            > <:1520blurplesettings:856520144851435540> **|** Versão: 3.0.5
            > <:1598blurplesupport:856520144599777291> **|** Prefixo: ${prefix}
            > <:djs:868314375751102484> **|** Versão Discord.Js: ${version}
            > <:node:845780252940959744> **|** Versão do Node.Js: ${process.version}
            > <:offfzz:868635422086013018> **|** Uptime de ${hours}h ${mins}m
            > <:mine_foguete:852197847754604565> **|** Estou em ${totalGuilds} servidores com o total de ${totalMembers} usuários.
        **・ Links úteis:**
            > <:1113blurpleplus:856520144797040690> **|** [Suporte](https://discord.gg/GRhdTpsTGE)
            > <:1113blurpleplus:856520144797040690> **|** [Me adicione!](https://www.resolutebot.xyz/add)
            > <:8512blurplelink:856520144843046922> **|** [Website](https://www.resolutebot.xyz)
        `)

        const message = await interaction.followUp({ embeds: [embed] });
        message.react('<:5864blurplesearch:856520144817881118>');

        const filter = (reaction, user) => {
            return reaction.emoji.id === '856520144817881118' && user.id === interaction.user.id;
        };
        
        const collector = message.createReactionCollector({ filter, time: 40000 });

        collector.on('collect', (reaction, user) => {
            if(user.id == client.user.id) return;
            cpuStat.usagePercent(function (err, percent, seconds) {
                if (err) {
                    return console.log(err);
                }
                let embed2 = new MessageEmbed()
                    .setTitle("** Status **")
                    .setColor("RANDOM")
                    .addField("<:memoryram:854135087037153280> Memória ultilizada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                    .addField("<:3199blurplejoin:856520144829808650> Uptime ", `${days}d, ${hours}h, ${mins}m, ${secs}s `, true) //`${duration}`, true)
                    .addField("<:djs:868314375751102484> Discord.js", `v${version}`, true)
                    .addField("<:node:845780252940959744> Versão do Node", `${process.version}`, true)
                    .addField("<:cpu:854137097521987624> CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                    .addField("<:cpuv:854137395254657026> CPU Usada", `\`${percent.toFixed(2)}%\``, true)
                    .addField("<:linux:854135555557425163> Arquitetura", `\`${os.arch()}\``, true)
                    .addField("<:linux:854135555557425163> OS", `\`\`${os.platform()}\`\``, true)
                interaction.editReply({ embeds: [embed2] })
            })
        });
    },
};