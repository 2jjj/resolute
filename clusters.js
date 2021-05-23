var cluster = require('cluster');
require("colors");

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log(`[CLUSTER]-[CONFIGURAÇÃO] - Master cluster setting up ${numWorkers} workers...`.rainbow);

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        require("./shard");
        console.log(`[CLUSTER] Worker ${worker.process.pid} está online.`.rainbow);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log(`[CLUSTER] Worker  ${worker.process.pid} died with code: ${code}, and signal: ${signal}`.rainbow);
        console.log('[CLUSTER] Starting a new worker'.rainbow);
        cluster.fork();
    });
} else {
    var app = require('express')();
    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' Diga Olá!').end();})

    var server = app.listen(8000, function() {
        console.log(`[CLUSTER] Process ${process.pid} está ouvindo todas as solicitações recebidas`.rainbow);
    });
}