const { MessageEmbed, Client, CommandInteraction, DiscordAPIError } = require("discord.js");

module.exports = {
    name: "report",
    description: "[📝 INFO]  Reportar um erro para a minha equipe de desenvolvedores.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'motivo',
            description: 'O motivo do report',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        var canal = client.channels.cache.get("842984263392428032")

        let embed = new MessageEmbed()
            .setTitle("<:BadgeDiscordBugHunter:869963243056164927> Novo Bug/Report")
            .setThumbnail(client.user.displayAvatarURL())
            .addField("<:3199blurplejoin:856520144829808650> Servidor que reportou", `${interaction.guild.name}`)
            .addField("<:3199blurplejoin:856520144829808650> Reportado por", `${interaction.user.tag}`)
            .addField("<:3199blurplejoin:856520144829808650> Menção", `${interaction.user}`)
            .addField("<:3199blurplejoin:856520144829808650> ID de quem reportou", `${interaction.user.id}`)
            .addField("<:3199blurplejoin:856520144829808650> Bug", `\`${args[0]}\``)
            .setColor("RANDOM")
        canal.send({ embeds: [embed] })
    
        let z = new MessageEmbed()
            .setDescription("<:setaaa:860626769089265665> Seu bug/report foi enviado para minha equipe, muito obrigado por me ajudar a melhorar!\n Contato com o desenvolvedor: Spray#7725")
            .setColor('RANDOM')
        interaction.followUp({ embeds:  [z] })
    },
};
