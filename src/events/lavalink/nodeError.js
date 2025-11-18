module.exports = async (client, node, error) => {
  client.logger.log(`Node "${node.options.identifier}" teve um erro: ${error.message}.`, 'error')
}