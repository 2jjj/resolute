const Discord = require('discord.js')
const client = new Discord.Client();
const myID = '798574984582791208' //replace IDHERE with your user ID
var lockedList = ['464830342164119552', '415904152108007424']; //replace the userID stuff here with the ID's of the users you want to blacklist


exports.run = (client,message,args) => {
    clietn.on('message', message => {

        let args = message.content.substring(PREFIX.length).split(' ');
    
        switch(args[0]){
    
            case 'report':
                message.delete(3000);
                let target = message.mentions.members.first() || message.guild.members.get(args[0]);
                if(!target) return message.channel.send('Please provide a user that you wish to report').then(m => m.delete(15000));
                
                let reason = args.slice(1).join(" ");
                if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.user.username}**`).then(m => m.delete(15000));
     
                let reportChannel = message.guild.channels.cache.find(x => x.name === "📒▸logs");
                
                message.channel.send('Your report has been filed to the staff team. Thank you for reporting!').then(m => m.delete(15000));
                reportChannel.send(`**${message.author.username}** has reported **${target.user.username}** for **${reason}**.`);
            break;
        };
    });
};
