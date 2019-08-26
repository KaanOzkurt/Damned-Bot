// require the discord.js module
const Discord = require('discord.js');

// require file system module
const fs = require('fs');

// config file
const { prefix, token, activityMessage, blacklist, blacklistWords } = require('./config.json');

// create a new Discord client
const client = new Discord.Client({
    autoReconnect: true, 
    max_message_cache: 0
});

// get commands from files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// this event will only trigger one time after logging in
client.on('ready', () => {
	console.log('[BİLGİ][BOT]Hazır!');
	client.user.setActivity(activityMessage, { type: 'WATCHING' });
});

// this event triggers when message is send
client.on('message', message => {
	// if message author is bot, its ignored
	if (message.author.bot) return;

	// if message isnt starts with prefix
	if (!message.content.startsWith(prefix)) {
		if (blacklist) {
			message.content.toLowerCase();
			if (blacklistWords.includes(message.content)) {
				message.reply('sözlerine dikkat et!');
				message.delete();
			}
		}
	}

	// get arguments
	const args = message.content.slice(prefix.length).split(/ +/);

	// make commands to lower case so its not case sensitive
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
	// if the command needs arguments and arguments didnt provided
	if (command.args && !args.length) {
		let reply = `Parametre girmediniz!, ${message.author}!`;
		if (command.usage) {
			reply += `\nDoğru kullanım: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	// if guild only commands used in direct messages
	if (command.guildOnly && message.channel.type !== 'text') {
		console.log('[BİLGİ][KOMUTLAR]' + message.author.name + ' sunucu komutunu özel mesajda kullanmaya çalıştı.');
		return message.reply('Bu komutu özel mesajlarda kullanamazsınız!');
	}

	// if command needs permission
	if (command.modOnly && !message.author.id == message.guild.ownerID && !member.hasPermission(['ADMINISTRATOR', 'MANAGE_MESSAGES'])) {
		console.log('[BİLGİ][KOMUTLAR]' + message.author.name + ' yetkili komutu kullanmaya çalıştı.');
		return message.reply('Bu komutu sadece yetkililer kullanabilir!');
	}

	// execute commands
	try {
		command.execute(message, args);
	} catch (error) {
		console.error('[HATA][KOMUTLAR]' + error);
		message.reply('komut çalışırken hata oluştu!');
	}
});

client.on('disconnect', () => {
	console.log('[BİLGİ][BOT]Bağlantı koptu!');
});

client.on('reconnecting', () => {
	console.log('[BİLGİ][BOT]Yeniden bağlanılıyor.');
});

client.on('warn', () => {
	console.warn('[UYARI][BOT]');
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection'));

// login to Discord with app's token
client.login(token);