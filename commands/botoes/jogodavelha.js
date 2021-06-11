module.exports = {
    name: "jogodavelha",
    aliases: ["tictactoe"],
    category: "botoes",
    cooldown: 1000 * 2, 
    description: "Jogo da velha!",
    usage: "<name>",

    run : async(client, message, args) => {
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send(`Mencione a pessoa que deseja jogar.`);
        const { TicTacToe } = require('weky')
        const game = new TicTacToe({
            message: message,
            opponent: opponent, //opponent
            xColor: 'red', //x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //the x emoji
            oEmoji: '0️⃣' ,//the zero emoji
        })
        game.start()
    }
}