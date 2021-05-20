const Discord = require("discord.js")

module.exports = async (client) => {
    client.api.applications(client.user.id).guilds('699722023508770836').commands.post({
        data: {
            name: "hello",
            description: "Replies with Hello World!"
        }
    });

    client.api.applications(client.user.id).guilds('699722023508770836').commands.post({
        data: {
            name: "echo",
            description: "Echos your text as an embed!",

            options: [
                {
                    name: "content",
                    description: "Content of the embed",
                    type: 3,
                    required: true
                }
            ]
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == 'hello') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }

        if(command == "echo") {
            const description = args.find(arg => arg.name.toLowerCase() == "content").value;
            const embed = new discord.MessageEmbed()
                .setTitle("Echo!")
                .setDescription(description)
                .setAuthor(interaction.member.user.username);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed)
                }
            });
        }
    });
    const status = [  
        {name: `• Dev: MrSprayX#0012`, type: 'LISTENING'}, 
        {name: `• resolutebot.xyz`, type: 'LISTENING'}, 
        {name: `• ${client.guilds.cache.size} guilds `, type: 'LISTENING'}, 
        {name: `• Versão 1.3.5 (Beta)`, type: 'LISTENING'}
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}