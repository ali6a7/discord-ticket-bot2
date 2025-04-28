
const Discord = require('discord.js');
const client = new Discord.Client();
const { support_role_id, ticket_category_id } = require('./config.json');

client.on('message', async message => {
    if (message.content.toLowerCase() === '!ticket') {
        const channel = await message.guild.channels.create(`ticket-${message.author.username}`, {
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

        channel.send(`<@&${support_role_id}> New ticket opened by ${message.author.tag}`);
        channel.send('Welcome to your ticket. A support team member will be with you shortly.');
    }
});

client.on('message', message => {
    if (message.content.toLowerCase() === '!close') {
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false,
        });
        message.channel.send('Ticket closed.');
    }
});

client.login('YOUR_BOT_TOKEN');
