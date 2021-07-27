module.exports = {
	name: "test",
	aliases: [],
	cooldown: 1000 * 2,
	description: "",
	category: "util",
	usage: "",
	example: "",
	permissoes: [],
    args: false,
	
	async run(client, message, args) {

		for (const [roleID, roleData] of message.guild.roles.cache.sort((a,b) => a.position > b.position ? -1 : 1)){
            console.log(`${roleData.name}`)
        }
	}
}