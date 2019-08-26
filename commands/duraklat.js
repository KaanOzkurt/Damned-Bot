module.exports = {
	name: 'duraklat',
    description: 'Çalan müziği duraklatır.',
    guildOnly: true,
    aliases: ['devam'],
	execute(message, args) {
        const { voiceChannel } = message.member;
        if (voiceChannel.connection.dispatcher.paused) {
            voiceChannel.connection.dispatcher.resume();
        }
        else {
            voiceChannel.connection.dispatcher.pause();
        }
        message.delete();
	},
};