const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");

  client.on('ready', () => {
      let activities_list = [
        "",
        "Digite s.help para ajuda!",
        "spr4y.xyz/resolute.html",
        `Estou em ${client.guilds.cache.size} servidores!🔥`,
      ];
      console.log(`Ligado Com Sucesso em ${client.guilds.cache.size} servidores, ${client.users.cache.size} Usuarios!`);
      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
          client.user.setActivity(activities_list[index]);
      }, 5000);
  });


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./admin/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});


client.login("NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.bPM1dr3Fe2DpZWzxA5HcXEZKlKw");