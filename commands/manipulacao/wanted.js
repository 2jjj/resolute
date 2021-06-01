const Discord = require("discord.js");
const Jimp = require("jimp");
const db = require("quick.db");

module.exports = {
    name: "wanted",
    aliases: ["procurado"],
    cooldown: 1000 * 2, 
    description: "dev",
    category: "manipulacao",
  
    async run (client, message, args) {
    
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply("<:check_no:844591218545524788> Mencione um usuário válido.");
    }

    message.channel.startTyping();

    let i1 = Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }));
    let i2 = Jimp.read("https://cdn.discordapp.com/attachments/469606974548344853/501026267798175756/aranuyr.png");

    Promise.all([i1, i2]).then((images) =>
    {
        images[0].resize(450, 442).quality(100);
        images[1].composite(images[0], 140, 354).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Most Wanted)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.reply(new Discord.MessageAttachment(buffer, "wanted.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
}}