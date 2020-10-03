const Discord = require('discord.js');
const {
	prefix,
	token,
} = require('./auth.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.login(token);

client.once('ready', () => {
    console.log('Ready!');
   });
   client.once('reconnecting', () => {
    console.log('Reconnecting!');
   });
   client.once('disconnect', () => {
    console.log('Disconnect!');
   });


client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;    
    if (message.content.startsWith('!!enter')) {
        enter(message);
        return;
    }else if (message.content.startsWith('!!exit')) {
        message.channel.send("I do not know how to do that... :(");
        return;
    } else {
        message.channel.send("You need to enter a valid command!");
    }
})


async function enter(message) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    try {
        // Here we try to join the voicechat and save our connection into our object.
        var connection = await voiceChannel.join();        
    } catch (err) {
        // Printing the error message if the bot fails to join the voicechat
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
    }
  }

