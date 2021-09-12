const fs = require('fs')
const ascii = require('ascii-table')
const table = new ascii('Events')
table.setHeading('Events', 'Load status')
const allevents = []
module.exports = async (client) => {
  try {
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./src/events/${dir}`).filter((file) => file.endsWith('.js'))
      for (const file of event_files) {
        const event = require(`../events/${dir}/${file}`)
        const eventName = file.split('.')[0]
        allevents.push(eventName)
        client.on(eventName, event.bind(null, client))
      }
    }
    await ['client', 'guild'].forEach(e => load_dir(e))
    for (let i = 0; i < allevents.length; i++) {
      try {
        table.addRow(allevents[i], 'Ready')
      } catch (e) {
        console.log(String(e.stack).red)
      }
    }
    console.log(table.toString().cyan)
    try {
      const stringlength2 = 69
      console.log('\n')
      console.log('     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.bold.green)
      console.log('     ┃ '.bold.green + ' '.repeat(-1 + stringlength2 - ' ┃ '.length) + '┃'.bold.green)
      console.log('     ┃ '.bold.green + 'O Resolute está online'.bold.green + ' '.repeat(-1 + stringlength2 - ' ┃ '.length - 'Logando no bot........'.length) + '┃'.bold.green)
      console.log('     ┃ '.bold.green + ' '.repeat(-1 + stringlength2 - ' ┃ '.length) + '┃'.bold.green)
      console.log('     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'.bold.green)
    } catch { /* */ }
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
