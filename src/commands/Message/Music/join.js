const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "join",
    aliases: ["j"],
    category: "Music",
    description: "Faça eu entrar no canal de voz",
    args: false,
    usage: "",
    example: "",
    permissoes: [],
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    async run(client, message, args, prefix) {
  
		const { channel } = message.member.voice;

        const emojiJoin = message.client.emoji.join;

        if(!message.guild.me.voice.channel) {
            
            const player = message.client.manager.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                volume: 50,
                selfDeafen: true,
            });

            player.connect();

            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`${emojiJoin} **Entrei no canal de voz!**\nEntrei em <#${channel.id}> and bound to <#${message.channel.id}>`)
            return message.reply({embeds: [thing]});

        } else if (message.guild.me.voice.channel !== channel) {

            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Você precisa estar no mesmo canal de voz que o ${message.client.user}`);
            return message.reply({embeds: [thing]});
        }
        
    }
};