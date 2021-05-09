module.exports = {
    name: 'message',
    execute(message, client) {
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
        if (message.author.bot || message.channel.type !== 'text') return;
        const prefix = client.prefix
        const messageArray = message.content.split(" ")
        const command = messageArray[0].slice(prefix.length)
        const args = messageArray.slice(1)
        if(!message.content.startsWith(prefix)) return
        let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if(commandfile) commandfile.run(client, message, args)
    }
}