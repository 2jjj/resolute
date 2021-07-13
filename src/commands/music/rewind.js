const { format } = require(`../../handlers/functions`);

module.exports = {
  name: "rewind",
  aliases: [],
  cooldown: 2000 * 2,
  description: "Retrocede um certo tempo na faixa atual.",
  category: "music",
  usage: "<tempo>",
  example: "50",
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

    let seektime = player.position - Number(args[0]) * 1000;
    if (seektime >= player.queue.current.duration - player.position || seektime < 0)
      return message.channel.send("**:x: Não consigo retroceder tanto na música**")

    player.seek(Number(seektime));
    return message.channel.send(`**:musical_note: Defini a posição para \`${format(player.position)}\` :fast_forward:**`);
  }
};