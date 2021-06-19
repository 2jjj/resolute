module.exports = {
    name: "guildleave",
    aliases: [],
    category: "dev",
    description: "Apenas para devs.",
    usage: "Este comando só pode ser ultilizado por desenvolvedores do Resolute.",
    
    async run (client, message, args) {
        var targetGuild = message.content.split(" ")[1];
        if (!targetGuild) 
            return message.reply("Você precisa colocar o id da guild");
        
        if (!message.author.id == "836345581424738354") 
            return;
        
        client.guilds.cache.get(targetGuild) 
            .leave() 
            .then(g => console.log(`eu sai da ${g}`)) 
            .catch(console.error);
    }}