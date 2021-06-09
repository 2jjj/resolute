const { tictactoe } = require('reconlx')

module.exports = {
    name: "jogodavelha",
    aliases: ["tictactoe"],
    category: "outros",
    description: "Jogo da velha!",
    usage: "<name>",

    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Por favor mencione o usuário que deseja jogar!')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}