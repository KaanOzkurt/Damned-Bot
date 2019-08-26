module.exports = {
	name: 'oynat',
    description: 'Youtube\'dan müzik oynat.',
    guildOnly: true,
    aliases: ['çal', 'youtube', 'yt'],
    usage: '<youtubelink>',
    args: true,
	execute(message, args) {
        const ytdl = require('ytdl-core');
        const { voiceChannel } = message.member;
		if (!voiceChannel) {
			return message.reply('lütfen önce bir sesli kanala girin!');
        }
        voiceChannel.join().then(connection => {
			const stream = ytdl(args[0], { filter: 'audioonly' });
			const dispatcher = connection.playStream(stream);

            dispatcher.on('start', () => {
                const Discord = require('discord.js');
                const embed = new Discord.RichEmbed()
			        .setColor('#5712cb')
			        .setAuthor('Müzik başladı.');
                message.channel.send(embed);
                console.log('[BİLGİ][MÜZİK]Müzik başladı.');
            });
            dispatcher.on('end', () => {
                voiceChannel.leave();
                const Discord = require('discord.js');
                const embed = new Discord.RichEmbed()
			        .setColor('#5712cb')
			        .setAuthor('Müzik bitti.');
                message.channel.send(embed);
                console.log('[BİLGİ][MÜZİK]Müzik bitti.');
            });
            dispatcher.on('error', e => {
                console.log('[HATA][MÜZİK]' + e);
            });
		});
	},
};