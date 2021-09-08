const client = require("../../index");

client.on("interactionCreate", async (interaction) => {
    const prefix = "/"

    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const command = client.slashCommands.get(interaction.commandName);

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Ocorreu um erro." });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        console.log(`[SLASH] - Comando ${command.name} foi usado pelo ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`)
        cmd.run(client, interaction, args, prefix);
    }

    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        if (command) {
            console.log(`[SLASH] - Comando ${command.name} foi usado pelo ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`)
            command.run(client, interaction, prefix)
        };
    }
})