const jimp = require("jimp")

module.exports = {
    name: "cachorro",
    aliases: ["cachorrinho"],
    cooldown: 1000 * 2,
    description: "Cachorrin",
    category: "manipulacao",
    usage: "<texto>",
    example: "auau",
    permissoes: [],
    args: true,
    
    async run(client, message, args) {

        if(!args[0]) return;

        let img = jimp.read("https://pbs.twimg.com/media/DIP-webXgAA6iJQ.jpg")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(font => {
                image.resize(685, 494)
                image.print(font, 20, 30, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({
                        files: [{
                            attachment: i,
                            name: "cachorro.png"
                        }]
                    })
                })
            })
        })
    }
}