module.exports = {
	name: 'dürt',
	description: 'Birini dürt!',
	args: true,
	usage: '<kullanıcı>',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('dürtmek istediğiniz kişiyi etiketlemelisiniz!');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`Hey dostum ${taggedUser} hey!`);
	},
};