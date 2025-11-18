const { glob } = require('glob')
const { promisify } = require('util')
const { Client } = require('discord.js')
const globPromise = promisify(glob)
const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const Deezer = require('erela.js-deezer')
const FaceBook = require('erela.js-facebook')

/**
 * @param {Client} client
*/

module.exports = async (client) => {

  //Lavalink/Erela.js
  client.manager = new Manager({
    nodes: client.config.nodes,
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id)
      if (guild) guild.shard.send(payload)
    },
    autoPlay: true,
    plugins: [new Spotify({
      clientID: client.config.SpotifyID,
      clientSecret: client.config.SpotifySecret
    }),
    new Deezer(),
    new FaceBook()
    ]
  })

  //Commands
  const commandFiles = await globPromise(`${process.cwd()}/src/commands/Message/**/*.js`)
  commandFiles.map((value) => {
    const file = require(value)
    const splitted = value.split('/')
    const directory = splitted[splitted.length - 2]

    if (file.name) {
      const properties = { directory, ...file }
      client.commands.set(file.name, properties)
    }
  })

  //Slash handler
  const slashCommands = await globPromise(
		`${process.cwd()}/src/commands/SlashCommands/*/*.js`
  )

  const arrayOfSlashCommands = []
  slashCommands.map((value) => {
    const file = require(value)
    if (!file?.name) return
    client.slashCommands.set(file.name, file)

    if (['MESSAGE', 'USER'].includes(file.type)) delete file.description
    arrayOfSlashCommands.push(file)
  })

  client.on('ready', async () => {
    //Lavalink
    client.manager.init(client.user.id)
    //Slash
    //await client.guilds.cache
      //.get('836725674567663616')
      //.commands.set(arrayOfSlashCommands)
    //Setar global
    await client.application.commands.set(arrayOfSlashCommands).then(console.log(`[SLASH] SETEI OS COMANDOS`));
  })
}
