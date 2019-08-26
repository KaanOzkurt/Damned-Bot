module.exports = {
	name: 'avatar',
	description: 'Kullanıcıların avatar\'larını gösterir.',
	aliases: ['foto'],
	usage: '<kullanıcı>',
	execute(message, args) {
		if (!message.mentions.users.size) {
			const Discord = require('discord.js');
			const embed = new Discord.RichEmbed()
				.setColor('#5712cb')
				.setAuthor('Avatar\'ın:')
				.setImage(message.author.displayAvatarURL)
			message.channel.send(embed);
			return embed;
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username} avatar\'ı: <${user.displayAvatarURL}>`;
		});
		message.channel.send(avatarList);
	},
};