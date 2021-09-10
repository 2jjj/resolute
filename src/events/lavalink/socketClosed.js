module.exports = async (client, player, payload) => {

	if (payload.byRemote == true) {
        player.destroy();
    }

    client.logger.log(`Soquete foi fechado porque ${payload.reason} em [${player.guild}]`, "error");

}