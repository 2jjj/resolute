module.exports = client => {
  /*
  const promises = [client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
  ];
  Promise.all(promises)
    .then(async results => {
      const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
      const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

      const status = [{
          name: `resolutebot.xyz | s.help`,
          type: 'PLAYING'
        },
        {
          name: `resolutebot.xyz | Lavalink Online | s.play`,
          type: 'PLAYING'
        },
      ]

      function Presence() {
        const base = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(base)
      }
      Presence();
      setInterval(() => Presence(), 5000)
    })*/
  const stringlength = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Resolute está online!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Resolute está online!`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
}