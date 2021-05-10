var figlet = require('figlet');

exports.run = async (client, message, args) => {
const ascii = args.join(" "); 

if(!ascii) { 
  message.reply('<:info:835206734225473546> » Por favor, diga uma palavra de, no máximo, 18 palavras.')
  
} else {
if(ascii.length >= 18) {
  message.reply('<:info:835206734225473546> » Limite de 18 palavras atingido.')
} else {
figlet(ascii, function(err, data) {
   if (err) {
       console.dir(err);
       return;
   }
   message.channel.send('fix\n' + data + '')
});
}}}

exports.help = {
  name: 'ascii',
  aliases: ["ascii"]
}