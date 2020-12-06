const Discord = require('discord.js');
const client = new Discord.Client();

var channelIDs = [];
var admins = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    admins.push(String('527976762127286272'));
});

client.on('message', (message) => {
    if (message.author.bot) return;
    //message.channel.send(message.author.id);
    ///////////////////////////////////////////
    ///////////// IF USER IS ADMIN ////////////
    ///////////////////////////////////////////

    if (admins.includes(String(message.author.id))) {
        //////////// ADD CHANNEL ////////////
        if (message.content === '_add') {
            if (channelIDs.includes(message.channel.id)) {
                message.channel.send('Kanal zaten eklenmiş.');
                return;
            }

            channelIDs.push(message.channel.id);
            message.channel.send('Kanal başarıyla eklendi.');
            return;
        }
        ////////////  DELETE CHANNEL //////////
        if (message.content === '_remove') {
            if (!channelIDs.includes(message.channel.id)) {
                message.channel.send('Kanal zaten ekli değil.');
                return;
            }

            for (var i = 0; i < channelIDs.length; i++) {
                if (channelIDs[i] === message.channel.id) {
                    channelIDs.splice(i, 1);
                    break;
                }
            }
            message.channel.send('Kanal başarıyla silindi.');
            return;
        }
        //////////////// INSERT ADMIN /////////////////////
        if (message.content.startsWith('_insertadmin')) {
            const arg = message.content.split(' ');
            admins.push(arg[1]);
            message.channel.send('Yeni admin başarıyla eklendi.');
            return;
        }
        //////////// DELETE SELECTED QUESTIONS ////////////
        if (message.content === '_delete') {
            message.channel.fetchMessages().then((messages) => {
                message.channel.send(messages.size + ' mesaj');
        /*        messages
                    .array()
                    .reverse()
                    .forEach((msg) => {
                        //  console.log(`[${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] ` +
                        // `[${msg.author.username.toString()}]` + ": " + msg.content);
                    });*/
            });
        }
    }

    ////////////////////////////////////////
    //////////// REACT ANSWERS ////////////
    ///////////////////////////////////////

    if (channelIDs.includes(message.channel.id)) {
        try {
            message.react('🇦');
            message.react('🇧');
            message.react('🇨');
            message.react('🇩');
            message.react('🇪');
            //}
        } catch (error) {
            console.error('One of the emojis failed to react.');
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message,
        emoji = reaction.emoji;

    if (user.bot) return;

    const userId = user.id;
    const userReactions = message.reactions.cache.filter((reactions) =>
        reactions.users.cache.has(userId)
    );
    try {
        for (const _reaction of userReactions.values()) {
            if (reaction != _reaction) _reaction.users.remove(userId);
        }
    } catch (error) {
        console.error('Failed to remove reactions.');
    }

    //reaction.remove(user);

    //  message.channel.send("Demek " + message.content + " mesajına ifade atmak istemişsin.");
});

client.login('token');
