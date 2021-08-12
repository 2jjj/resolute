const Discord = require("discord.js");
const moment = require('moment')

module.exports = {
  name: "serverinfo",
  aliases: ['serverinformation'],
  cooldown: 1000 * 2,
  description: "Obtenha informações de seu servidor",
  category: "util",
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run(client, message, args) {

    let boost =
      message.guild.premiumSubscriptionCount === 0 ?
      "Nenhum Boost" :
      `${message.guild.premiumSubscriptionCount} Boost(s) ( Level Server: ${message.guild.premiumTier} )`;

    let channels = [
      `Categoria: ${
          message.guild.channels.cache.filter((x) => x.type == "category").size
        }`,
      `Texto: ${
          message.guild.channels.cache.filter((x) => x.type == "text").size
        }`,
      `Voz: ${
          message.guild.channels.cache.filter((x) => x.type == "voice").size
        }`,
    ].join("\n");

    const serverinfo = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({
        dynamic: true
      }))
      .addFields({
        name: "<:IDDD:875166854325342268> ID do Servidor:",
        value: message.guild.id,
        inline: true
      },/* {
        name: "<:coroa:856527751816937482> Propietário:",
        value: `${await message.guild.fetchOwner().username}#${await message.guild.fetchOwner().discriminator}`,
        inline: true,
      }, {
        name: "<:dataadsa:875167603415478325> Data de Criação:",
        value: `${moment(message.guild.createdAt).format("L")} ( ${moment(
              message.guild.createdAt
            )
              .startOf("day")
              .fromNow()} )`,
      }, {
        name: "<:dataadsa:875167603415478325> Data da minha Entrada:",
        value: `${moment(
              message.guild.member(client.user.id).joinedAt
            ).format("L")} ( ${moment(
              message.guild.member(client.user.id).joinedAt
            )
              .startOf("day")
              .fromNow()} )`,
        inline: true,
      },*/ {
        name: "<:NitroBoost:869959413379792896> Boosters",
        value: boost
      }, {
        name: "<:users:869960470986113085> Total de Usuários:",
        value: message.guild.memberCount.toLocaleString(),
        inline: true,
      }, {
        name: "🤖 Bots:",
        value: message.guild.members.cache
          .filter((x) => x.user.bot)
          .size.toLocaleString(),
        inline: true,
      }, {
        name: `<:5702blurpletextchannel:856520145042931722> Total de Canais: ( **${message.guild.channels.cache.size}** )`,
        value: channels,
      })
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))
      .setFooter(`Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }));

    message.reply({ embeds: [serverinfo] });
  }
}