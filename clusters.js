var cluster = require('cluster');
require("colors");

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log(`[LOGS] - [CLUSTER]-[CONFIGURAÇÃO] - Master cluster está configurando ${numWorkers} workers...`.rainbow);

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        require("./shard");
        console.log(`[LOGS] - [CLUSTER] Worker ${worker.process.pid} está online.`.rainbow);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log(`[LOGS] - [CLUSTER] Worker  ${worker.process.pid} died with code: ${code}, and signal: ${signal}`.rainbow);
        console.log('[LOGS] - [CLUSTER] Starting a new worker'.rainbow);
        cluster.fork();
    });
}