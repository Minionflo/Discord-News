const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')


var config_token = process.env.TOKEN
var config_role = process.env.ROLE
var config_channel = process.env.CHANNEL
var config_status = process.env.STATUS
var config_statustype = process.env.STATUSTYPE
var config_botchannel = process.env.BOTCHANNEL
var config_pingrole = process.env.PINGROLE
var config_prefix = process.env.PREFIX

var client = new Discord.Client()

if(process.argv.slice(2) == "test") {
    var secret = fs.readFileSync('secret', 'utf8').split(/\r?\n/)
    secret.forEach(function(line) {
        line = line.split("=")
        var name = line[0]
        var value = line[1]
        str = name+' = '+value;
        eval(str)
    })
}

client.on('ready', () => {
    activity()
    setInterval(activity, 60000)
    console.log(`Online`)
})

function activity() {
    client.user.setActivity(config_status, {type: config_statustype})
}


var cmdmap = {
    news : cmd_news
}

function cmd_news(msg, args) {
    if(msg.member.roles.cache.has(config_role) == false) {console.log(`Error: ${msg.user.tag} doesnt have the role`); return false}
    if(msg.channel.id == config_botchannel) {console.log(`Error: ${msg.user.tag} used the wrong channel`); return false}
    var emb = new MessageEmbed()
        .setTitle('News')
        .setColor('FAA81A')
        .setDescription(args.join(" "))
        .setFooter(msg.author.tag, msg.author.avatarURL())
        .setTimestamp()
    client.channels.cache.get(config_channel).send("<@&" + config_pingrole + ">", emb).then(p => { if(config_post == "true") {p.crosspost()}; })
    console.log("Worked")
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