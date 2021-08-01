const {
    MessageEmbed
} = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const {
    inspect
} = require(`util`);
module.exports = {
    name: `guilds`,
    category: `👑 Owner`,
    description: `guilds Command`,
    usage: `guilds`,
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) return;

        try {
            const guilds = client.guilds.cache.array()
            const generateEmbed = start => {
                const current = guilds.slice(start, start + 10)
                const embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(`Servers ${start + 1}-${start + current.length} in ${guilds.length}`)
                current.forEach(g => embed.addField(g.name, ` \`\`\`Server ID - ${g.id}\n${g.owner.user.tag ? `Owner Tag- ${g.owner.user.tag}\nOwner id - ${g.owner.user.id}\nMembers - ${g.memberCount}` : 'Bug owner or does not exist'}\`\`\` `))
                return embed
            }

            const author = message.author
            message.channel.send(generateEmbed(0)).then(async message => {
                if (guilds.length <= 10) return
                await message.react('➡️')
                const collector = message.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                    { time: 120000 }
                )

                let currentIndex = 0
                collector.on('collect', reaction => {
                    message.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
                        message.edit(generateEmbed(currentIndex))
                        if (currentIndex !== 0) await message.react('⬅️')
                        if (currentIndex + 10 < guilds.length) message.react('➡️')
                    })
                })
            })
        } catch (e) {
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
                .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
            );
        }
    },
};