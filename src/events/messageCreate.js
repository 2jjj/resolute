const client = require("../../index");
const config = require("../../config.json");
const { logs } = require(`../config/webhooks.json`);
const sourcebin = require('sourcebin_js');
const ee = require(`../config/embed.json`)
const { MessageEmbed } = require(`discord.js`)

client.on("messageCreate", async (message) => {

    //dando fetch nos webhooks
    let channel = client.channels.cache.get(logs.comandos)
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();
    //variavel de argumentos pras logs
    var argumentos

    //prefixo
    const prefix = config.prefix

    //se mencionar o bot`
    if (message.content.startsWith('<')) {
        if (message.content.endsWith('>'))
          if (message.mentions.has(client.user.id)) {
            return message.reply('Olá! meu prefixo atual é `' + prefix + '`, use `' + prefix + 'help` para obter ajuda!')
        }
    }

    //verify
    if ( message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix) ) return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    //se nao tiver o comando
    if (!command) return;
    //rodando
    await command.run(client, message, args, prefix);

    if(command) {
        //sourcebin e args
        if (args.slice(0).join(" ").length > 1000) {
            try {
              const link = await sourcebin.create([{
                name: 'Resolute logs',
                content: args.slice(0).join(" "),
                languageId: 'text'
              }]);
              argumentos = link.url;
            } catch (e) {
              argumentos = `ERROR: ${e}`;
            }
        } else {
            argumentos = args.slice(0).join(" ");
        }

        //Logs
        const embed_logs = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`<:setaaa:860626769089265665> Nova comando executado`)
            .addField('**Servidor**', message.guild.name)
            .addField('**Servidor ID**', message.guild.id)
            .addField('**Executado por**', message.author.tag + ' ( ' + message.author.id + ' )')
            .addField('**Comando**', command.name)
            .setThumbnail(message.author.displayAvatarURL({
                dynamic: true,
                format: "png"
            }))
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp();
        if (argumentos) embed_logs.addField('**Argumentos**', argumentos)
        //enviando
        await webhook.send({ embeds: [embed_logs] });  
        //outras logs no console.log
        console.log(`[MESSAGE] - Comando ${command.name} foi usado pelo ${message.author.username}#${message.author.discriminator} (${message.author.id})`)
    }
})