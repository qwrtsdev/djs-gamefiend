const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST().setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.APP_ID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);