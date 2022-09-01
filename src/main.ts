import { Client, GatewayIntentBits, InteractionType } from "discord.js";
import env from "./env";
import { Log } from "./utils";
import musicPlay from "./play";
import helpCommand from "./helpCommand";
import slashcommands from "./slashcommands";

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once("ready", async () =>{
    await client.application?.commands.set(slashcommands, env.DEBUG_GUILD_ID == undefined?"":env.DEBUG_GUILD_ID);

    setInterval(() =>{
        client.user?.setActivity({
            name: `/help | ${client.guilds.cache.size}ｻｰﾊﾞｰ `
        });
    }, 5000);
    
    Log({
        type: "info",
        content: "Ready"
    });
});

client.on("interactionCreate", async (interaction: any) =>{
    if(interaction.type !== InteractionType.ApplicationCommand) return;

    switch(interaction.commandName){
        case "music":
            switch(interaction.options.getSubcommand()){
                case "play":
                    return await musicPlay(interaction);
            }
        case "help":
            return await helpCommand(interaction, client);
    }
});

client.on("shardError", (e: Error) => Log({
    type: "error",
    content: e.message
}));

client.login(env.TOKEN);

//process.on("uncaughtException", (e: any) => console.log(e));
