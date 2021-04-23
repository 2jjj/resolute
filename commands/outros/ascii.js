var figlet = require('figlet');

exports.run = async (client, message, args) => {
const ascii = args.join(" "); //pegar os argumentos

if(!ascii) { //se não colocar ascii
  message.reply('por favor, diga uma palavra de, no máximo, 18 palavras :|')
  
} else {
if(ascii.length >= 18) {
  message.reply('limite de 18 palavras atingido!')
} else {
figlet(ascii, function(err, data) { //coração
   if (err) {
       console.dir(err);
       return;
   }
   message.channel.send('fix\n' + data + '')
});
}
}
}