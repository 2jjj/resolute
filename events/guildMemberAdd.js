const db = require("quick.db")

module.exports = async (member, client) => {

let boas_vindas = db.get(`boas_vindas_${member.guild.id}`);
let contador = member.guild.memberCount;
let servidor = member.guild.name;

if (!boas_vindas) return;

let msg_embed = new Discord.MessageEmbed() //mensagem embed
.setAuthor(`${member.user.tag}`, member.user.avatarURL())
.setDescription(`Boas Vindas ${member.user} ao servidor **${servidor}**! \nAtualmente estamos com \`${contador}\` membros.`)
.setColor("RANDOM")
.setThumbnail(member.user.avatarURL());

let msg_not_embed = `Boas Vindas ${member.user}! \nAtualmente estamos com \`${contador}\` membros!`; //mensagem não embed

client.channels.cache.get(boas_vindas).send(msg_embed)

}