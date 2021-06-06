const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "banlist",
    aliases: ['listabans'],
    cooldown: 1000 * 2, 
    description: "Lista de bans",
    category: "mod",
    usage: "",

async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }
    
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Você não possui permissões para usar este comando | Permissão: `BAN_MEMBERS`");
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('❌ Não tenho permissão para ver a lista de membros banidos!'); 

    const bans = await message.guild.fetchBans(); 

    if (!bans.first()) 
        return message.channel.send('<:4693_pink_hair_popcorn:843542215708114994> Este servidor não tem membros banidos!');
    
    let msg = '';


    bans.map(user => {
        msg += `\`${user.user.tag}\`, `;
    });

    message.channel.send('<:ban:843861447522910230> Lista de membros banidos:\n' + msg, { split: true });
}}