const { Calculator } = require('weky')

module.exports = {
    name: "calculadora",
    aliases: ['calc'],
    cooldown: 1000 * 2, 
    description: "Calculadora",
    category: "outros",
    usage: "<emoji_name>",
  
    async run (client, message, args) {
        await Calculator(message)
    }
}