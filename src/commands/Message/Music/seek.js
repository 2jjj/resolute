const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../../util/convert');
const ms = require('ms');

module.exports = {
	name: "seek",
	aliases: [],
	category: "Music",
	description: "Seek the currently playing song",
	args: true,
    usage: "<10s || 10m || 10h>",
    example: "",
    permissoes: [],
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async run(client, message, args, prefix) {
        
        if(!args[0]) return;
        
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = message.client.emoji.forward;
        const emojirewind = message.client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(message.client.embedColor)
                    .setTimestamp()
                return message.channel.send({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(message.client.embedColor)
                    .setTimestamp()
          return message.channel.send({embeds: [thing]});
            }
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``);
            return message.channel.send({embeds: [thing]});
        }
	
    }
};