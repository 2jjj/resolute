const Respostas8Ball = require("./8ball.json")

module.exports = {
    name: "8ball",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Faça um pergunta ao 8ball || Sabedoria infinita!!",
    category: "fun",
    usage: "<Pegunta>",
    example: "8ball eu vou namorar?",

    async run(client, message, args) {

        let respostas = Respostas8Ball[Math.floor(Math.random() * Respostas8Ball.length)]
        let pergunta = args.join(" ")

        if (!pergunta) return;

        setTimeout(function () {
            message.inlineReply(respostas)
        }, 2000)
        return message.inlineReply('Buscando resposta divina...').then(msg => msg.delete({
            timeout: 1900
        }).catch(err => {
            return
        }))

    }
}