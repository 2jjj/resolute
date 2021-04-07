const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {

const owner = message.guild.owner.user
console.log(`OPA!`)
    const moment = require("moment")
    moment.locale("pt-BR")
    let simg = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png?size=2048`
    let roles = message.guild.roles.cache.size;
    let totalmembros = message.guild.memberCount;
    let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;
    let cargos = message.guild.roles.cache.map(a => a).join(", ")
    
        const embed = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}**`)
        .setColor("#0051FF")
        .setTimestamp()
        .addField(' 👑 Criador do servidor:', `${owner}`)
        .addField(` 👥 Membros [${totalmembros}]`, `Total de Membros`)
        .addField(`📝 Canais [${canaistexto+canaisvoz}]`, `Texto: **${canaistexto}**\n Voz: **${canaisvoz}**`)
        .addField('📆 Criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("💻 ID do servidor:", (message.guild.id))
        .setThumbnail(simg)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL()}`)
        await message.channel.send (embed);
        }

