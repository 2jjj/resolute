const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../../util/convert');
const { progressbar } = require('../../../util/progressbar')

module.exports = {
	name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Mostrar a música que está tocando atualmente",
    args: false, 
    usage: "",
    example: "",
    permissoes: [],
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    async run(client, message, args, prefix) {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há nenhuma música tocando atualmente!");
            return message.reply({embeds: [thing]});
        }

        const song = player.queue.current

        const emojimusic = message.client.emoji.music;

        // Progress Bar
        var total = song.duration;
        var current = player.position;
        var size = 20;
        var line = '▬';
        var slider = '🔘';

        let embed = new MessageEmbed()
            .setDescription(`[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\` [<@${song.requester.id}>]`)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(message.client.embedColor)
            .addField("\u200b", progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return message.reply({embeds: [embed]})
            
    }
};