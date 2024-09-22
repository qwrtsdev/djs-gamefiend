const fs = require('node:fs'); // use for reading files in system
const path = require('node:path'); // use for addressing paths of files
// define what we want from Discord.js
const { Client, Collection, Events, GatewayIntentBits, PresenceUpdateStatus } = require('discord.js');
// using .env with dotenv module
require('dotenv').config();

// create a new client session from (un-define values) "Client" class from Discord.js
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection is thing that Discord.js retrive commands
client.commands = new Collection();

// logic for reading command's folder in our system
const foldersPath = path.join(__dirname, 'src', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// it will reads out how much command files (that ends with '.js') we have and register it to Discord
// learn more: https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// function that will activate (only once) after the client starts
client.once(Events.ClientReady, readyClient => {
	// set bot's status with setPresence() method
	// read more:  https://discordjs.guide/popular-topics/faq.html#how-do-i-set-my-playing-status
	client.user.setPresence({ 
		activities: [{ 
			name: 'gamefiend.net', // set playing status text
		}], 
		status: PresenceUpdateStatus.DoNotDisturb // change bot's presence with pre-made enum of Discord.js for safety
	});
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
// execute console log every time user used a slash command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return; // if it's not chat command then do nothing

    // define word "command" as that interaction (commands) that user used
	const command = interaction.client.commands.get(interaction.commandName);

    // when the command's name that user typed doesn't matched with any of commands in files then return error
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    // if everything's fine then execute that command from user type
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ 
                content: 'There was an error while executing this command!', ephemeral: true 
            });
		} else {
			await interaction.reply({ 
                content: 'There was an error while executing this command!', ephemeral: true 
            });
		}
	}
});

// define what client where client will read the bot's token
client.login(process.env.BOT_TOKEN);