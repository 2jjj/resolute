const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

let numero = Math.ceil(Math.random() * 100) //Aleatórizando um número 1 a 100, você pode trocar, só trocar o 100 pelo número quê quiser, nome da função, Math.ceil

message.channel.send(`⇝ ` + numero) //Agora vamos puxar o número aleatório, e mandar no canal onde foi executado o comando

//Comando simples, pra quem quiser pegar uma base, de como fazer um número cair aleatoriamente, boa sorte! <3
}