const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Retome a música que estava pausada",
    args: false,
    usage: "",
    example: "",
    permissoes: [],
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async run(client, message, args, prefix) {

        const player = message.client.manager.get(message.guild.id);
        const song = player.queue.current;
        
        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const emojiresume = message.client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} The player is already **resumed**.`)
                .setTimestamp()
          return message.channel.send({embeds: [thing]});
        }

        player.pause(false);

        let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
            .setColor(message.client.embedColor)
            .setTimestamp()
        return message.channel.send({embeds: [thing]});	
    }
};