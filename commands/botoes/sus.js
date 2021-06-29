const {
    MessageButton
} = require('discord-buttons');

module.exports = {
    name: "sus",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Sus!! AmongUS",
    category: "botoes",
    usage: "",

    async run(client, message, args) {

        const butn = new MessageButton()
            .setLabel(`SUS!?`)
            .setStyle('gray')
            .setID('amogus');

        let msg = await message.channel.send(`Sus`, {
            button: butn,
        });

        client.on('clickButton', async (button) => {
            if (button.id === 'amogus') {
                await button.reply.send(`SUS! THE IMPOSTER IS SUS!!!`)
            }
        });
    },
};