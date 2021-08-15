const Discord = require("discord.js");
const { MessageMenuOption,  MessageMenu } = require("discord-buttons")
const db = require("quick.db")

module.exports = {
    name: "shop",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Veja o shop com os itens disponiveis!",
    category: "economia",
    usage: "",
    example: "",
    permissoes: [],
    args: false,

    async run(client, message, args) {
        const user = message.member
        var dinheiro = db.fetch(`money_${user.id}`)

        let option1 = new MessageMenuOption()
            .setLabel("Peixe")
            .setValue("Peixe")
            .setDescription("Compre um peixe para se alimentar!")
            .setDefault()
            .setEmoji("😁")

        let option2 = new MessageMenuOption()
            .setLabel("Livro")
            .setValue("Livro")
            .setDescription("Consiga um livro para a sua coleção!")
            .setDefault()
            .setEmoji("🚙")
        let option3 = new MessageMenuOption()
            .setLabel("Carro")
            .setValue("Carro")
            .setDescription("Consiga um carro")
            .setDefault()
            .setEmoji("🚙")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Selecione um item!")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Shopping - Resolute")
            .addField(`Peixe`, `Peixe\n Preço: 15000k`, true)
            .addField(`Livro`, `livro\n Preço: 2000k`, true)
            .addField(`Carro`, `ad\n Preço: 15000k`, true)
        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch (menu.values[0]) {
                case "Peixe":
                    if(dinheiro < 100) {
                        menu.reply.send("Você não possui dinheiro para adquirir o peixe!", true)
                    } else {
                        db.push(`${user.id}`, `Peixe`)
                        db.subtract(`money_${user.id}`, 100)
                        menu.reply.send("Você adquiriu o seu peixe com sucesso!", true)
                    }
                    break;
                case "Livro":
                    menu.reply.send("Você adquiriu o seu livro com sucesso!", true)
                    break;
                case "Carro":
                    menu.reply.send("Você adquiriu o seu carro com sucesso!", true)
                    break;
            }
        }

        client.on("clickMenu", (menu) => {
            if (menu.message.id == menumsg.id) {
                if (menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    }
}