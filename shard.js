const config = require("./config.json");
const { ShardingManager } = require("discord.js"),
  manager = new ShardingManager(`./index.js`, {
    token: config.token,
    totalShards: 8,
    respawn: true,
  });

manager.spawn();