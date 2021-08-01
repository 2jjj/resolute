const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const { TrackUtils } = require("erela.js");
const {
  format,
  delay,
  swap_pages,
  swap_pages2,
  shuffle
} = require(`../../handlers/functions`);

module.exports = {
  name: `savedqueue`,
  category: `⚜️ Custom Queue(s)`,
  aliases: [`savequeue`, `customqueue`, `savedqueue`],
  description: `Saves the Current Queue onto a Name`,
  usage: `savedqueue <Tipo> <Nome> [Opções]\`\n
**Tipos**: \`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`showdetails\`, \`createsave\`, \`delete\`, \`play\`, \`shuffle\`\n
**Nome**: \`Can be anything with maximum of 10 Letters\`\n
**Opções**: \`pick the track which you want to remove`,
  exaple: "",
  permissoes: [],

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let Type = args[0];
      let Name = args[1];
      let Options = args.slice(2).join(` `);
      if (!Type)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a TYPE`)
          .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name> [Options]\`\nAvailable Types:\n\`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`createsave\`, \`delete\`, \`showdetails\`, \`play\`, \`shuffle\``)
        );
      switch (Type.toLowerCase()) {
        case `create`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue already exists!`)
              .setDescription(`Delete it: \`${prefix}savedqueue delete ${Name}\`\nShow its content: \`${prefix}savedqueue showdetails ${Name}`)
            );
          client.queuesaves.set(message.author.id, {
            "TEMPLATEQUEUEINFORMATION": [`queue`, `sadasd`]
          }, `${Name}`)

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Created ${Name}`)
            .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
          break;
        case `addcurrenttrack`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );

          var player = client.manager.players.get(message.guild.id);

          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );

          const track = player.queue.current;

          if (!track)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing!`)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (!Array.isArray(oldtracks)) oldtracks = [];

          oldtracks.push({
            "title": track.title,
            "url": track.uri
          })

          client.queuesaves.set(message.author.id, oldtracks, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Added ${track.title} onto the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
          break;
        case `addcurrentqueue`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );

          var player = client.manager.players.get(message.guild.id);

          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );

          const tracks = player.queue;

          if (!tracks.length)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | The Queue is Empty!`)
            );

          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (!Array.isArray(oldtracks)) oldtracks = [];
          const newtracks = [];

          for (const track of tracks)
            newtracks.push({
              "title": track.title,
              "url": track.uri
            });

          if (player.queue.current) newtracks.push({
            "title": player.queue.current.title,
            "url": player.queue.current.uri
          });

          let newqueue = oldtracks.concat(newtracks)

          client.queuesaves.set(message.author.id, newqueue, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Added ${tracks.length} Tracks onto the Queue \`${Name}\``)
            .setDescription(`There are now: \`${newqueue.length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
          break;
        case `removetrack`:
        case `removesong`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue removetrack <Name> [Options]\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          if (!Options)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered an Option (the Track you want to remove (ID OF IT))`)
              .setDescription(`See all your Tracks: \`${prefix}savedqueue showdetails ${Name}\`Usage: \`${prefix}savedqueue removetrack ${Name} <Song number>\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let tracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (Number(Options) >= tracks.length || Number(Options) < 0)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | Your provided Option is out of Range (\`0\` - \`${tracks.length - 1}\`)`)
              .setDescription(`See all your Tracks: \`${prefix}savedqueue showdetails ${Name}\`Usage: \`${prefix}savedqueue removetrack ${Name} <Song number>\``)
            )
          let deletetrack = tracks[Number(Options)];

          delete tracks[Number(Options)]

          tracks = tracks.filter(function (entry) {
            return /\S/.test(entry);
          });

          client.queuesaves.set(message.author.id, tracks, `${Name}`)

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Deleted ${deletetrack.title} of the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
          break;
        case `shuffle`:
        case `mix`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (!Array.isArray(oldtracks))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue ${Name} is Empty!`)
              .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            );
          const newtracks = shuffle(oldtracks);

          client.queuesaves.set(message.author.id, newtracks, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Shuffled ${newtracks.length} Tracks of the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
          break;
        case `removedupes`:
        case `removeduplicates`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (!Array.isArray(oldtracks))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue ${Name} is Empty!`)
              .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            );

          let counter = 0;
          const newtracks = [];
          for (let i = 0; i < oldtracks.length; i++) {
            let exists = false;
            for (j = 0; j < newtracks.length; j++) {
              if (oldtracks[i].url === newtracks[j].url) {
                exists = true;
                counter++;
                break;
              }
            }
            if (!exists) {
              newtracks.push(oldtracks[i]);
            }
          }

          client.queuesaves.set(message.author.id, newtracks, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Removed ${counter} Tracks from the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
          break;
        case `showall`:
        case `listall`:
        case `show`:
        case `queue`:
        case `list`: {
          let queues = client.queuesaves.get(message.author.id);
          if (Object.size(queues) <= 1)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You don't have any Queues saved yet`)
              .setDescription(`Create one with: \`${prefix}savedqueue create <SavedQueueName>\``)
            );
          let description = ``;
          for (const item in queues) {
            if (item === `TEMPLATEQUEUEINFORMATION`) continue;
            description += `**❯ ${item}** | \`${queues[item].length} Tracks\`\n`
          }

          return swap_pages(client, message, description, `Your Saved Queues`)
        }
          break;
        case `createsave`:
        case `cs`:
        case `save`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          if (client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue already exists!`)
              .setDescription(`Delete it: \`${prefix}savedqueue delete ${Name}\`\nShow its content: \`${prefix}savedqueue showdetails ${Name}`)
            );

          var player = client.manager.players.get(message.guild.id);

          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );

          const tracks = player.queue;

          if (!tracks.length)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | The Queue is Empty!`)
            );

          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if (!Array.isArray(oldtracks)) oldtracks = [];
          const newtracks = [];

          if (player.queue.current) {
            newtracks.push({
              "title": player.queue.current.title,
              "url": player.queue.current.uri
            });
          }
          for (const track of tracks)
            newtracks.push({
              "title": track.title,
              "url": track.uri
            });

          let newqueue = oldtracks.concat(newtracks)

          client.queuesaves.set(message.author.id, newqueue, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Created ${Name} and Added ${tracks.length} Tracks to it`)
            .setDescription(`Play it with: \`${prefix}savedqueue play ${Name}\`\nAdd the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
          break;
        case `delete`:
        case `remove`:
        case `del`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );

          client.queuesaves.delete(message.author.id, `${Name}`);

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Deleted the Queue \`${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
          break;
        case `play`:
        case `load`:
        case `p`:
        case `add`:
        case `paly`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          const {
            channel
          } = message.member.voice;

          if (!channel)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
            );
          const mechannel = message.guild.me.voice.channel;

          var player = client.manager.players.get(message.guild.id);
          let playercreate = false;
          if (!player) {
            player = client.manager.create({
              guild: message.guild.id,
              voiceChannel: message.member.voice.channel.id,
              textChannel: message.channel.id,
              selfDeafen: config.settings.selfDeaf,
            });
            player.connect();
            player.set("message", message);
            player.set("playerauthor", message.author.id);
            playercreate = true;
          }

          if (player && channel.id !== player.voiceChannel)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
              .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
            );

          if (!player && mechannel) {
            message.guild.me.voice.kick().catch(e => console.log("This prevents a Bug"));
          }

          if (mechannel && channel.id !== mechannel.id)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
              .setDescription(`Channelname: \`🔈 ${mechannel.name}\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists Yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );

          let tempmsg = await message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setAuthor(`Attempting to Load ${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks`, "https://cdn.discordapp.com/emojis/763781458417549352.gif")
            .setDescription(`It might take around about \`${Math.ceil(client.queuesaves.get(message.author.id, `${Name}`).length / 2)} Seconds\``))
          for (const track of client.queuesaves.get(message.author.id, `${Name}`)) {
            try {

              const unresolvedTrack = TrackUtils.buildUnresolved({
                title: track.title,
                url: track.url,
              }, message.author);
              player.queue.add(unresolvedTrack);
            } catch (e) {
              console.log(String(e.stack).red)
              continue;
            }
            let res;

          }

          tempmsg.edit(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Loaded ${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks onto the current Queue`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
          if (playercreate) player.play();
        }
          break;
        case `showdetails`:
        case `showdetail`:
        case `details`: {
          if (!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );

          if (!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );

          const tracks = client.queuesaves.get(message.author.id, `${Name}`);

          let array = [];
          tracks.map((track, index) => array.push(`**${index})** [${track.title.split(`]`).join(`}`).split(`[`).join(`{`).substr(0, 60)}](${track.url})`)).join(`\n`)
          return swap_pages(client, message, array, `Detailed Information about: \`${Name}\` [${tracks.length} Tracks]`)
        }
          break;
        default:
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a **valid** TYPE`)
            .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nValid Types:\n\`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`createsave\`, \`delete\`, \`showdetails\`, \`play\`, \`shuffle\``)
          );
          break;

      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
  }
};
Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};