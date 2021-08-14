const Discord = require("discord.js");
const ee = require("../../config/embed.json")

module.exports = class ClientEmbed extends ( Discord.MessageEmbed ) {
  constructor(user, data = {}) {
    super(data);
    this.setTimestamp();
    this.setColor(ee.color);
    this.setFooter(
      `Requisitado por ${user.tag}`,
      user.displayAvatarURL({ dynamic: true })
    );
  }
};