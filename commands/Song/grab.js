const { MessageEmbed } = require(`discord.js`);
const { format } = require(`../../handlers/functions`);

module.exports = {
  name: `grab`,
  aliases: ['salvar'],
  cooldown: 2000 * 2,
  description: "",
  category: "music",
  usage: "",
  example: "",

  async run(client, message, args) {

    const { channel } = message.member.voice;
    if (!channel)  return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);

    if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);
    const botchannel = message.guild.me.voice.channel;

    const player = client.manager.players.get(message.guild.id);
    if(!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if(player && channel.id !== player.voiceChannel) {
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);
    }
    
    let date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length ==1 ? "0" + new Date().getMonth() : new Date().getMonth()}-${String(new Date().getDate()).length ==1 ? "0" + new Date().getDate() : new Date().getDate()}`;
    message.author.send(new MessageEmbed()
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL("https://resolutebot.xyz")
      .setColor("GREEN")
      .setTitle("Música salva :musical_note:")
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`Duração:\` ${format(player.queue.current.duration).split(" | ")[0]}\n\n\`Requisitado por:\` ${player.queue.current.requester.username} (${player.queue.current.requester.tag})`)
      .setFooter(`${date} - ${message.guild.name}`)
    ).catch(e=>{
      return message.channel.send("**:x: Sua DM está desabilitada**")
    })    

    message.react("📭").catch(e=>console.log("Could not react"))
  }
};