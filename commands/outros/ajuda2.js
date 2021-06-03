const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db")

module.exports = {
  name: "help",
  aliases : ['h', 'ajuda'],
  description: "Mostrar os comandos disponiveis.",
  category: "outros",

  async run (client, message, args) {
    var prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Sem nome do comando.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Em progresso." : cmds.join(" "),
        };

        categories.push(data);
      });


        let fun = client.commands.filter((cmd) => cmd.category === 'fun');
        let economia = client.commands.filter((cmd) => cmd.category === 'economia');
        let manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao');
        let mod = client.commands.filter((cmd) => cmd.category === 'mod');
        let music = client.commands.filter((cmd) => cmd.category === 'musica');
        let outros = client.commands.filter((cmd) => cmd.category === 'outros');    
        let config = client.commands.filter((cmd) => cmd.category === 'config');    

      const embed = new MessageEmbed()
    
        .setTitle("📬 Precisa de ajuda? \nSem problemas, aqui estão meus comandos:")
        .setDescription(`**Estou com ${client.commands.size} comandos!\nDesenvolvido por Spray#0007**\n**prefixo atual: ${prefix}**`)
        .addField(`<:4693_pink_hair_popcorn:843542215708114994> **Diversão** [${fun.size}]:`, `\`${fun.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:money1:846828402350489640> **Economia** [${economia.size}]:`, `\`${economia.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:3624personframe:843854352934633542> **Manipulação de imagens** [${manipulacao.size}]:`, `\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:staff:843586666845044736> **Moderação** [${mod.size}]:`, `\`${mod.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:music:843602147051700284> **Música** [${music.size}]:`, `\`${music.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:y_pontinho:843648515695444019> **Outros** [${outros.size}]:`, `\`${outros.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:2637settings:843854352867262504> **Configuráveis** [${config.size}]:`, `\`${config.map(cmd => cmd.name).join(' | ')}\``)
        //.addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` seguido por um nome de comando para obter mais informações adicionais sobre um comando.\nPor exemplo: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Requisitado por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Comando inválido, use \`${prefix}help\` para todos os meus comandos.`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Detalhes do comando:")
        .addField("Prefixo:", `\`${prefix}\``)
        .addField(
          "Comando:",
          command.name ? `\`${command.name}\`` : "Sem nome para esse comando."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Sem aliases para esse comando."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Descrição:",
          command.description
          ? `\`${command.description}\``
          : "Sem aliases para esse comando."
        )
        .setFooter(
          `Requerido por: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};