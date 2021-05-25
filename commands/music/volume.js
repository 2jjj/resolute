const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const db = require("quick.db")

module.exports = {
  info: {
    name: "volume",
    description: "Modificar o volume da fila.",
    usage: "",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const channel = message.member.voice.channel;
    if (!channel)return sendError("<:Resoluteinfo:844971535927083088> Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<:Resoluteinfo:844971535927083088> Não ha nada tocando.", message.channel);
    if (!args[0])return message.channel.send(`<:Resoluteinfo:844971535927083088> O volume atual é: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send('<:Resoluteinfo:844971535927083088> Somente números!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('<:Resoluteinfo:844971535927083088> Você não pode definir o volume para mais de 150 ou menor que zero. <:bravinha:841126251741970452>',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let spray = new MessageEmbed()
    .setDescription(`<:Resoluteinfo:844971535927083088> Eu ajustei o volume para: **${args[0]/1}/100**`)
    .setAuthor("Gerenciamento do volume", `${message.author.displayAvatarURL({format: "png"})}`)
    .setColor("BLUE")
    return message.channel.send(spray);
  },
};
