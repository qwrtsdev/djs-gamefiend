// NOTE: follow up method is using for making another message response after the first one 

const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testfollowup')
        .setDescription('test: message sent a follow up after first one'),
    async execute(interaction) {
        await interaction.reply({
            content: 'hello world' // first message content
        });
        await interaction.followUp({
            content: 'hello world 2' // second message content that sent after
        });
    }
}