//const Dashboard = require("../../../dashboard/dashboard");

module.exports = async(client) => {
  /*
  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }
  Dashboard(client);*/

  const stringlength = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Resolute está online!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Resolute está online!`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
}