const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')


var config_token = process.env.TOKEN
var config_owner = process.env.OWNER   // 448138061440614400
var config_channel = process.env.CHANNEL  // 609677269366997014
var config_status = process.env.STATUS
var config_statustype = process.env.STATUSTYPE  // WATCHING
var config_botchannel = process.env.BOTCHANNEL  //589823584646725682
var config_pingrole = process.env.PINGROLE   // <@&662318067874791439>
var config_prefix = process.env.PREFIX   //!

var client = new Discord.Client()

client.on('ready', () => {
    client.user.setActivity(config_status, {type: config_statustype})
    console.log(`Online`)
})


var cmdmap = {
    news : cmd_news
}

function cmd_news(msg, args) {
    if (msg.author.id == config_owner) {
        if (msg.channel.id == config_botchannel) {
            var emb = new MessageEmbed()
                .setTitle('News')
                .setColor('FAA81A')
                .setDescription(args.join(" "))
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setTimestamp()
            client.channels.cache.get(config_channel).send(config_pingrole, emb).then(p => { p.crosspost(); })
        console.log("Worked")
        } else {
            msg.delete()
            console.log("Error")
        }
    } else {
        msg.delete()
        console.log("Error")
    }
}

client.on('message', (msg) => {


    var cont   = msg.content,
        member = msg.member,
        chan   = msg.channel,
        guild  = msg.guild,
        author = msg.author

        if (author.id != client.user.id && cont.startsWith(config_prefix)) {

            
            // 
            var invoke = cont.split(' ')[0].substr(config_prefix.length),
                args   = cont.split(' ').slice(1)
            
            
            if (invoke in cmdmap) {
                cmdmap[invoke](msg, args)
            }
        }

})


client.login(config_token)