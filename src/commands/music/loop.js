const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "loop",
    description: "Habilitar o loop",
    usage: "",
    aliases: ["l"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `<:music:843602147051700284> | O **loop** está **\`${serverQueue.loop === true ? "Habilitado" : "Desabilitado"}\`**`
                }
            });
        };
    return sendError("Não ha nada tocando neste servidor.", message.channel);
  },
};

