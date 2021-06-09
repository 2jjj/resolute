const Discord = require("discord.js")
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 
const db = require("quick.db");

module.exports = {
  name: "status",
  aliases: ['cpu', 'info'],
  cooldown: 1000 * 2, 
  description: "Status/Info da máquina do resolute.",
  category: "info",
  usage: "",

  async run (client, message, args) {
          
            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "s." }

           let { version } = require("discord.js");
    
           cpuStat.usagePercent(function(err, percent, seconds) {
             if (err) {
               return console.log(err);
             }
            
            let secs = Math.floor(client.uptime % 60);
            let days = Math.floor((client.uptime % 31536000) / 86400);
            let hours = Math.floor((client.uptime / 3600) % 24);
            let mins = Math.floor((client.uptime / 60) % 60);
    
             //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
             let embedStats = new Discord.MessageEmbed()
            .setTitle("*** Status ***")
            .setColor("#00ff00")
            .addField("<a:SETA:852194614927818812> Memória ultilizada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("<a:SETA:852194614927818812> Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
            .addField("<a:SETA:852194614927818812> Discord.js", `v${version}`, true)
            .addField("<a:SETA:852194614927818812> Versão do Node", `${process.version}`, true)
            .addField("<a:SETA:852194614927818812> CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("<a:SETA:852194614927818812> CPU Usada", `\`${percent.toFixed(2)}%\``,true)
            .addField("<a:SETA:852194614927818812> Arquitetura", `\`${os.arch()}\``,true)
            .addField("<a:SETA:852194614927818812> OS", `\`\`${os.platform()}\`\``,true)
            .setFooter("Status")
            message.channel.send(embedStats)
            })
          }
        }