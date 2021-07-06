module.exports = {
  name: "disconnect",
  aliases: ['leave'],
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
      
      if(player && channel.id !== player.voiceChannel){
        return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para poder ultilizar este comando**`);
      }

      return message.channel.send(`**:mailbox_with_no_mail: Desconectado com sucesso!**`).catch(e=>console.log(e))
  }
};