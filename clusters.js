var cluster = require('cluster');
require("colors");

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log(`[LOGS] - [CLUSTER]-[CONFIGURAÇÃO] - Master cluster está configurando ${numWorkers} workers...`.rainbow);

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log(worker.id)
        require("./shard");
        console.log(`[LOGS] - [CLUSTER] Worker ${worker.process.pid} está online.`.rainbow);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log(`[LOGS] - [CLUSTER] Worker  ${worker.process.pid} morreu / code: ${code}, signal: ${signal}`.rainbow);
        console.log('[LOGS] - [CLUSTER] Iniciando um novo worker'.rainbow);
        cluster.fork();
    });
}
