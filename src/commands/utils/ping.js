// import SlashCommandBuilder to use
const { SlashCommandBuilder } = require('discord.js');

// use module.exports to use this command in other files by import
module.exports = {
    // declare "data" and set value as definetion of command
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping command'),
    // and function to do when this command was used
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}