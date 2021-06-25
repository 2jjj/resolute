const Canvas = require('canvas');
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const ms = require("parse-ms");

module.exports = {
    name: "perfil",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "",
    category: "economia",
    usage: "",

    async run (client, message, args) {
  
        const user = message.mentions.members.last() || message.member;

        let money = await db.fetch(`ienes_${message.guild.id}_${user.id}`)
        if (money === null) money = 0;  
      
        let bank = await db.fetch(`cofre_${message.guild.id}_${user.id}`)
        if (bank === null) bank = 0;
      
        let asas = await db.fetch(`waifus_${message.guild.id}_${user.id}`)
        if(asas === null) asas = '0'
      
        let harpa = await db.fetch(`animes_${message.guild.id}_${user.id}`)
        if(harpa === null) harpa = '0'
      
        let yes = await db.fetch(`gun_${message.guild.id}_${user.id}`)
        if(yes === null) yes = 'Não'
        if(yes === true) yes = 'Sim'
      
        let mana = await db.fetch(`mangas_${message.guild.id}_${user.id}`)
        if(mana === null) mana = '0'
       
        let perfil1 = await db.fetch(`perfil_${message.guild.id}_${user.id}`);
        if (perfil1 === null) perfil1 = 'https://i.imgur.com/eWIkXnP.png'
      
          const canvas = Canvas.createCanvas(850, 500);
          const ctx = canvas.getContext('2d');
          const background = await Canvas.loadImage(perfil1);
      
        
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
          ctx.strokeStyle = '#ff58c3';
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      
      
          //texto
          ctx.font = '30px Arial';
          ctx.fillStyle = 'WHITE';
          ctx.fillText(`${user.user.tag}`, 537, 300);
          ctx.fillText(`________________`, 520, 320)
          ctx.fillText(`Carteira: ${money}`, 520, 360)
          ctx.fillText(`________________`, 520, 380)
          
          ctx.font = '25px Arial';
          ctx.fillStyle = 'WHITE';
          ctx.fillText(`Ienes: ${bank}¥`, 520, 410)
          ctx.fillText(`Coins: ${money}`, 520, 440)

          ctx.font = '22px Arial';
          ctx.fillStyle = 'WHITE';
          ctx.fillText(`Itens Sagrados: ${asas} Waifus, ${harpa} Animes, ${mana} Mangás`, 300, 25)
      
      
          //Arc
          ctx.beginPath();
          ctx.arc(625, 180, 90, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
      
          const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
          ctx.drawImage(avatar, 520, 79, 200, 200);
      
       
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), perfil1);


    message.channel.send(attachment);
  }}