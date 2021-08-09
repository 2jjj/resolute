const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../config/config.json")
const ee = require("../config/embed.json")
const {
  format,
  databasing,
  escapeRegex,
  delay
} = require("../handlers/functions")
const playermanager = require("../handlers/playermanager");

module.exports = async (client, message) => {
  try {
    if (message.author.id === client.user.id) {
      try {
        if (message) message.delete({ timeout: 4000 }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      } catch { /* */ }
    } else {
      try {
        if (message) message.delete({ timeout: 4000 }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
      } catch { /* */ }
    }
    if (message.author.bot) return;

    let db = client.setups.get(message.guild.id)

    const {
      channel
    } = message.member.voice;

    if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));

    const player = client.manager.players.get(message.guild.id);

    if (player && channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("❌ ERROR | I am already playing somewhere else!").setDescription(`You can listen to me in: \`${message.guild.channels.cache.get(player.VoiceChannel).name}\``));

    if (channel.id !== db.voicechannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You need to be in the: \`${message.guild.channels.cache.get(db.voicechannel).name}\` VoiceChannel`));

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`);

    if (!prefixRegex.test(message.content)) {
      return playermanager(client, message, message.content.trim().split(/ +/), "song:youtube");
    }

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`❌ Unkown command, try: **\`${config.prefix}help\`**`)
      .setDescription(`To play Music simply type \`${config.prefix}play <Title / Url>\`\n\nYou can also just type the song name / url into the channel and I'll search for it!`)
    );
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 1) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
          );
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try {
        client.stats.inc(message.guild.id, "commands");
        client.stats.inc("global", "commands");

        command.run(client, message, args, message.member, args.join(" "), config.prefix, player);
      } catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
        )
      }
    }
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}