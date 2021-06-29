module.exports = {
  name: "sugestao",
  aliases: ['sugestion', 'sugerir'],
  cooldown: 1000 * 2, 
  description: "Faça uma sugestão para o seu servidor!",
  category: "outros",
  usage: "<#canal> <conteudo>",
  example: "sugestao #sugestoes devo criar um novo chat?",

  async run (client, message, args) {

		if(!args[0]) {
			return;
		}

        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")

        if(!theDescription) return message.reply("<:1926blurplecross:856520144872407060> **|** Por favor, especifique uma descrição / pergunta para a sugestão!")

        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Nova sugestão por \`${message.author.username}#${message.author.discriminator}\``)
        .setDescription(`**${theDescription}**`)
        //.setFooter("Sugestão por: "+ message.author.username +'#'+ message.author.discriminator)

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react('✅') //👎👍
        await msgEmbed.react('❌')
        message.delete().catch(O_o => {});
    }
}