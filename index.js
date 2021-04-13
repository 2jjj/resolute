const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");

  client.on('ready', () => {
      let activities_list = [
        "",
        "Prefixo: s.help",
        "spr4y.xyz/resolute.html",
        `Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`,
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

client.on("message",t=>{if(t.author.bot)return;if("dm"==t.channel.type)return;if(!t.content.toLowerCase().startsWith(config.prefix.toLowerCase()))return;if(t.content.startsWith(`<@!${client.user.id}>`)||t.content.startsWith(`<@${client.user.id}>`))return;const e=t.content.trim().slice(config.prefix.length).split(/ +/g),r=e.shift().toLowerCase();try{require(`./admin/${r}.js`).run(client,t,e)}catch(t){console.error("Erro:"+t)}});

client.login("NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.bPM1dr3Fe2DpZWzxA5HcXEZKlKw");