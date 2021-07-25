const db = require('quick.db');
const Discord = require("discord.js");
const jimp = require("jimp");
const ms = require('parse-ms');
const Canvas = require('canvas');

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Apenas administradores podem utilizar esse comando!`)
    let canalsetado = db.get(`setlogadm_${message.guild.id}`);
    message.channel.send(`Qual o título da embed?`).then(m2 => {
        let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                max: 1
            })
            .on('collect', c => {
                titulo = c.content

                message.channel.send(`Qual a descrição da embed?`).then(m3 => {
                    let cd = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                            max: 1
                        })
                        .on('collect', c => {
                            descrição = c.content

                            message.channel.send(`Qual a thumbnail da embed? \n caso não queira uma thumbnail digite: https://i.imgur.com/ZwLaa1O.png `).then(m3 => {
                                let vr = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                        max: 1
                                    })
                                    .on('collect', c => {
                                        thumb = c.content

                                        message.channel.send(`Qual a imagem debaixo da embed? \n caso não queira uma thumbnail digite: https://i.imgur.com/avmEHuI.png `).then(m3 => {
                                            let vr = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                    max: 1
                                                })
                                                .on('collect', c => {
                                                    imagem = c.content

                                                    message.channel.send(`Qual o footer da embed?`).then(m3 => {
                                                        let dc = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                                max: 1
                                                            })
                                                            .on('collect', c => {
                                                                footer = c.content

                                                                message.channel.send(`Qual a cor da embed?\n 1-Vermelho \n 2-Verde \n 3-Preto \n 4-Aleatório`).then(m3 => {
                                                                    let kv = message.channel.createMessageCollector(x => x.author.id === message.author.id, {
                                                                            max: 1
                                                                        })
                                                                        .on('collect', c => {
                                                                            result = c.content

                                                                            if (result === '1') {
                                                                                let embedir = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`#eb0c0c`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedir)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedir)

                                                                            }

                                                                            if (result === '2') {
                                                                                let embedig = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`GREEN`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedig)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedig)

                                                                            }

                                                                            if (result === '3') {
                                                                                let embedidig = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`GREEN`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embedidig)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embedidig)

                                                                            }

                                                                            if (result === '4') {
                                                                                let embediran = new Discord.MessageEmbed()
                                                                                    .setTitle(`${titulo}`)
                                                                                    .setDescription(`${descrição}`)
                                                                                    .setFooter(`${footer}`)
                                                                                    .setThumbnail(`${thumb}`)
                                                                                    .setImage(`${imagem}`)
                                                                                    .setColor(`RANDOM`)
                                                                                    .setTimestamp()
                                                                                message.channel.send(embediran)
                                                                                client.channels.cache.get(canalsetado).send(`O seguinte embed foi criada!`, embediran)

                                                                            }
                                                                            if (!result) return message.reply(`Você não digitou um número válido inicie o comando de criarembed novamente`)

                                                                        })
                                                                })
                                                            })
                                                    })
                                                })
                                        })
                                    })
                            })
                        })
                })
            })
    })
}