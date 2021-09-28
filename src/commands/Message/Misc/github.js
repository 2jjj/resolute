const { Discord, discord } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch")

module.exports = {
    name: 'github',
    aliases: ['git'],
    cooldown: 1000 * 2,
    description: 'Obtenha as informações de um github!',
    category: 'misc',
    usage: '<user>',
    example: 'sprayx',
    permissoes: [],
    args: true,
  
    async run (client, message, args) {

        if(!args[0]) return;

        fetch(`https://api.github.com/users/${args.join('-')}`)
        .then(res => res.json()).then(body => {
          if(body.message) return message.reply(`Usuário não encontrado.`);
        let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
    
        const embed = new MessageEmbed()
            .setAuthor(`Informações de ${login}`, avatar_url)
            .setColor(`#2F3136`)
            .setThumbnail(`${avatar_url}`)
            .addField(`Usuário`, ` ${login}`)
            .addField(`ID`, ` ${id}`)
            .addField(`Bio`, ` ${bio || "Sem bio"}`)
            .addField(`Repositórios públicos`, `${public_repos || "None"}`, true)
            .addField(`Seguidores`, ` ${followers}`, true)
            .addField(`Seguindo`, ` ${following}`, true)
            .addField(`Localização`, ` ${location || "Sem localização"}`)
            .addField(`Conta criada em`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))    
        message.reply({ embeds: [embed] });
    })
  }
}