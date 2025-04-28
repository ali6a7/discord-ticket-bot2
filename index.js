const Discord = require('discord.js');
const client = new Discord.Client();
const { support_role_id, ticket_category_id } = require('./config.json');

client.on('message', async message => {
    if (message.content.toLowerCase() === '!تكت') {
        const channel = await message.guild.channels.create(`تكت-${message.author.username}`, {
            type: 'text',
            parent: ticket_category_id,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['SEND_MESSAGES'],
                },
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES'],
                },
                {
                    id: support_role_id,
                    allow: ['SEND_MESSAGES'],
                },
            ],
        });

        channel.send(`<@&${support_role_id}> تم فتح تكت جديد بواسطة ${message.author.tag}`);
        channel.send('مرحبًا بك في تكتك، سوف يتواصل معك أحد أعضاء الدعم قريبًا.');
    }
});

client.on('message', message => {
    if (message.content.toLowerCase() === '!إغلاق') {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false,
        });
        message.channel.send('تم إغلاق التكت.');
    }
});

client.login('YOUR_BOT_TOKEN');
