const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberAdd", member => { //evento de quando algum membro entra no servidor
  let welcomeEmbed = new Discord.MessageEmbed()
    .setColor("00ffff") 
    .setDescription(`Bem vindo ${member} ao servidor!`)
    .setThumbnail(member.user.displayAvatarURL()); //embed que será enviada no canal
// a cor, descrição, imagem e todo o conteúdo da embed pode ser personalizado de acordo com sua preferência.
  member.guild.channels.cache.get("id do canal para enviar a mensagem").send(welcomeEmbed); //canal em que a mensagem de bem vindo será enviada
});