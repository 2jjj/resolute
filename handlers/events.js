const fs = require("fs");

module.exports = (client) => {

    fs.readdir(__dirname + "/events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            const event = require(__dirname + `/events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            //table.addRow(eventName,'✅')
            console.log(cor.red("[LOGS] - [EVENTO] - " + eventName))
        });
    })
};