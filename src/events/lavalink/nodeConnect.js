module.exports = async (client, node) => {
  setInterval(() => {
    node.send({
		  op: 'ping'
    })
	  }, 45000)
  client.logger.log(`Node "${node.options.identifier}" conectado.`, 'ready')
}
