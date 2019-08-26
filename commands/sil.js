module.exports = {
	name: 'sil',
	description: 'Mesajları siler.',
	usage: '<miktar>',
	guildOnly: true,
	aliases: ['temizle'],
	modOnly: true,
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('geçerli bir sayı girmediniz!');
		} else if (amount < 2 || amount > 100) {
			return message.reply('2-100 arası bir sayı girmelisiniz!');
		}
		message.channel.bulkDelete(amount, true)
		.catch(err => {
			console.error('[HATA][KOMUTLAR]' + err);
			message.channel.send('bu kanaldaki mesajları silerken bir sorun oluştu!');
		})
		.finally(() => { 
			console.log('[BİLGİ][MOD]' + (amount - 1) + ' adet mesaj silindi.');
			message.delete();
		});
	},
};