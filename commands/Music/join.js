const playermanager = require(`../../handlers/playermanager`);

module.exports = {
  name: `join`,
  category: `🎶 Music`,
  aliases: [`summon`],
  description: `Summons the bot to the voice channel you are in`,
  usage: `summon`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": false, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {

    const botchannel = message.guild.me.voice.channel;
    var player = client.manager.players.get(message.guild.id);

    if (player || botchannel) return message.channel.send(`**:x: Eu já estou conectado em algum lugar!**`);
    player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
    });
    if (player.state !== "CONNECTED") {
      player.connect();
      player.stop();
    }
  }
};