const cooldowns = {}
const ms = require("ms")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

  const m = await message.channel.send('ping?');
  
  m.edit(`🏓 **| Pong!**\nLatência do Servidor: **${m.createdTimestamp -
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
      client.ws.ping
    )}ms**`
  );
};