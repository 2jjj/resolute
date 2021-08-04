const {
    MessageEmbed,
    splitMessage
} = require(`discord.js`);

const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const { databasing } = require(`../../handlers/functions`);

module.exports = {
    name: `blacklist`,
    category: `👑 Owner`,
    description: `blacklist Command`,
    usage: `blacklist <user> [reason]`,
    
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) return;

        if (!args[0]) {
            return message.channel.send(new MessageEmbed()
                .setFooter(ee.footertext, ee.footericon)
                .setColor(ee.wrongcolor)
                .setTitle(`${emoji.msg.ERROR}  ERROR | Please add the **TYPE**!`)
                .setDescription(`Useage: \`${prefix}blacklist <user/guild> <Userid/Guildid>\``)
            )
        }

        if (!args[1]) {
            return message.channel.send(new MessageEmbed()
                .setFooter(ee.footertext, ee.footericon)
                .setColor(ee.wrongcolor)
                .setTitle(`${emoji.msg.ERROR}  ERROR | Please add the **ID**!`)
                .setDescription(`Useage: \`${prefix}blacklist <user/guild> <Userid/Guildid>\``)
            )
        }

        databasing(client, args[1], args[1])

        let user, guild;

        if (args[0].toLowerCase() === 'user') {

            try {
                user = await client.users.fetch(args[1]);
                if (!user) return message.channel.send("I couldn't find that user");
            } catch (e) {
                return message.channel.send("I couldn't find that user");
            }

        } else if (args[0].toLowerCase() === 'guild') {

            try {
                guild = client.guilds.cache.get(agrs[1]);
                if (!guild) return message.channel.send("I couldn't find that guild");
            } catch (e) {
                return message.channel.send("I couldn't find that guild");
            }

        } else return message.channel.send("Provide a type corret");

        try {

            if (args[0].toLowerCase() === `user`) {
                client.blacklist.set(args[1], !client.blacklist.get(args[1], `enabled`), `enabled`);
                try {
                    if (client.blacklist.get(args[1], `enabled`)) client.blacklist.push(`blacklist`, {
                        u: args[1]
                    }, `list`);
                    if (!client.blacklist.get(args[1], `enabled`)) client.blacklist.remove(`blacklist`, (value) => value.u === args[1], `list`);
                } catch (e) {
                    console.log(String(e.stack).red);
                }
                user = await client.users.fetch(args[1]);
                if (!user) {
                    try {
                        client.blacklist.remove(`blacklist`, (value) => value.u === args[1], `list`);
                        client.blacklist.set(args[1], false, `enabled`);
                        return message.channel.send(new MessageEmbed()
                            .setFooter(ee.footertext, ee.footericon)
                            .setColor(ee.wrongcolor)
                            .setTitle(`${emoji.msg.ERROR}  ERROR | I cant reach out to that user, sorry!`)
                        )
                    } catch {
                        return message.channel.send(new MessageEmbed()
                            .setFooter(ee.footertext, ee.footericon)
                            .setColor(ee.wrongcolor)
                            .setTitle(`${emoji.msg.ERROR}  ERROR | I cant reach out to that user, sorry!`)
                        )
                    }
                }
                message.channel.send(new MessageEmbed()
                    .setFooter(ee.footertext, ee.footericon)
                    .setColor(client.blacklist.get(args[1], `enabled`) ? ee.color : ee.wrongcolor)
                    .setTitle(`${emoji.msg.SUCCESS}  SUCCESS | **${user.tag}** is now ${client.blacklist.get(args[1], `enabled`) ? `` : `**not**`} in the blacklist!`)
                )
                user.send(new MessageEmbed()
                    .setFooter(ee.footertext, ee.footericon)
                    .setColor(client.blacklist.get(args[1], `enabled`) ? ee.color : ee.wrongcolor)
                    .setTitle(`${client.blacklist.get(args[1], `enabled`) ? `${emoji.msg.SUCCESS}  You is in the blacklist ** ${args[2] ? `reason: ${args.slice(2).join(" ")}` : ' '}**` : `${emoji.msg.ERROR}  You have been removed from my blacklist`}`)
                )
            }

        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
                .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
            );
        }



    },
};