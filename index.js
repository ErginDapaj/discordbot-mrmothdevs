const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
require('dotenv').config();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.prefix = process.env.PREFIX
client.on('ready', () => {
   // console.log(`${client.user.tag} is ready!!`)
})

// This will check for the command folder and it will verify it
fs.readdir('./commands', (err, files) => {
    if (err) console.error(err)
    let jsfiles = files.filter(file => file.split(".").pop() === 'js')
    if (!jsfiles || jsfiles.length <= 0) console.log('No commands found')
    jsfiles.forEach((file, i) => {
        let props = require(`./commands/${file}`)
        if (props.run && props.help.name) {
            client.commands.set(props.help.name, props)
            if (props.help.aliases && Array.isArray(props.help.aliases)) {
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name)
                    console.log(`Loaded alias ${alias} for command ${props.help.name}`)
                })
            }
            console.log(`${i + 1}: Loaded command ${props.help.name}`)
        } else {
            console.log(`Something is missing in file ${file}`)
        }
    })
})

// This will check for the event folder and it will verify it
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


client.login(process.env.TOKEN)