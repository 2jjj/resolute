module.exports = {
  name: "lembrete",
  category: "premium",
  aliases: ["lembrar"],
  description: "lembrar de alguma coisa.",
  
  run: async(client, message, args) => {
    var time = args[0];
    var mensagem = args.splice(1).join(' ');

    if (!time) return message.reply('Insira um tempo.');
    if (!mensagem) return message.reply('Insira a mensagem para eu te lembrar.');

    time = await time.toString();

    if (time.indexOf('s') !== -1) { // Segundos
        var timesec = await time.replace(/s.*/, '');
        var timems = await timesec * 1000;
    } else if (time.indexOf('m') !== -1) { // Minutos
        var timemin = await time.replace(/m.*/, '');
        timems = await timemin * 60 * 1000;
    } else if (time.indexOf('h') !== -1) { // Horas
        var timehour = await time.replace(/h.*/, '');
        timems = await timehour * 60 * 60 * 1000;
    } else if (time.indexOf('d') !== -1) { // Dias
        var timeday = await time.replace(/d.*/, '');
        timems = await timeday * 60 * 60 * 24 * 1000;
    }    else {
        return message.reply('Insira o tempo desejado! `[s/m/h/d]`');
    }

    message.channel.send(`<@${message.author.id}> você será lembrado por \`${mensagem}\` daqui a \`${time}\` `);

    setTimeout(function () {
        message.member.send(`**LEMBRETEEEEEE. <@${message.author.id}>, você me pediu para te avisar sobre** \`${mensagem}\` `);
    }, parseInt(timems));

}
  }