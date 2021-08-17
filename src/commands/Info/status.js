const Discord = require("discord.js")
const os = require('os')
const cpuStat = require("cpu-stat");

module.exports = {
  name: "status",
  aliases: ['cpu', 'info', 'stats'],
  cooldown: 1000 * 2, 
  description: "Status/Info da máquina do resolute.",
  category: "info",
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run (client, message, args) {
          
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
      .setTitle("** Status **")
      .setColor("#RANDOM")
      .addField("<:memoryram:854135087037153280> Memória ultilizada", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
      .addField("<a:SETA:852194614927818812> Uptime ", `${hours}h ${mins}m`, true) //`${duration}`, true)
      .addField("<:djs:868314375751102484> Discord.js", `v${version}`, true)
      .addField("<:node:845780252940959744> Versão do Node", `${process.version}`, true)
      .addField("<:cpu:854137097521987624> CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
      .addField("<:cpuv:854137395254657026> CPU Usada", `\`${percent.toFixed(2)}%\``,true)
      .addField("<:linux:854135555557425163> Arquitetura", `\`${os.arch()}\``,true)
      .addField("<:linux:854135555557425163> OS", `\`\`${os.platform()}\`\``,true)
      message.inlineReply(embedStats)
   })
  }
}