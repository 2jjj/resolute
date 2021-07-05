const {
    MessageEmbed, Message, splitMessage
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const {
    KSoftClient
} = require(`@ksoft/api`);
const ee = require(`../../botconfig/embed.json`);
const {
    format,
    delay
} = require(`../../handlers/functions`);
module.exports = {
    name: `lyrics`,
    category: `Song`,
    aliases: [`l`, `ly`],
    description: `Shows The Lyrics of the current track`,
    usage: `lyrics [Songtitle]`,
    cooldown: 15,
    run: async (client, message, args, cmduser, text, prefix) => {
            const { channel } = message.member.voice;
            if (!args[0] && !channel)  return message.channel.send(`:x: **You have to be in a voice channel to use this command.**`);
            if(!args[0] && message.member.voice.selfDeaf) return message.channel.send(`:x: **You cannot run this command while deafened**`);
            const botchannel = message.guild.me.voice.channel;
            const player = client.manager.players.get(message.guild.id);
            if(!args[0] && (!player || !botchannel)) return message.channel.send(`**:x: Nothing playing in this server**`);
            if (!args[0] && (!player.queue || !player.queue.current)) return message.channel.send(`**:x: Nothing playing in this server**`);
            if(!args[0] && (player && channel.id !== player.voiceChannel))
                return message.channel.send(`**:x: You need to be in the same voice channel as Milrato x Rythm to use this command**`);
            if(!args[0] && (player && botchannel && channel.id !== botchannel.id)){
                player.destroy();
            }
            let title = args[0] || player.queue.current.title || "404";
            if(title == "404") return message.channel.send(`**:x: Something went wrong**`);
            if (args[0]) {
                title = args.join(` `);
            }
            let lyrics = null;
            let lyricsmsg = await message.channel.send(`**:mag: Searching lyrics for \`${title}\`**`).catch(e=>console.log("error"))
            const ksoft = new KSoftClient(config.ksoftapi);
            await ksoft.lyrics.get(title).then(async (track) => {
                if (!track.lyrics) return lyricsmsg.edit(`**:x: No Lyrics found for:** \`${title}\``).catch(e=>console.log("error"))
                lyrics = track.lyrics;
            });
            var embeds = [];

            let lyembed = new MessageEmbed().setColor("#00ff00").setTitle(title.substr(0, 256)).setDescription(lyrics);

            const splitDescription = splitMessage(lyembed.description);
            for(var i = 0; i < splitDescription.length; i++){
                if(i > 0){
                    embeds.push(new MessageEmbed().setColor("#00ff00").setDescription(splitDescription[i]))
                }else{
                    embeds.push(lyembed.setDescription(splitDescription[i]));
                }
            }


            lyricsmsg.edit({content: `**:mag: Searching lyrics for \`${title}\`**`, embed: embeds[0]}).catch(e=>console.log("error"))
            for(let i = 1; i<embeds.length;i++){
                message.channel.send(embeds[i]).catch(e=>console.log("error"))
            }
    }
};