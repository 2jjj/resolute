const { MessageEmbed, Client, CommandInteraction, DiscordAPIError } = require("discord.js");

module.exports = {
    name: "report",
    description: "Reportar um erro para a minha equipe de desenvolvedores",
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

        let canal = client.channels.cache.get("842984263392428032")

        let embed = new MessageEmbed()
            .setTitle("Novo Bug/Report")
            .setThumbnail(client.user.displayAvatarURL())
            .addField("<a:SETA:852194614927818812> Servidor que reportou", `${interaction.guild.name}`)
            .addField("<a:SETA:852194614927818812> Reportado por", `${interaction.user.tag}`)
            .addField("<a:SETA:852194614927818812> Menção", `${interaction.user}`)
            .addField("<a:SETA:852194614927818812> ID de quem reportou", `${interaction.user.id}`)
            .addField("<a:SETA:852194614927818812> Bug", `\`${args[0]}\``)
            .setColor("RANDOM")
        canal.send(embed)

        let z = new MessageEmbed()
            .setDescription("<:setaaa:860626769089265665> Seu bug/report foi enviado para minha equipe, muito obrigado por me ajudar a melhorar!\n Contato com o desenvolvedor: Spray#7725")
            .setColor('RANDOM')
        interaction.followUp({ embeds:  [z] });
    },
};
