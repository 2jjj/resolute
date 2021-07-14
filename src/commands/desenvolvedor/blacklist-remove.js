const blacklist = require('../.././database/mongoDB/blacklist')

module.exports = {
    name: "blacklist-remove",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Adicionar um usário na blacklist do Resolute.",
    category: "dev",
    usage: "",
    example: "",
    args: true,

    async run(client, message, args) {

        if (message.author.id !== '836345581424738354') return message.channel.send('não.')
        const User = message.guild.members.cache.get(args[0])
        if (!User) return;

        blacklist.findOne({
            id: User.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await blacklist.findOneAndDelete({
                        id: User.user.id
                    })
                    .catch(err => console.log(err))
                message.channel.send(`**${User.displayName}** Foi removido da blacklist!`)
            } else {
                message.channel.send(`**${User.displayName}** não está na blacklist.`)
            }

        })
    }
}