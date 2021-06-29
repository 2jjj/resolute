const Discord = require("discord.js")

module.exports = {
    name: "report",
    aliases: ['bug', 'reportar'],
    cooldown: 1000 * 2, 
    description: "Reportar um bug para minha equipe de desenvolvedores.",
    category: "info",
    usage: "<Bug encontrado>",

    async run (client, message, args) {

        let canal = client.channels.cache.get("842984263392428032")
        let bug = args.join(' ');
        
        let embed = new Discord.MessageEmbed()
        .setTitle("Novo Bug/Report")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("<a:SETA:852194614927818812> Servidor que reportou", `${message.guild.name}`)
        .addField("<a:SETA:852194614927818812> Reportado por", `${message.author.tag}`)
        .addField("<a:SETA:852194614927818812> Menção", `${message.author}`)
        .addField("<a:SETA:852194614927818812> ID de quem reportou", `${message.author.id}`)
        .addField("<a:SETA:852194614927818812> Bug", `\`${bug}\``)
        .setColor([255,182,193])
        canal.send(embed)

        message.channel.send({embed: {
        description: "<a:check:835206263075242029> Seu bug/report foi computado e enviado para minha equipe, muito obrigado por me ajudar a melhorar!\n Contato com o desenvolvedor: Spray#2885",
        color: "RED"
}
});
}
}