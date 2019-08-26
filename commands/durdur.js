module.exports = {
	name: 'durdur',
    description: 'Çalan müziği durdurur.',
    guildOnly: true,
    aliases: ['dur'],
	execute(message, args) {
        const { voiceChannel } = message.member;
        voiceChannel.connection.dispatcher.end();
        message.delete();
	},
};