const Dashboard = require("../../../dashboard/dashboard");

module.exports = async (client) => {
    for (const [id, guild] of client.guilds.cache) {
        await guild.members.fetch();
    }
    Dashboard(client);
}