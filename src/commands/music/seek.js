const { format } = require(`../../handlers/functions`);

module.exports = {
  name: "seek",
  aliases: [],
  cooldown: 2000 * 2,
  description: "Busca um certo ponto na faixa atual.",
  category: "music",
  usage: "<temp>",
  example: "40",
  args: true,

  async run(client, message, args) {

    if(!args[0]) return;

    const { channel } = message.member.voice;
    
    if (!channel) return message.channel.send(`:x: **Você precisa estar em um canal de voz para usar este comando.**`);
    if (message.member.voice.selfDeaf) return message.channel.send(`:x: **Você não pode executar este comando enquanto estiver silenciado**`);

    const botchannel = message.guild.me.voice.channel;
    const player = client.manager.players.get(message.guild.id);

    if (!player || !botchannel) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);
    if (!player.queue || !player.queue.current) return message.channel.send(`**:x: Não a nada tocando neste servidor**`);

    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Você precisa estar no mesmo canal de voz que eu para usar este comando**`);

    if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
      return message.channel.send(`**:x: O tempo não pode ser maior que a música**`);

    player.seek(Number(args[0]));
    return message.channel.send(`**:musical_note: Defini a posição para \`${format(player.position)}\` :fast_forward:**`);
  }
};