const Discord = require('discord.js');

exports.run = async(bot, message, args) => {
  
  if (!args[0]) return message.reply('mencione alguém para mudar o seu nick.'); //Aqui iremos alertar caso o usuário não mencione um membro.

  const membro = message.mentions.members.first(); //Aqui definimos o membro com um const (pode user "var" ou "let").
  if (!membro && args[0]) return message.reply('não foi possível encontrar nenhum membro.'); //Aqui iremos alertar caso o usuário mencione um membro, mas esse membro não esteja no servidor.

  if (!args[1]) return message.reply('introduza um nickname para esse membro.'); //Aqui iremos alertar caso o usuário não coloque um apelido para o usuário mencionado.
  if (args[1].toLowerCase() == 'reset') { //Aqui caso o argumento 1, que seria a palavra após a menção do usuário, for igual a reset, irá resetar o apelido do membro mencionado.
    membro.setNickname(membro.user.username); //Aqui irá resetar o apelido.
    return message.channel.send("apelido resetado") //Aqui a mensagem que o bot irá mandar após ter executado o comando do "reset"
}

  args.shift(); // Remove o primeiro args (que é o que possui o @usuario).
  const nickname = args.join(' '); // o nickname vai ser tudo o que você escrever após o comando.

  membro.setNickname(nickname); //Aqui irá setar o apelido do membro, colocado pelo usuário que usou o comando.
  let embed = new Discord.MessageEmbed()
  .setTitle(":emoji:| Apelido Alterado")
  .setThumbnail(membro.user.displayAvatarURL())
  .addField("Nome:", `\`${membro.user.username}#${membro.user.discriminator}\``)
  .setColor(0x2f3136)
  .addField("Apelido:", `\`${nickname}\``)
  message.channel.send(message.author, embed) //Aqui a mensagem que o bot irá mandar após ter executado o comando do "setnick"
}

exports.help = {
  name: "setnick",
  aliases: ['nickname']
}