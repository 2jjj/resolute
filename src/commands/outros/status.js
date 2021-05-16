const Discord = require("discord.js")
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 
const db = require("quick.db");


exports.run = async (bot, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

           let { version } = require("discord.js");
    
           cpuStat.usagePercent(function(err, percent, seconds) {
             if (err) {
               return console.log(err);
             }
            
            let secs = Math.floor(bot.uptime % 60);
            let days = Math.floor((bot.uptime % 31536000) / 86400);
            let hours = Math.floor((bot.uptime / 3600) % 24);
            let mins = Math.floor((bot.uptime / 60) % 60);
    
             //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
             let embedStats = new Discord.MessageEmbed()
            .setTitle("*** Status ***")
            .setColor("#00ff00")
            .addField("<:setaazul:843588568605523969> Memória ultilizada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("<:setaazul:843588568605523969> Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
            .addField("<:setaazul:843588568605523969> Discord.js", `v${version}`, true)
           // .addField("• Node", `${process.version}`, true)
            .addField("<:setaazul:843588568605523969> CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("<:setaazul:843588568605523969> CPU Usada", `\`${percent.toFixed(2)}%\``,true)
            .addField("<:setaazul:843588568605523969> Arquitetura", `\`${os.arch()}\``,true)
            .addField("<:setaazul:843588568605523969> Plataforma", `\`\`${os.platform()}\`\``,true)
            .setFooter("Status")
            message.channel.send(embedStats)
            })
          }
              
