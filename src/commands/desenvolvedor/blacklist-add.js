const blacklist = require('../.././database/mongoDB/blacklist')

module.exports = {
    name: "blacklist-add",
    aliases: ['blacklist', 'tchau'],
    cooldown: 1000 * 2,
    description: "Adicionar um usuário na blacklist.",
    category: "dev",
    usage: "",
    example: "",
    permissoes: [],
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