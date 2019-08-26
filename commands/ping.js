module.exports = {
	name: 'ping',
	description: 'Bot\'un gecikme süresini öğren.',
	execute(message, args) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
			.setColor('#5712cb')
			.setAuthor('Gecikme: ' + message.client.ping + 'ms')
		message.channel.send(embed);
		console.log('[BİLGİ][BOT]Bot gecikme süresi: ' + message.client.ping);
	},
};