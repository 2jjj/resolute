module.exports = async (client, player, payload) => {
  if (payload.byRemote == true) {
    player.destroy()
  }
}