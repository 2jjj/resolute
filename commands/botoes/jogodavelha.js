module.exports = {
    name: "jogodavelha",
    aliases: ["tictactoe"],
    category: "botoes",
    cooldown: 1000 * 2,
    description: "Jogo da velha!",
    usage: "<name>",

    async run(client, message, args) {
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send(`Mencione a pessoa que deseja jogar.`);
        const {
            TicTacToe
        } = require('weky')
        const game = new TicTacToe({
            message: message,
            opponent: opponent,
            xColor: 'red',
            oColor: 'blurple',
            xEmoji: '❌',
            oEmoji: '0️⃣',
        })
        game.start()
    }
}