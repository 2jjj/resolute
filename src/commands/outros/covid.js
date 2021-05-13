const Discord = require("discord.js")
const api = require("novelcovid")
module.exports.run = async(client,message,args)=> {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    let arg = args.slice(0).join(" ")

    if(!arg) return message.reply("Você precisa colocar o pais.")

    if(arg == "world"){
        const stayhome = api.all().then(response => {

        let covid = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("#StayHome")
        .addField("<:info:835206734225473546> » Total de casos",response.cases,true)
        .addField("<:info:835206734225473546> » Total de R.I.P",response.deaths,true)
        .addField("<:info:835206734225473546> » Total de curados",response.recovered,true)
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
        .addField("<:info:835206734225473546> » Total de casos",response.cases,true)
        .addField("<:info:835206734225473546> » Total de R.I.P...",response.deaths,true)
        .addField("<:info:835206734225473546> » Total de curados",response.recovered,true)
        .setImage("https://www.adexchanger.com/wp-content/uploads/2020/04/appsfightCOVID_WHO.gif")
        .setThumbnail("https://i.pinimg.com/originals/a8/d8/66/a8d866c87e75ae65af8a3f167ee1e8f6.gif")
        message.channel.send(covid)
        })
    }catch(e){
message.channel.send(e)
    }
}}

