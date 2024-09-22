// NOTE: ephemeral makes the message be able to read only user who used the command

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testephemeral')
        .setDescription('test: send hidden messages'),
    async execute(interaction) {
        await interaction.reply({
                content: 'this message is hidden',
                ephemeral: true, // set ephemeral to hide the message
            });
    }
}