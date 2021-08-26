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
            .setLabel("Varinha")
            .setValue("Varinha")
            .setDescription("Consiga uma varinha para pescar") 
            .setDefault()
            .setEmoji("877167710419689492")
        let option2 = new MessageMenuOption()
            .setLabel("Isca")
            .setValue("Isca")
            .setDescription("Consiga uma isca para pescar")
            .setDefault()
            .setEmoji("850193163679301642")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Selecione um item!")
            .addOption(option1)
            .addOption(option2)
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Shopping - Resolute")
            .addField(`iscas`, `Compre uma isca para peixar!\n Preço: 10 Coins`, true)
            .addField(`Varinha`, `Consiga uma varinha para pescar!\n Preço: 100 Coins`, true)
        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch (menu.values[0]) {
                case "Varinha":
                    if (dinheiro < 100) {
                        menu.reply.send("Você não possui dinheiro para adquirir a varinha!", true)
                    } else {
                        db.add(`varinhas_${user.id}`, 1)
                        db.push(`badges_${user.id}`, `<:7005_MCbakedpotato:877167710419689492>`)
                        db.subtract(`money_${user.id}`, 10)
                        menu.reply.send("Você adquiriu a sua varinha com sucesso!", true)
                    }
                    break;
                case "Isca":
                    if (dinheiro < 10) {
                        menu.reply.send("Você não possui dinheiro para adquirir a Isca!", true)
                    } else {
                        db.add(`iscas_${user.id}`, 1)
                        db.push(`badges_${user.id}`, `<:livro:850193163679301642>`)
                        db.subtract(`money_${user.id}`, 10)
                        menu.reply.send("Você adquiriu a sua isca com sucesso!", true)
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