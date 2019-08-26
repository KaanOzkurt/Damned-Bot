const { prefix } = require('../config.json');
module.exports = {
	name: 'yardım',
	description: 'Bütün komutların listesini veya belli bir komutun bilgisini verir.',
	aliases: ['bilgi', 'komut', 'komutlar'],
	usage: '<komut>',
	guildOnly: true,
	execute(message, args) {
		const data = [];
        const { commands } = message.client;
        if (!args.length) {
			data.push('Bütün komutların listesi:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\n\`${prefix}yardım <komut>\` yazarak belli bir komutun bilgisini alabilirsin.`);

            return message.author.send(data, { split: true })
	            .then(() => {
		            if (message.channel.type === 'dm') return;
		            message.reply('Bütün komutları sana özel mesaj ile gönderdim.');
	            })
	            .catch(error => {
		            console.error(`Özel mesaj ile yardım gönderilemedi ${message.author.tag}.\n`, error);
		            message.reply('size özel mesaj atamıyorum! Özel mesajlarınız kapalı mı?');
	            });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return message.reply('bu geçerli bir komut değil!');
        }

        data.push(`[İsim:] ${command.name}`);

        if (command.aliases) data.push(`[Diğer İsimler:] ${command.aliases.join(', ')}`);
        if (command.description) data.push(`[Açıklama:] ${command.description}`);
        if (command.usage) data.push(`[Kullanım:] ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
	},
};