const Discord = require('discord.js')
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log(`${client.user.tag} is ready!!`)
})

client.on('message', (message) => {
    if (message.content === 'hi'){
        message.channel.send('hi back')
    }
})

client.login(process.env.TOKEN)