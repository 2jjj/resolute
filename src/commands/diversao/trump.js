const fetch = require('node-fetch');


exports.run = async (client, message, args) => {

  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${image.args.replace("%u", message.author)}`);
        }
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new (require("discord.js")).MessageAttachment(json.message, `trump-${message.author.id}.png`);

            message.quote(message.author, attachment).then(m2 => {
              message.channel.stopTyping()
              message.delete()
            })
        } catch (e) {
            console.log(e.message)
        };
    }