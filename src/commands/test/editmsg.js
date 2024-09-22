// NOTE: use editReply() to edit recent response, change the message after desired time with NodeJS timer module

const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testedit')
        .setDescription('test: edit the message after 2 seconds'),
    async execute(interaction) {
        await interaction.reply({
            content: 'sawassdee' // first message content
        });
        await wait(2_000); // use nodejs timeout to wait 2 seconds
        await interaction.editReply({
            content: 'สวัสดี'
        }); // second message content (edited)
    }
}