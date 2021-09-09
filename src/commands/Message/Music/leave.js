const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Faça eu sair do canal de voz",
    args: false,
    usage: "",
    example: "",
    permissoes: [],
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async run(client, message, args, prefix) {
       
        const player = message.client.manager.get(message.guild.id);
        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setDescription(`${emojiLeave} **Sai do canal de voz!**\nObrigado por me usar! * ${message.client.user.username}!`)
        return message.reply({embeds: [thing]});	
    }
};