const {
    MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const {
    KSoftClient
} = require(`@ksoft/api`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const lyricsFinder = require(`lyrics-finder`);
const {
    format,
    delay,
    swap_pages
} = require(`../../handlers/functions`);
module.exports = {
    name: `lyrics`,
    category: `🎶 Music`,
    aliases: [`songlyrics`, `ly`, `tracklyrics`],
    description: `Shows The Lyrics of the current track`,
    usage: `lyrics [Songtitle]`,
    cooldown: 15,
    parameters: {
        "type": "music",
        "activeplayer": true,
        "previoussong": false
    },
    run: async (client, message, args, cmduser, text, prefix, player) => {
        try {

            let title = player.queue.current.title;

            let author = player.queue.current.author;

            if (args[0]) {

                title = args.join(` `);

                message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`Searching lyrics for: ${emoji.msg.search} \`${title}\``.substr(0, 256))
                )
            }

            let lyrics = null;

            if (config.lyricssettings.lyrics_finder) {

                if (config.lyricssettings.ksoft_api.use_this_instead) {

                    const ksoft = new KSoftClient(config.lyricssettings.ksoft_api.api_key);

                    await ksoft.lyrics.get(title).then(async (track) => {

                        if (!track.lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.ERROR} Error | No Lyrics found for:`)
                            );

                        lyrics = track.lyrics;
                    });

                } else {
                    try {

                        lyrics = await lyricsFinder(title, author ? author : ``);

                        if (!lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.ERROR} Error | No Lyrics found for:`)
                            );

                    } catch (e) {

                        console.log(String(e.stack).yellow);
                        return message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`${emoji.msg.ERROR} Error | No Lyrics found for:`)
                        );
                    }
                }
            }

            return swap_pages(client, message, lyrics, `Lyrics for: ${emoji.msg.lyrics} \`${title}\``.substr(0, 256))

        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
            );
        }
    }
};