module.exports = {
    name: "banlist",
    aliases: ['listabans'],
    cooldown: 1000 * 2, 
    description: "Lista de bans",
    category: "mod",
    usage: "",

async run (client, message, args) {
    
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Você não possui permissões para usar este comando | Permissão: `BAN_MEMBERS`");
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('❌ Não tenho permissão para ver a lista de membros banidos!'); 

    const bans = await message.guild.fetchBans(); 

    if (!bans.first()) 
        return message.channel.send('<:1926blurplecross:856520144872407060> **|** Este servidor não tem membros banidos!');
    
    let msg = '';


    bans.map(user => {
        msg += `\`${user.user.tag}\`, `;
    });

    message.channel.send('<:9023blurpleemployee:856520144860086272> **|** Lista de membros banidos:\n' + msg, { split: true });
}}