const config = require("./config.json");
const { ShardingManager } = require("discord.js"),
  manager = new ShardingManager(`./index.js`, {
    token: config.token,
    totalShards: 'auto',
    respawn: true,
  });

manager.spawn();