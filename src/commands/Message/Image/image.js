const DIG = require('discord-image-generation')
const Discord = require('discord.js')

module.exports = {
    name: 'imagens',
    aliases: [],
    cooldown: 1000 * 2,
    description: '',
    category: 'manipulacao',
    usage: '@user',
    example: '',
    permissoes: {
        membro: [],
        bot: ['ATTACH_FILES', 'Anexar arquivos']
    },
    args: false,

    async run(client, message, args) {
        if (!message.guild.me.permissions.has(`${Discord.Permissions}.FLAGS.${module.exports.permissoes[0]}`)) return
        
        let images = ['Blur', 'Greyscale', 'Invert', 'Sepia', 'Ad', 'Affect', 'Beautiful',
            'Bobross', 'Delete', 'Facepalm', 'Jail', 'Mms', 'Poutine', 'Rip',
            'Stonk', 'Tatoo', 'Thomas', 'Trash', 'Wanted', 'Circle', 'NotStonk', 'ConfusedStonk',
            'DiscordBlue', 'DiscordBlack', 'Hitler'
        ]
        var sla = 'Blur, Greyscale, Invert, Sepia, Ad, Affect, Beautiful, Bobross, Delete, Facepalm, Jail, Mms, Poutine, Rip, Stonk, Tatoo, Thomas, Trash, Wanted, Circle, NotStonk, ConfusedStonk, DiscordBlue, DiscordBlack, Hitler'

        if (!args[0]) return message.reply(`Opções: \`${sla}\``)
        if (args[0].toLowerCase() === 'view') return message.channel.send(`\`${images.map(image => image).join(', ')}\``);
        let preset = args[0].charAt(0).toUpperCase() + args[0].slice(1);
        if (!images.includes(preset)) return message.reply('Esse preset não existe, tente: ' + sla)

        const m = await message.channel.send('Carregando a imagem...');

        await generateImage(message, preset, m);

        async function generateImage(message, preset, m) {
            let user = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => message.author);
            let avatar = user.displayAvatarURL({
                dynamic: true,
                format: "png"
            }) + "?size=2048";
            let img = await new DIG[preset]().getImage(avatar)
            
            let attach = new Discord.MessageAttachment(img, `${preset}.png`);
            await m.delete();
            message.reply({ files: [attach] });
        }
    }
}