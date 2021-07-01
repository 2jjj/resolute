const {
    Calculator
} = require('weky')

module.exports = {
    name: "calculadora",
    aliases: ['calc'],
    cooldown: 1000 * 2,
    description: "Calculadora",
    category: "botoes",
    usage: "",
    example: "",

    async run(client, message, args) {
        await Calculator(message)
    }
}