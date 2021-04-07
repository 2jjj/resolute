const moment = require('moment')
const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {

        const coroa = client.emojis.cache.get('823288489280798730')
        const estrela = client.emojis.cache.get('823289012935983136')

        let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.author;
        let muser = msg.mentions.users.first() ||  msg.guild.members.cache.get(args[0]) || msg.author;
        if(muser === msg.guild.members.cache.get(args[0]))
        muser = muser.user;
        let guild = msg.guild
        let member = guild.members.cache.get(muser.id)

        let muserrole = member.roles.highest
        let allrole = member.roles.cache.array()
        let rname = allrole.sort((a,  b) => b.position - a.position).map(r => r.name)
        const musergame = user.presence.activities.name
        joinDiscord = moment(muser.createdAt).format('LLL') + '\n*' + moment(new Date()).diff(muser.createdAt, 'days') + ' Dias atrás*';
        joinServer = moment(muser.joinedAt).format('LLL');

        let userinfoembed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`${coroa} **Informações do ${muser.tag}** ${coroa}`)
          .setDescription(`${estrela} **__Nick Do Usuario__** : ${muser.tag} \n\n ${estrela}**__Bot__** : ${muser.bot} \n\n${estrela}**__ID Do Usuario__** : ${muser.id}\n\n${estrela}**__Entrou no Discord__** : ${joinDiscord} \n\n ${estrela}**__Entrou No Server__**: ${joinServer} \n\n${estrela}**__Maior Cargo__**: ${muserrole} \n\n${estrela}**__Todos os Cargos__** : ${allrole.slice(0, -1)}`)
          .setThumbnail(muser.displayAvatarURL({dynamic:true}))
          .setFooter(`Resolute | Desenvolvido por Spray`)
          .setTimestamp();
          msg.channel.send(userinfoembed);
}          