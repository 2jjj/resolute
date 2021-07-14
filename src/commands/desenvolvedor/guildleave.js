module.exports = {
    name: "guildleave",
    aliases: [],
    category: "dev",
    description: "",

    async run(client, message, args) {
        var targetGuild = message.content.split(" ")[1];
        if (!targetGuild) return;
        if (!message.author.id == "836345581424738354")
            return;

        client.guilds.cache.get(targetGuild)
            .leave()
            .then(g => console.log(`eu sai da ${g}`))
            .catch(console.error);
    }
}