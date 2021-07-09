const {  Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Deezer = require("erela.js-deezer");
const config = require("../../botconfig/config.json");
const clientID = config.spotify.clientID;
const clientSecret = config.spotify.clientSecret;

module.exports = (client) => {

    if (!clientID || !clientSecret) {
        client.manager = new Manager({
            nodes: config.clientsettings.nodes,
            plugins: [
                new Deezer()
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
    } else {
        client.manager = new Manager({
            nodes: config.clientsettings.nodes,
            plugins: [
                new Spotify({
                    clientID, //get a clientid from there: https://developer.spotify.com/dashboard
                    clientSecret
                }),
                new Deezer()
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
    }

    require("./erela_js_node_log")(client)

    client.manager
        .on("playerCreate", async (player) => {
            player.setVolume(50);//**\n🔹 **Comando executado no chat:** <#${client.channels.cache.get(player.textChannel).id}>
            client.channels.cache.get(player.textChannel).send(`:thumbsup: **Entrei em \`${client.channels.cache.get(player.voiceChannel).name}\`**`).catch(e => console.log("Ocorreu um erro!"))
        })
        .on("playerMove", async (player, oldChannel, newChannel) => {
            if (!newChannel) {
                /*let channel = await client.channels.fetch(player.voiceChannel)
                client.channels.cache
                    .get(player.textChannel)
                    .send(`:x: Queue ended!\n:thumbsup: Left: **${channel.name}**`);*/
                player.destroy();
                client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(msg => {
                    msg.delete({
                        timeout: 500
                    }).catch(e => console.log("Não foi possivel excluir a mensagem.".grey));
                });
                player.destroy();
            } else {
                player.voiceChannel = newChannel;
                if (player.paused) return;
                setTimeout(() => {
                    player.pause(true);
                    setTimeout(() => player.pause(false), client.ws.ping * 2);
                }, client.ws.ping * 2);
            }
        })
        .on("trackStart", async (player, track) => {

            player.set("votes", "0");

            for (const userid of client.guilds.cache.get(player.guild).members.cache.map(member => member.user.id))
                player.set(`vote-${userid}`, false);

                player.set("previoustrack", track);

            if (client.settings.get(player.guild, `pruning`))
                client.channels.cache.get(player.textChannel).send(`**Tocando agora:** :notes: \`${track.title}\``).then(msg => {
                    try {
                        if (player.get(`playingsongmsg`) && msg.id !== player.get(`playingsongmsg`).id)
                            player.get(`playingsongmsg`).delete().catch(e => console.log("Não foi possivel excluir a mensagem.".grey));
                    } catch {
                        /* */
                    }
                    player.set(`playingsongmsg`, msg)
                })
        })
        .on("trackStuck", async (player, track, payload) => {
            player.stop();
            client.channels.cache
                .get(player.textChannel)
                .send(`:x: **\`${track.title}\` **:thumbsup: Pulando!`);
        })
        .on("trackError", async (player, track, payload) => {
            player.stop();
            client.channels.cache
                .get(player.textChannel)
                .send(`:x: **\`${track.title}\`** :thumbsup: Pulando!`);
        })
        .on("queueEnd", async (player) => {

            let channel = await client.channels.fetch(player.voiceChannel)
            client.channels.cache
                .get(player.textChannel)
                .send(`:x: **A fila acabou!**\n👋 **Sai do canal de voz:** **${channel.name}**`);
            player.destroy();

        });
    client.once("ready", () => client.manager.init(client.user.id));
    client.on("raw", (d) => client.manager.updateVoiceState(d));
    client.on("channelDelete", channel => {

        if (channel.type === "voice") {
            if (channel.members.has(client.user.id)) {
                var player = client.manager.players.get(channel.guild.id);
                if (!player) return;
                if (channel.id === player.voiceChannel) player.destroy();
            }
        }

    })
    client.on("guildRemove", guild => {
        var player = client.manager.players.get(guild.id);
        if (!player) return;
        if (guild.id == player.guild) player.destroy();
    })
};