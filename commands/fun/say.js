const Discord = require('discord.js')

exports.run = async (client, message, args) => {

let Conteudo = args.join(" "); //Pega a mensagem que vem ao lado do comando. Ex. !say <Mensagem>
message.delete() //Deleta o comando feito pelo usuário no chat
if(!Conteudo) { //caso Não haja conteudo depois do !say ele irá retornar uma mensagem de erro
    let botEmbed = new Discord.MessageEmbed()
    .setTitle(`・Comando Say・`)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(`#000000`)
    .addField(`・Erro`, `\`\`\`Você não digitou a Mensagem que devo enviar!\`\`\``)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    message.channel.send(message.author, botEmbed).then(async msg => { 
    setTimeout(() => {
        msg.delete()
    }, 10000) //Depois de 10 segundo que a mensagem de erro for enviada o bot irá excui-la automaticamente para não pouluir o chat. Você pode mudar esse numero.
 })
return
}
message.channel.send(Conteudo); //Se o conteudo do !say <mensagem> estiver correto ele envia a mensagem do conteúdo com sucesso.
}