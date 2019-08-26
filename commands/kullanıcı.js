module.exports = {
	name: 'kullanıcı',
	description: 'Kullanıcı hakkında bilgi verir.',
	usage: '<kullanıcı>',
	aliases: ['benkimim'],
	execute(message, args) {
		if (!message.mentions.users.size) {
			const Discord = require('discord.js');
			const embed = new Discord.RichEmbed()
				.setColor('#5712cb')
				.setAuthor(message.author.username)
				.addField('ID', message.author.id, false)
				.setTimestamp(message.author.createdTimestamp)
				.setFooter('Hesabın oluşturulma tarihi: ')
				.setImage(message.author.displayAvatarURL)
			return embed;
		}
		const taggedUser = message.mentions.users.first();
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
			.setColor('#5712cb')
			.setAuthor(taggedUser.username)
			.addField('ID', taggedUser.id, false)
			.setTimestamp(taggedUser.createdTimestamp)
			.setFooter('Hesabın oluşturulma tarihi: ')
			.setImage(taggedUser.displayAvatarURL)
		message.channel.send(embed);
	},
};