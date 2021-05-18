const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client,message,args)=> {

    var list = [
        'https://imgur.com/ZNuAcum.gif',
        'https://imgur.com/xlD7P3N.gif',
        'https://imgur.com/cT6TUwv.gif',
        'https://imgur.com/7l7n5un.gif',
        'https://imgur.com/NYZsPRx.gif',
        'https://imgur.com/gVAiCX6.gif',
        'https://imgur.com/usOD4UR.gif',
        'https://imgur.com/4uDadjQ.gif'
      ]
    

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    var rand = list[Math.floor(Math.random() * list.length)]

    const antiraid = new Discord.MessageEmbed()
    .setTitle("Comando de AntiRaid - Resolute")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setDescription("Aguarde o comando de AntiRaid está sendo executado.")
    .addField(`<:information:843590035848429579> Forma de Utilização:`, `<:y_pontinho:843648515695444019> \`${prefix}antiraid\``)
    .addField(`<:information:843590035848429579>`, `<:y_pontinho:843648515695444019> \`Todos irão ficar sem permissão para escrever nos chats.\``)
    .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setImage(rand)
    .setTimestamp();

    const antiraid2 = new Discord.MessageEmbed()
    .setTitle("Comando de AntiRaid - Resolute")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setDescription(`Antiraid Habilitado por ${message.author}`)
    .addField(`<:information:843590035848429579> Forma de Utilização:`, `<:y_pontinho:843648515695444019> \`${prefix}antiraid\``)
    .addField(`<:information:843590035848429579>`, `<:y_pontinho:843648515695444019> \`Todos irão ficar sem permissão para escrever nos chats.\``)
    .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setImage(rand)
    .setTimestamp();

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("<:2637settings:843854352867262504> | Você não possui permissões para usar este comando | `MANAGE_CHANNELS`");
    if(db.fetch(`lock.${message.guild.channels}`)) return message.reply("<:7300lock:843854352653484084> | Este canal já está bloqueado.")
    let msg = await message.channel.send(antiraid)

    let muteRole = message.guild.roles.cache.find(role => role.name == "@everyone")
    const channels = message.guild.channels.cache.filter(ch => ch.type !== "category")
    

    message.channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false
    })


    try {
        db.set(`lock.${message.channel.id}`,message.author.id)

        message.guild.channels.cache.forEach(ch => 
            {
            if(ch.type == "text")
              ch.overwritePermissions([
              {
                id: muteRole.id,
                deny: ['SEND_MESSAGES'],
                },
            ], 'Precisso de permissões.');
        }) 

        msg.edit(antiraid2)

    }catch(e){
        message.channel.send(e)
    }
}
