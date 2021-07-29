const Discord = require("discord.js")

module.exports = {
  name: "iphonealert",
  aliases: ['alert'],
  cooldown: 1000 * 2,
  description: "Faça uma imagem falsa de alerta do iPhone!",
  category: "manipulacao",
  usage: "<texto>",
  example: "Resolute e muito bom",
  permissoes: {
    membro: [],
    bot: ['ATTACH_FILES', 'Anexar arquivos']
  },
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    const img = `https://api.popcatdev.repl.co/alert?text=${text}`
    const attachment = new Discord.MessageAttachment(img, `resolute_${message.author.username}.jpg`);
    message.channel.send(attachment);

  }
}