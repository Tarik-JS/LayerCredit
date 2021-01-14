const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const ms = require("ms");
const prefix = '$';
client.on('ready',()=>{
  console.log(`im ${client.user.tag}, ready ...`)
})

const cool = [];

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.channel.guild) return;

  const args = message.content.split(' ');
  const credits = require('./credits.json');
  const path = './credits.json';
  const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;
  const member = message.mentions.users.first() || client.users.cache.get(args[1]);
  const author = message.author.id;
  const daily = Math.floor(Math.random() * 380) + 10;
  const money = args[2];

  if (!credits[author]) credits[author] = { credits: 0 };
  if (!credits[user.id]) credits[user.id] = { credits: 0 };
  fs.writeFile(path, JSON.stringify(credits, null, 5), function (err) { if (err) console.log(err) });
  if (message.content.startsWith(prefix + "credit")) {
    if (args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;
    if (args[2]) {

      if (isNaN(args[2])) return message.channel.send('**Numbers Plese.!**');
      if (member.bot) return message.channel.send(`**Bots cant have credits**`);
      if (user.id === message.author.id) return message.channel.send('**You cant transfer to your self**');
      if (credits[author].credits < money) return message.channel.send('**You dont have that much**');
      var one = Math.floor(Math.random() * 9) + 1;
      var two = Math.floor(Math.random() * 9) + 1;
      var three = Math.floor(Math.random() * 9) + 1;
      var four = Math.floor(Math.random() * 9) + 1;

      var number = `${one}${two}${three}${four}`;

      message.channel.send(`**Type the verfiy number : \`${number}\`, you have 15 seconds**`).then(layer => {
        message.channel.awaitMessages(layer => layer.author.id === message.author.id, { max: 1, time: 15000 }).then(text => {
         if(!text.first()) return layer.delete(message.channel.send(`**The transfer has been canceled**`)) 

          if (text.first().content === number) {
            layer.delete();
            message.channel.send(`**💰 ${message.author.username}, has transferd \`$${money}\` to ${user.username}**`);
            credits[author].credits += (-money);
            credits[user.id].credits += (+money);
            fs.writeFile(path, JSON.stringify(credits, null, 5), function (err) { if (err) console.log(err) });
          } else if (c.first().content !== number) {
            layer.delete();
            message.channel.send(`**The transferd has been canceled**`);
          }
        });
      });
    }
    if (!args[2]) {
      if (user.bot) return message.channel.send(`**Bots dont have credits.**`);
      message.channel.send(`**${user.username}, :credit_card: balance is **\`$${credits[user.id].credits}\``);
    }

  }
  if (message.content.startsWith(prefix + "daily")) {
    if (cool.includes(message.author.id)) return message.channel.send(`**Plese wait 1 day to take your daily again**`);
    if (member) return;
    if (author) {
      credits[author].credits += (+daily);
      fs.writeFile(path, JSON.stringify(credits, null, 5), function (err) { if (err) console.log(err) });

      message.channel.send(`**💰 Your daily amount has been received : \`$${daily}\`**`);
    }
    cool.unshift(message.author.id);

    setTimeout(() => {
      cool.shift(message.author.id);
    }, ms("1d"));
  }
})


client.login('Nzk3ODk4NjgzMDMxMDkzMjQ5.X_tLDg.IzC63gpbkXVON0u-Q1SxzsuD2-M')