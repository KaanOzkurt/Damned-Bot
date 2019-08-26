module.exports = {
	name: 'sunucu',
	description: 'Sunucu hakkında bilgi verir.',
	guildOnly: true,
	execute(message, args) {
		const Discord = require('discord.js');
		const embed = new Discord.RichEmbed()
			.setColor('#5712cb')
			.setTitle(message.guild.name)
			.addField('ID',message.guild.id,false)
			.addField('Kurucu',message.guild.owner,true)
			.addField('Bölge',message.guild.region,true)
			.addField('Üye Sayısı:',message.guild.memberCount,true)
			.setImage(message.guild.iconURL)
			.setFooter('Sunucunun oluşturulduğu tarih:')
			.setTimestamp(message.guild.createdTimestamp)
		message.channel.send(embed);
	},
};