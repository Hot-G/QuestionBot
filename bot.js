const Discord = require('discord.js');
const client = new Discord.Client();

var channelIDs = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  if(message.author.bot)  return;

//////////// ADD CHANNEL ////////////
  if(message.content.startsWith('_add')){
    if(channelIDs.includes(message.channel.id)){
      message.channel.send("Kanal zaten eklenmiş.");
      return;
    }

    channelIDs.push(message.channel.id);
    message.channel.send("Kanal başarıyla eklendi.");
    return;
  }
  ////////////  DELETE CHANNEL //////////
  if(message.content.startsWith('_remove')){

    if(!channelIDs.includes(message.channel.id)){
      message.channel.send("Kanal zaten ekli değil.");
      return;
    }

    for( var i = 0; i < channelIDs.length; i++){
      if ( channelIDs[i] === message.channel.id) {
          channelIDs.splice(i, 1);
          break;
        }
    }
    message.channel.send("Kanal başarıyla silindi.");
    return;
  }

  if(channelIDs.includes(message.channel.id)){
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
        let message = reaction.message, emoji = reaction.emoji;

        if(user.bot)  return;


        const userId = user.id;
        const userReactions = message.reactions.cache.filter(reactions => reactions.users.cache.has(userId));
        try {
        	for (const _reaction of userReactions.values()) {
            if(reaction != _reaction)
        		  _reaction.users.remove(userId);
        	}
        } catch (error) {
        	console.error('Failed to remove reactions.');
        }


        //reaction.remove(user);



      //  message.channel.send("Demek " + message.content + " mesajına ifade atmak istemişsin.");


});

client.login('Nzg0ODU2OTMzNDU0MDUzMzk2.X8vY-g.UVuNjxa5QmBtm_glDTBhCvSqzEc');
