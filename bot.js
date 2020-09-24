// Gets all the npm modules
// Discord.js
const Discord = require("discord.js");

const client = new Discord.Client();

const http = require("http");

// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { "encryptedData": encrypted.toString('hex') };
}

// This file keeps the project "alive"
// The bot is hosted on glitch.com, which puts scripts to sleep if they aren't pinged for 5 minutes
// This script pings itself every 5 minutes, so that it doesn't go to sleep.
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


// Logs in the console when the bot has logged in
client.on("ready", () => {

    console.log("[INFO/IMPORTANT]: Bot Online!");

});

// When a message is sent
client.on("message", message => {

    // Checks that them message wasn't from a bot and starts with the prefix
    if (!message.author.bot) {

        // Gets info about message
        const authorId = message.author.id;

        const authorTag = message.author.tag;

        const channel = message.channel.id;

        const avatar = message.author.avatarURL;

        var messageContent = message.content;

        var furryID = [];

        var abuseID = ['702550131890847835', '717087900688187452'];

        var distortType = Math.floor(Math.random() * 2);;

        if (abuseID.includes(authorId) || message.member.roles.cache.some(r => r.name === "Thief")) {

            if (distortType === 0) {

                var encryptedMessage = encrypt(messageContent);

                message.delete();

                const encryptedEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(authorTag)
                    .setDescription(encryptedMessage.encryptedData)
                    .setTimestamp()
                    .setFooter('This message was sent by ' + authorTag + ' and was encrypted by Furry Bot');

                message.channel.send(encryptedEmbed);

            }

            if (distortType === 1) {

                message.delete();

                const encryptedEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(authorTag)
                    .setDescription('I LIKE TO MOVE IT MOVE IT')
                    .setTimestamp()
                    .setFooter('This message was sent by ' + authorTag + ' and was edited by Furry Bot');

                message.channel.send(encryptedEmbed);


            }

        } else {

            if (message.member.roles.cache.some(r => r.name === "Furry") || furryID.includes(authorId)) {

                if (messageContent.includes("r") || messageContent.includes("R") || messageContent.includes("l") || messageContent.includes("L")) {

                    for (var x = 0; x <= messageContent.length; x++) {

                        messageContent = messageContent.replace("r", "w");

                        messageContent = messageContent.replace("R", "W");

                        messageContent = messageContent.replace("l", "w");

                        messageContent = messageContent.replace("L", "W");

                    }

                    message.delete();

                    const furryEmbed = new Discord.MessageEmbed()
                        .setAuthor(authorTag, message.author.avatarURL)
                        .setColor('BLUE')
                        .setDescription(messageContent + ' UwU')
                        .setTimestamp()
                        .setFooter('This message was sent by ' + authorTag + ', and was edited by Furry Bot', message.author.avatarURL);

                    message.channel.send(furryEmbed);

                }

            }

        }

    }

});

// Logs into the bot
client.login(process.env.TOKEN);