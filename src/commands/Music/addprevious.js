const playermanager = require(`../../handlers/playermanager`);

module.exports = {
  name: `addprevious`,
  category: `🎶 Music`,
  aliases: [`addp`, `addpre`, `addprevius`, `addprevios`],
  description: `Adiciona a música anterior à fila novamente!`,
  usage: `addprevious`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: {"type":"music", "activeplayer": true, "previoussong": true},
  
  run: async (client, message, args, cmduser, text, prefix, player) => {

    let type = `song:youtube`;
    if (player.queue.previous.uri.includes(`soundcloud`)) type = `song:soundcloud`
    playermanager(client, message, Array(player.queue.previous.uri), type);
  
  }
}