module.exports = {
    name: "jogodavelha",
    aliases: ["tictactoe"],
    category: "botoes",
    cooldown: 1000 * 2,
    description: "Jogo da velha!",
    usage: "@user",
    example: "@Spray#0007",

    async run(client, message, args) {
        const opponent = message.mentions.users.first();
        if (!opponent) return;
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