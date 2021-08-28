const client = require("../../../index");
const config = require("../../../config.json");

module.exports = async (message) => {

    const prefix = config.prefix

    if (message.content.startsWith('<')) {
        if (message.content.endsWith('>'))
          if (message.mentions.has(client.user.id)) {
            return message.reply('Olá! meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
          }
      }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(config.prefix)
    ) return;

    const [cmd, ...args] = message.content
        .slice(config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args, prefix);

    if(command) {
        console.log(prefix)
    }
}