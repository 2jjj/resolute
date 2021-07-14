const blacklist = require('../.././database/mongoDB/blacklist')

module.exports = {
    name: "blacklist",
    aliases: ['blacklist-add'],
    category: "dev",
    description: "",

    async run(client, message, args) {

        if (message.author.id !== '836345581424738354') return message.channel.send('não.')
        const User = message.guild.members.cache.get(args[0])
        if (!User) return message.channel.send('O ID do usuário está inválido.')

        blacklist.findOne({
            id: User.user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.send(`**${User.displayName}** já está na blacklist.`)
            } else {
                data = new blacklist({
                    id: User.user.id
                })
                data.save()
                    .catch(err => console.log(err))
                message.channel.send(`${User.user.tag} foi adicionando na blacklist.`)
            }

        })
    }
}