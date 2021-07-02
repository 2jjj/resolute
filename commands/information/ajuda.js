const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db")

module.exports = {
  name: "help",
  aliases : ['h', 'ajuda', 'comandos', 'commands'],
  description: "Mostrar os comandos disponiveis.",
  category: "info",
  cooldown: 1000 * 2, 
  usage: "",
  example: "",

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
        let music = client.commands.filter((cmd) => cmd.category === 'music');
        let miscelanea = client.commands.filter((cmd) => cmd.category === 'outros');
        let config = client.commands.filter((cmd) => cmd.category === 'config');
        let minecraft = client.commands.filter((cmd) => cmd.category === 'minecraft');
        let info = client.commands.filter((cmd) => cmd.category === 'info');
        let botoes = client.commands.filter((cmd) => cmd.category === 'botoes');
        let acao = client.commands.filter((cmd) => cmd.category === 'gifs');

      const embed = new MessageEmbed()
        .addField(`Desenvolvido por Spray#0007`, `**Prefixo atual: ${prefix}\nMeus Comandos[${client.commands.size}]:\n**`)
        .addField(`<:interrogacao:856894534029541376> **Info** [${info.size}]:`, `\`${info.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:mod:856894534088523776> **Moderação** [${mod.size}]:`, `\`${mod.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:ybs_status:856961057083621377> **Miscelânea** [${miscelanea.size}]:`, `\`${miscelanea.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:ybs_dinheiro:856961057204600833> **Economia** [${economia.size}]:`, `\`${economia.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:ybs_user:856961057314701342> **Manipulação de imagens** [${manipulacao.size}]:`, `\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:config:856894534197313536> **Configuráveis** [${config.size}]:`, `\`${config.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:ybs_users:856961057486667806> **Ação** [${acao.size}]:`, `\`${acao.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`🎵 **Música** [${music.size}]:`, `\`${music.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:funS:856961469680713768> **Diversão** [${fun.size}]:`, `\`${fun.map(cmd => cmd.name).join(' | ')}\``)
        .addField(`<:mine_foguete:852197847754604565> **Minecraft** [${minecraft.size}]:`, `\`${minecraft.map(cmd => cmd.name).join(' | ')}\``)
        //.addFields(categories)
        .setDescription(`Use \`${prefix}help\` seguido por um nome de comando para obter mais informações adicionais sobre um comando.`, `Por exemplo: \`${prefix}help ban\`.`)
        .setFooter(
          `Requisitado por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        //.setImage("https://cdn.discordapp.com/attachments/852652786139136060/853441413396168734/Sem_Titulo22-1.png")
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
          "Aliases/apelidos:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Sem aliases para esse comando."
        )
        .addField(
          "Forma de uso:",
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
