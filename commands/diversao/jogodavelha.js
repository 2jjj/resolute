module.exports = {
    name: "jogodavelha",
    aliases: ["tictactoe"],
    category: "fun",
    cooldown: 1000 * 2,
    description: "O famoso jogo da velha e com botões, nada melhor doque você se divertir com seus amigos!",
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