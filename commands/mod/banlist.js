module.exports = {
    name: "banlist",
    aliases: ['listabans'],
    cooldown: 1000 * 2, 
    description: "Lista de bans",
    category: "mod",
    usage: "",

async run (client, message, args) {
    
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("<:x_:856894534071746600> **|** Você não possui permissões para usar este comando | Permissão: `BAN_MEMBERS`");
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('<:x_:856894534071746600> **|** Não tenho permissão para ver a lista de membros banidos!'); 

    const bans = await message.guild.fetchBans(); 

    if (!bans.first()) 
        return message.channel.send('<:x_:856894534071746600> **|** Este servidor não possui membros banidos!');
    
    let msg = '';


    bans.map(user => {
        msg += `\`${user.user.tag}\`, `;
    });

    message.channel.send('<:mod:856894534088523776> **|** Lista de membros banidos:\n' + msg, { split: true });
}}