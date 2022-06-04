const { QuickDB } = require("quick.db");
const db = new QuickDB(); 

module.exports = {
    name: "contador",
    description: "Ative o contador de membros no servidor.",
    type: "CHAT_INPUT",

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            let canal = await interaction.guild.channels.create(`👥 Membros: ${interaction.guild.memberCount}`, {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: "CONNECT",
                    }
                ]
            });

            interaction.reply(`O sistema de contador de membros foi ativado em ${canal}.`)
            db.set(`contador_${interaction.guild.id}`, canal.id)
        }

    }
}