const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "votar",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Faça um sorteio.",
    category: "outros",
    usage: "<#canal> [Premio]",

 async run (client, message, args) {
     
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) { prefix = "s." }
    
 message.delete().catch(() => null);
 
 if (!args[0]) return message.channel.send(`<:spr4yxyz:837798446584168468> Você não específicou tempo.`);
 
 if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m") && !args[0].endsWith("s")) return message.channel.send(
 `<:spr4yxyz:837798446584168468> Use a forma correta para definir o tempo, Use Apenas Letras Minusculas Exemplo: 1m, 1h, 1d`
 );
 
 if (isNaN(args[0][0])) return message.channel.send(`<:spr4yxyz:837798446584168468> Isto não é um número!`);
 
 let channel = message.mentions.channels.first();
 
 if (!channel) return message.channel.send(
 `<:spr4yxyz:837798446584168468> Você precisa marcar o canal para o sorteio!`
 );
 
 let prize = args.slice(2).join(" ");
 
 if (!prize) return message.channel.send(`<:spr4yxyz:837798446584168468> Você precisa escrever o prêmio!`);
 
 message.channel.send(`*<:setaazul:843588568605523969> Sorteio criado em ${channel}*`);
 
 let Embed = new MessageEmbed()
 .setTitle(`Sorteio!`)
 .setDescription(
 `<:spr4yxyz:837798446584168468> Sorteio criado por ${message.author} \n Clique Em 🎉 Para Participar\nSorteio: **${prize}**`
 )
 .setTimestamp(Date.now() + ms(args[0]))
 .setColor("#00FFFF");
 
 let m = await channel.send(Embed);
 
 m.react("🎉");
 
 setTimeout(() => {
 if (m.reactions.cache.get("🎉").count <= 1) {
 message.channel.send(`Reações: ${m.reactions.cache.get("🎉").count}`);
 return message.channel.send(``);
 }

 let ganhador = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
 channel.send(`<:winner:844591002638745600> **Parabéns** ${ganhador}!! \nVocê acabou de ganhar o sorteio De **${prize}!**`);
 
 }, ms(args[0]));
 },
};