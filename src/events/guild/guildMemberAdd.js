const db = require("quick.db")

module.exports = async (member) => {
    let autorole_resolute = db.get(`autorole_${member.guild.id}`);
    if (!autorole_resolute === null) return;
    member.roles.add(autorole_resolute)
}