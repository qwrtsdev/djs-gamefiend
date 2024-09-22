// NOTE: normal response time of one interaction is limited to 3 seconds but if using deferReply() instead of reply() is like letting the bot processing longer and extends the response time from 3 seconds to 15 minutes

const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testdefer')
        .setDescription('test: message edit after more than 2 seconds'),
    async execute(interaction) {
        await interaction.deferReply({ // use deferReply() instead of reply()
            content: 'this is first message'
        });
        await wait(4_000); // more than 3 seconds (the bot will show "___ is thinking")
        await interaction.editReply({ // use deferReply() instead of reply()
            content: 'this is an edited message after thinking' // edited message
        });
    }
}