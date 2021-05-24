const Discord = require('discord.js');
module.exports = {
    name: "botinfo",
    alias: ["about"],
    category: "bot",
    run: (bot, message, args) => {
        const embedInfo = new Discord.MessageEmbed()
        .setAuthor(`Mi Información`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription('Soy un bot creado por [Rojito.#0017](https://mybo.me/rojito), fui hecho para hacer pruebas.')
        .setColor(bot.config.color)
        .addField('Librería:', 'Discord.js')
        .addField('Código:', '[Click Aquí](https://github.com/MrJC-cpu/Discord-Bot-Structure)')
        .setTimestamp()

        return message.channel.send(embedInfo);
    }
}
