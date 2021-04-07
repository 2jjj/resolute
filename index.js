const express = require('express');
const app = express();
const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");


app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

  client.on('ready', () => {
      let activities_list = [
        "",
        "Digite s.help para ajuda!",
        "Me adicione > spr4y.xyz/resolute.html",
        "Meu criador é o Spray!",
        `Estou em ${client.guilds.cache.size} servidores!🔥`,
        `Com ${client.users.cache.size} Pessoas! 🔥`
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