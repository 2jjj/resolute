const {
    MessageEmbed, Message, splitMessage
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const {
    KSoftClient
} = require(`@ksoft/api`);

module.exports = {
    name: `lyrics`,
    aliases: [],
    cooldown: 2000 * 2,
    description: "",
    category: "music",
    usage: "",
    example: "",
  
    async run(client, message, args) {
  
            const { channel } = message.member.voice;

            if (!args[0] && !channel)  return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
            if(!args[0] && message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);
            
            const botchannel = message.guild.me.voice.channel;
            const player = client.manager.players.get(message.guild.id);
            
            if(!args[0] && (!player || !botchannel)) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
            if (!args[0] && (!player.queue || !player.queue.current)) return message.channel.send(`**:x: Não há nada tocando neste servidor**`);
            if(!args[0] && (player && channel.id !== player.voiceChannel))
                return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
            if(!args[0] && (player && botchannel && channel.id !== botchannel.id)){
                player.destroy();
            }
            let title = args[0] || player.queue.current.title || "404";
            if(title == "404") return message.channel.send(`**:x: Algo deu errado...**`);
            if (args[0]) {
                title = args.join(` `);
            }
            let lyrics = null;
            let lyricsmsg = await message.channel.send(`**:mag: Procurando letra de \`${title}\`**`).catch(e=>console.log("error"))
            const ksoft = new KSoftClient(config.ksoftapi);
            await ksoft.lyrics.get(title).then(async (track) => {
                if (!track.lyrics) return lyricsmsg.edit(`**:x: Nenhuma letra foi encontrada de:** \`${title}\``).catch(e=>console.log("error"))
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


            lyricsmsg.edit({content: `**:mag: Procurando letra de \`${title}\`**`, embed: embeds[0]}).catch(e=>console.log("error"))
            for(let i = 1; i<embeds.length;i++){
                message.channel.send(embeds[i]).catch(e=>console.log("error"))
            }
    }
};