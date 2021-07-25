const { createWriteStream } = require("fs");
const ytdl = require("ytdl-core")
const { MessageAttachment } = require("discord.js")

module.exports = {
    name: "ytmp3",
    aliases: ['mp3'],
    cooldown: 1000 * 2,
    description: "Converta um video em mp3!",
    category: "outros",
    usage: "nome/link",
    example: "https://www.youtube.com/watch?v=4TV_128Fz2g",
    permissoes: [],
    args: true,

    run: async (client, message, args) => {

        if(!args[0]) return;

        let url = args.join(" ")

        message.channel.send("O video está sendo convertido, por favor aguarde!")
        ytdl(url, {
                filter: 'audioonly',
                format: 'mp3'
            })
            .pipe(createWriteStream(__dirname + `/dl/seu_audio.mp3`))
            .on('finish', () => {
                let music = new MessageAttachment(__dirname + '/dl/seu_audio.mp3', "seu_audio.mp3");
                message.channel.send(music)

            });
    }
}