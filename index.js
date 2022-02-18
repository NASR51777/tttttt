
const app = require("express")();app.get('/', (req, res) =>{res.send("N A S S E R ♕︎");});app.listen(8080);

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", async() => {
        console.log(`I 'm online!`)
client.user.setActivity('NASSBOTS SERVICE', { type: 'PLAYING' });

});

const prefix = '+g';


client.login("OTI0NDM2MjM2MDcwOTUyOTcw.YceiVQ.9F29mThS2IcmxzxmSl1xmrRxt-A")
     
const { GiveawaysManager } = require('discord-giveaways');
const { settings } = require('cluster');

    // Starts updating currents giveaways
    const manager = new GiveawaysManager(client, {
        storage: 'giveaways.json',
        updateCountdownEvery: 5000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            embedColor: '#00FF97',//لون الامبد حق القيفاواي
            embedColorEnd: '#FF0000',//لون الامبد حق القيفاواي لما يخلص
            reaction: '924348585884139530'
        }
    });

    client.giveawaysManager = manager;
    client.on('message', (message) => {
        const ms = require('ms'); // npm install ms
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
        if(message.content.includes(client.user.id)) return message.channel.send(`use: \`${prefix}help\``)
        if(command === "help") {
          if(message.author.bot) return;
          if(message.channel.type === "dm") return;
            message.channel.send(new Discord.MessageEmbed()
            .setAuthor(message.author.tag,message.author.displayAvatarURL())
            .setTitle('giveaway command:')
                                 .setColor("#00FF97")
            .addFields({name: `${prefix}start`, value: 'to start a giveaway.'},
            {name: `${prefix}end`, value: 'to end a giveaway.'},
            {name: `${prefix}reroll`, value: 'to reroll a giveaway (ended giveaways only).'},
            {name: `${prefix}delete`, value: 'to delete a giveaway.'}))
        }
        if (command === 'start') {
          if(message.author.bot) return;
          if(message.channel.type === "dm") return;
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('you not allowed to use this!')
            if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}start [time] [winners] [prize]\n ${prefix}start 1d 1w nitro classic`))
            if(!args[1]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}start [time] [winners] [prize]\n ${prefix}start 1d 1w nitro classic`))
            if(!args[2]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}start [time] [winners] [prize]\n ${prefix}start 1d 1w nitro classic`))
            client.giveawaysManager.start(message.channel, {
                time: ms(args[0]),
                winnerCount: parseInt(args[1]),
                prize: args.slice(2).join(' '),
                lastChance: {
                        enabled: true,
                        content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
                        threshold: 5000,
                        embedColor: '#FF0000'
                    },
                    messages: {
                        giveaway: `<:emoji_1:924348585884139530> **GIVEAWAY** <:emoji_1:924348585884139530>`,//رسالة القيف اواي لما يبدا
                        giveawayEnded: '<:emoji_1:924348585884139530> **GIVEAWAY ENDED** <:emoji_1:924348585884139530>',//رسالة القيف اواي لما يخلص
                        timeRemaining: 'Time remaining: **{duration}**',
        inviteToParticipate: 'React with <:emoji_1:924348585884139530> to participate!',//الرساله اللي في وسط الامباد لما يبلش القيف اواي
        winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',//لما يخلص و يربح شخص يرسل ده
        embedFooter: message.guild.name,
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: `Hosted by: ${message.author}`,
        winners: 'winner(s)',
        endedAt: 'Ended at',
                    }
              
            }).then((gData) => {
                console.log(gData);
            });
          message.delete()
        }
        if (command === 'reroll') {
          if(message.author.bot) return;
          if(message.channel.type === "dm") return;
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('you not allowed to use this!')
                const messageID = args[0];
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}reroll [giveaway message ID]\n ${prefix}reroll 44564686464886546978`))
                if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
                client.giveawaysManager.reroll(messageID, {
                    messages: {
                        congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{prize}**!\n{messageURL}',
                        error: 'No valid participations, no new winner(s) can be chosen!'
                    }
                }).catch((err) => {
                    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                });
            }
            if (command === 'edit') {
              if(message.author.bot) return;
          if(message.channel.type === "dm") return;
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('you not allowed to use this!')
                const messageID = args[0];
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}edit [giveaway message ID] [time] [winners] [prize]\n ${prefix}edit 6468456486465811 1d 1w nitro classic`))
                if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
                client.giveawaysManager.edit(messageID, {
                    addTime: 5000,
                    newWinnerCount: parseInt(args[2]),
                    newPrize: `New Prize!: ${args.slice(3).join(' ')}`
                }).then(() => {
                    const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                    message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.');
                }).catch((err) => {
                    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                });
            }
            if (command === 'delete') {
              if(message.author.bot) return;
          if(message.channel.type === "dm") return;
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('you not allowed to use this!')
                const messageID = args[0];
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}delete [giveaway message ID]\n ${prefix}delete 54684641254645164514`))
                if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
                client.giveawaysManager.delete(messageID).then(() => {
                    message.channel.send('Success! Giveaway deleted!');
                }).catch((err) => {
                    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                });
            }
            if (command === 'end') {
              if(message.author.bot) return;
          if(message.channel.type === "dm") return;
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('you not allowed to use this!')
                const messageID = args[0];
                if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`> Usage: ${prefix}end [giveaway message ID]\n ${prefix}end 54746465468154668456`))
                if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
                client.giveawaysManager.end(messageID).then(() => {
                    message.channel.send(`Success! Giveaway ended!`);
                }).catch((err) => {
                    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                });
            }
        });
        



