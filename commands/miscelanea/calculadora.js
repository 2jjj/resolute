const {
    Calculator
} = require('weky')

module.exports = {
    name: "calculadora",
    aliases: ['calc'],
    cooldown: 1000 * 2,
    description: "Com este comando você pode usufruir de uma calculadora(com botões)!",
    category: "outros",
    usage: "",
    example: "",

    async run(client, message, args) {
        await Calculator(message)
    }
}