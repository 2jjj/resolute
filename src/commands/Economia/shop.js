const Discord = require("discord.js");
const {
    MessageMenuOption,
    MessageMenu
} = require("discord-buttons")
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
            .setLabel("Batata")
            .setValue("Batata")
            .setDescription("Compre uma batata para se alimentar") 
            .setDefault()
            .setEmoji("877167710419689492")
        let option2 = new MessageMenuOption()
            .setLabel("Livro")
            .setValue("Livro")
            .setDescription("Consiga um livro para a sua coleção!")
            .setDefault()
            .setEmoji("850193163679301642")
        let option3 = new MessageMenuOption()
            .setLabel("Pão")
            .setValue("Pão")
            .setDescription("Consiga um pão")
            .setDefault()
            .setEmoji("877167710470033428")
        let option4 = new MessageMenuOption()
            .setLabel("Foguete")
            .setValue("Foguete")
            .setDescription("Compre um Foguete")
            .setDefault()
            .setEmoji("852197847754604565")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Selecione um item!")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option4)
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Shopping - Resolute")
            .addField(`Batata`, `Compre uma Batata para se alimentar!\n Preço: 10 Coins`, true)
            .addField(`Livro`, `Consiga um livro para a sua coleção!\n Preço: 50 Coins`, true)
            .addField(`Pão`, `Consiga um pão\n Preço: 4 Coins`, true)
            .addField(`Foguete`, `Consiga um foguete\n Preço: 2k`, true)
        //.addField(`Carro`, `Consiga um carro\n Preço: 15000k`, true)
        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch (menu.values[0]) {
                case "Batata":
                    if (dinheiro < 100) {
                        menu.reply.send("Você não possui dinheiro para adquirir a batata!", true)
                    } else {
                        db.push(`${user.id}`, 'Batatas')
                        db.subtract(`money_${user.id}`, 10)
                        menu.reply.send("Você adquiriu a sua batata com sucesso!", true)
                    }
                    break;
                case "Livro":
                    if (dinheiro < 200) {
                        menu.reply.send("Você não possui dinheiro para adquirir o livro!", true)
                    } else {
                        db.push(`${user.id}`, `Livros`)
                        db.subtract(`money_${user.id}`, 50)
                        menu.reply.send("Você adquiriu o seu livro com sucesso!", true)
                    }
                    break;
                case "Pão":
                    if (dinheiro < 10) {
                        menu.reply.send("Você não possui dinheiro para adquirir o pão!", true)
                    } else {
                        db.push(`${user.id}`, `Pães`)
                        db.push(`badges_${user.id}`, `<:9415_Minecraft_bread:877167710470033428>`)
                        db.subtract(`money_${user.id}`, 10)
                        menu.reply.send("Você adquiriu o seu pão com sucesso!", true)
                    }
                    break;
                case "Foguete":
                    if (dinheiro < 2000) {
                        menu.reply.send("Você não possui dinheiro para adquirir o foguete!", true)
                    } else {
                        db.push(`${user.id}`, `Foguetes`)
                        db.push(`badges_${user.id}`, `<:mine_foguete:852197847754604565>`)
                        db.subtract(`money_${user.id}`, 2000)
                        menu.reply.send("Você adquiriu o seu foguete com sucesso!", true)
                    }
            }
        }

        client.on("clickMenu", (menu) => {
            if (menu.message.id == menumsg.id) {
                if (menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: Apenas o usuário que executou o comando pode adquirir algo!", true)
            }
        })
    }
}