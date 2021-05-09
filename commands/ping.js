const Discord = require('discord.js')

module.exports.run = async (client, message) => { 
    message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
}

module.exports.help = {
    name: 'ping',
    description: 'ping pong',
    execute:(message, args) => {
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        if (!client.commands.has(command)) return;
        try {
            client.commands.get(command).execute(bot, message);
        } catch (error) {
            console.error(error)
            message.reply('there was an error trying to execute this command.')
        }
    }
}