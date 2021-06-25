const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "mute",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Mutar alguém!",
    category: "mod",
    usage: "@user",

    async run (client, message, args) {

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Você não possui permissões para usar esse comando!')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        if(!Member) {
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) prefix = "s."
            
            const help = new Discord.MessageEmbed()
            .setTitle("Comando de mute")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Mute algum usuário com este comando")
            .addField(`Como mutar:`, `<:pontin:852197383974551582> \`${prefix}mute @user\``)
            .addField(`Como desmutar:`, `<:pontin:852197383974551582> \`${prefix}unmute @user\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setTimestamp();
            return message.channel.send(help);    
        }

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('O cargo de mute não está criado, irei criá-lo.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Cargo de mute foi criado.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} já está silenciado.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} foi silenciado.`)
    }
}