module.exports = {
	name: 'yazıtura',
	description: 'Yazı tura at.',
	execute(message, args) {
		const Discord = require('discord.js');
        let yazıtura;
        const random = Math.floor(Math.random() * 2);
        if (random == 0) yazıtura = 'Yazı!'

        if (random == 1) yazıtura = 'Tura!'

		const embed = new Discord.RichEmbed()
			.setColor('#5712cb')
			.setAuthor(yazıtura);
		message.channel.send(embed);
	},
};