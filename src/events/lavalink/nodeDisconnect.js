module.exports = async (client, node, reason) => {

	client.logger.log(`Node "${node.options.identifier}" desconectado pelo motivo: ${reason}.`, "warn");

}