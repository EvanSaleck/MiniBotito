const { REST, Routes, EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, Events, ClientPresence, SlashCommandBuilder } = require('discord.js');
const { Client, ActivityType, GatewayIntentBits,GuildChannelManager, GuildMemberManager, Partials } = require('discord.js');
const { TIMEOUT } = require('dns');

const fs = require('fs');

let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Config 

const token = config.token;
const CLIENT_ID = config.id
const prefix = config.prefix;

const commands = [];


// Création du client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildIntegrations,
  ],
});



// Marque si le bot est prêt
client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag} !`);
  console.log(`Nombre de serveurs : ${client.guilds.cache.size}`);
  console.log(`Noms des serveurs : ${client.guilds.cache.map(g => g.name).join(', ')}`);
  // console.log(client); // Affiche toutes les informations du bot
  client.user.setPresence({
    activities: [{ name: `Développer` , type: ActivityType.Playing }],
    status: 'online',
  });
});




// Login
client.login (token) ;


const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Rafraichissement des commandes (/) discord.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Succès du rafraichissement des commandes (/).');
  } catch (error) {
    console.error(error);
  }
})();


client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.on("messageCreate", (message) => {
  // contient quoi a la fin
  if (message.content.toLowerCase().includes("quoi") || message.content.toLowerCase().includes === "quoi ?" || message.content.toLowerCase().includes === "koi" && message.authorId !== client.user.idz) {
    // Fait en sorte de repondre une fois sur deux feur et une fois sur deux quoi
    if (Math.random() < 0.5) {
      message.reply("feur");
    }
    else if (Math.random() < 0.5){
      message.reply("quoicoubeh");
    }
    else {
      message.reply("feuse");
    }
  }
});

client.on("messageCreate", (message) => {
  console.log(message);
});

client.on("messageCreate", (message) => {
// assuming role.id is an actual ID of a valid role:
if (message.member.roles.cache.some(r=>["noir"].includes(r.name))) {
  message.reply("Salut, moi je suis blanc")
} else if (message.author === "Pimpin") {
  message.reply("token : 123456789")
}
});

// Si un user a l'username de Mini ! alors message.react
client.on("messageCreate", (message) => {
  if (message.author.username === "Mini !" && message.content==="ratio" || message.author.username === "Mini !" && message.content==="Ratio" || message.author.username === "Mini !" && message.content==="RATIO" || message.author.username === "Mini !" && message.content === "flop" || message.author.username === "Mini !" && message.content === "Flop" || message.author.username === "Mini !" && message.content === "FLOP") {
    message.react("❤️");
  }
});

client.on("messageCreate", (message) => {
  // ajoute un nombre qui dit combien de fois il spam le message
  if (message.content === "spamgabin" ) {
    for (let pas = 0; pas < 100; pas++) {
      // Ceci sera exécuté 5 fois
      // À chaque éxécution, la variable "pas" augmentera de 1
      // Lorsque'elle sera arrivée à 5, le boucle se terminera.
      message.channel.send("<@381770810806894612>")
    }
  }
});

client.on("messageCreate", (message) => {
  // ajoute un nombre qui dit combien de fois il spam le message
  if (message.content === "spammini" ) {
    for (let pas = 0; pas < 10; pas++) {
      // Ceci sera exécuté 5 fois
      // À chaque éxécution, la variable "pas" augmentera de 1
      // Lorsque'elle sera arrivée à 5, le boucle se terminera.
      message.channel.send("<@701539502648197131>")
      message.channel.send("spamgabin")
    }
  }
});

// client.on("messageCreate", (message) => {
//   // @everyone tout le monde si il y a un message
//   console.log(message);
//   if (message) {
//     message.channel.send("@everyone");
//   }
// });
  

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    switch(command) {
      case "ping":
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Ce message a mis ${timeTaken}ms.`);

        break;
      case "aide":
        message.react("👍");
        // Creer un embed
        const embed = new EmbedBuilder()
        // Souligner le titre
          .setTitle("Aide")
          .setDescription("Voici les commandes disponibles ( Clique sur le titre pour voir la video )")
          // Set une deuxieme description
          .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")


          // utilise l'image du bot
          .setThumbnail(client.user.avatarURL())
          .addFields(
            { name: prefix+'ping', value: 'Test la connexion du bot' },
            { name: prefix+'test', value: 'test' },
            { name: 'Field 3', value: 'Value 3' },
          )
          .setColor(2123412)
          //.setFooter("Aide")
          .setTimestamp(new Date())

        message.reply({ embeds: [embed] });

      break;

      case "ticket":
        const modal = new ModalBuilder()
            
            .setTitle("Ticket")
            .setCustomId("ticket")
            .addTextInput(new TextInputBuilder()
                .setCustomId("question")
                .setPlaceholder("Votre question")
                .setMinLength(1)
                .setMaxLength(1000)
            )
            .addButton(new ButtonBuilder()

                .setCustomId("submit")  
                .setLabel("Envoyer")
                .setStyle("PRIMARY")
            )
            .addButton(new ButtonBuilder()

                .setCustomId("cancel")
                .setLabel("Annuler")
                .setStyle("DANGER")
            )
            .setDisabled(false)
            .setEmoji("📩")
            .setStyle("PRIMARY")

        message.reply({ embeds: [modal] });

      break;



    }
  }
});












