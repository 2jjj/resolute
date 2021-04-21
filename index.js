const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");

  client.on('ready', () => {
      let activities_list = [
        "spr4y.xyz/resolute",
        `Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`,
      ];
      console.log(`Ligado Com Sucesso em ${client.guilds.cache.size} servidores, ${client.users.cache.size} Usuarios!`);
      setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
          client.user.setActivity(activities_list[index]);
      }, 5000);
  });

  client.on('message', message=> {
    if (message.mentions.has(client.user.id)) {
      message.channel.send(`👾 Olá! ${message.author}\n > Meu prefixo é _**s.**_ \n > Me adicione! **https://top.gg/bot/764919941538775050**`);
  };
  });

client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/fun/${r}.js`).run(client,t,e)}catch(t){console.error("Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/admin/${r}.js`).run(client,t,e)}catch(t){console.error("Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/outros/${r}.js`).run(client,t,e)}catch(t){console.error("Erro:"+t)}});
client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./commands/music/${r}.js`).run(client,t,e)}catch(t){console.error("Erro:"+t)}});

client.login("NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.bPM1dr3Fe2DpZWzxA5HcXEZKlKw");