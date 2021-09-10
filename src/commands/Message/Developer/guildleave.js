const ownerid = "836345581424738354";

module.exports = {
    name: "guildleave",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Sair de uma determinada guild pelo ID",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
    args: true,

    async run(client, message, args) {

        if (message.author.id == ownerid) {            
        var targetGuild = message.content.split(" ")[1];
        if (!targetGuild) return;
        client.guilds.cache.get(targetGuild)
            .leave()
            .then(g => console.log(`[GUILDLEAVE] -> ${g}`))
            .catch(console.error);
        } else {
            return message.channel.send(`Apenas desenvolvedores.`);
        }
    }
} 