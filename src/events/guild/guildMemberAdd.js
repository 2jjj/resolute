const db = require("quick.db");

module.exports = async (member) => {
    var autorole_resolute = db.get(`autorole_${member.guild.id}`);
    console.log(autorole_resolute)
    member.roles.add(autorole_resolute)
}