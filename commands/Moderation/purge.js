const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
    return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100 !");

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#287db5")
    .setDescription(
      `**Action**: purge\n**Nbr de messages**: ${args[0]}\n**Salon**: ${message.channel}`
    );

  client.channels.cache.get("812654959261777940").send({embeds: [embed]});
};

module.exports.help = {
  name: "purge",
  aliases: ["purge", "clean", "clear"],
  category: "moderation",
  description: "Purge un nombre de message spécifié",
  cooldown: 1,
  usage: "<nbr_messages>",
  isUserAdmin: false,
  permissions: true,
  args: true,
};
