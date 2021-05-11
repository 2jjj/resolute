module.exports = async (client, message) => {


//https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ
const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")
    console.log("+1")
    const dono = client.guilds.fetch(guild.id).then(guilda => client.users.fetch(guilda.ownerID).then(o => `${o.tag} (${o.id})`))
    let embed = new Discord.MessageEmbed()
    .setTitle(`+1 server :sunglasses:`)
    .setDescription(`Servidor: ${guild.name}\nID: ${guild.id}\nMembros: ${guild.memberCount} membros\nDono: ${dono}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('#FFC4E7')
    webhook.send(embed);
