module.exports = {
	name: 'zar',
	description: 'Zar at.',
	execute(message, args) {
		const Discord = require('discord.js');
        const zar = Math.floor(Math.random() * 12) + 1;
		const embed = new Discord.RichEmbed()
			.setColor('#5712cb')
			.setAuthor(zar);
		message.channel.send(embed);
	},
};