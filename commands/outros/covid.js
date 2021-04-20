const Discord = require("discord.js")
const api = require("novelcovid")
module.exports.run = async(client,message,args)=> {

    let arg = args.slice(0).join(" ")

    if(!arg) return message.reply("Você precisa colocar o pais.")

    if(arg == "world"){
        const stayhome = api.all().then(response => {

        let covid = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("#StayHome")
        .addField("Total de casos",response.cases,true)
        .addField("Total de m0rt3s",response.deaths,true)
        .addField("Total de curados",response.recovered,true)
        .setImage("https://www.adexchanger.com/wp-content/uploads/2020/04/appsfightCOVID_WHO.gif")
        .setThumbnail("https://i.pinimg.com/originals/a8/d8/66/a8d866c87e75ae65af8a3f167ee1e8f6.gif")

        message.channel.send(covid)
        })
    }else{

        try {
        const stayhome2 = api.countries({country:arg}).then(response => {
            
        let covid = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("#FiqueEmCasa")
        .addField("Total de casos",response.cases,true)
        .addField("Total de m0rt3s",response.deaths,true)
        .addField("Total de curados",response.recovered,true)
        .setImage("https://www.adexchanger.com/wp-content/uploads/2020/04/appsfightCOVID_WHO.gif")
        .setThumbnail("https://i.pinimg.com/originals/a8/d8/66/a8d866c87e75ae65af8a3f167ee1e8f6.gif")
        message.channel.send(covid)
        })
    }catch(e){
message.channel.send(e)
    }
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["cv"]
}

exports.help = {
    name:"corona",
    description:"#StayHome",
    usage:"corona world / corona country",
    category:"general"
}