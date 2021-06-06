const Discord = require('discord.js');

module.exports = {
    name: "conquista",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Conquista do minecraft.",
    category: "manipulacao",
    usage: "@user",
    
async run (client, message, args) {

    console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

    const a = args.join("+")
    if(!a) return message.channel.send(`**Por favor diga algo para colocar na conquista!**`);
    if(args.join("+").length > 20) return message.channel.send(`**Use no maximo 20 caracteres!**`);

    const embed_conquista = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(`https://minecraftskinstealer.com/achievement/${Math.floor(Math.random() * 39) + 1}/Achievement+Get%21/${a}`);

    message.channel.send(`${message.author}`,embed_conquista)
}

}
