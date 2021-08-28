const glob = require("glob");

module.exports = {
    name: "reload",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Reiniciar um comando",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {

        if (message.author.id !== '836345581424738354') return message.channel.send('Apenas desenvolvedores.')

        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);
                if (pull.name) {
                    console.log(`[RELOAD] -> ${pull.name} (cmd)`);
                    client.commands.set(pull.name, pull);
                }
                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name);
                    });
                }
            });
        });
        message.channel.send('Todos os comandos foram reinicializados com sucesso!')
    },
}