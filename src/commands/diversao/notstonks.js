const Canvas = require('canvas');
const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]);

if(!pessoa){
pessoa = message.author
}
    const wallpaper = await Canvas.loadImage('https://cdn.discordapp.com/attachments/819648612594090023/822540141351927828/not-stonks.jpg');
    const avatar = await Canvas.loadImage(pessoa.avatarURL({dynamic: false, format: 'png'}));
    const canva = Canvas.createCanvas(wallpaper.width, wallpaper.height);
    const ctx = canva.getContext('2d');
    ctx.drawImage(wallpaper, 0, 0, canva.width, canva.height);
    ctx.drawImage(avatar, 200, 30, 200, 200);
    const attach = new Discord.MessageAttachment(canva.toBuffer(), 'teste.png');
    message.channel.send(attach);

    
}