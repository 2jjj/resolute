const db = require("quick.db")
require("../../util/images/ata-meme.png")
exports.run = async (client, message, args, idioma) => {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

      const Canvas = require(`canvas`);
      const canvas = Canvas.createCanvas(300, 300);
      const ctx = canvas.getContext(`2d`);
      const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
      
      const img = user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 })
      const background = await Canvas.loadImage(`${__dirname}/../../util/images/ata-meme.png`)
      const avatar = await Canvas.loadImage(img)
      ctx.drawImage(avatar, 100, 0, 200, 250);
      ctx.drawImage(background, 0, 0);
      let raw = canvas.toBuffer()
      const attachment = new (require("discord.js")).MessageAttachment(raw, `ata-${message.author.id}.png`);
      message.quote(message.author, attachment).then(a => {
          message.delete()
          message.channel.stopTyping()
      })
    }