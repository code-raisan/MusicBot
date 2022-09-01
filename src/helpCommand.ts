import { Client, EmbedBuilder } from "discord.js"
import env from "./env"
import { Log } from "./utils"

export default async (interaction: any, client: Client): Promise<void> =>{
    interaction.reply({ embeds: [
        new EmbedBuilder()
        .setTitle("アマガエル")
        .setDescription("仮")
        .addFields([
            { name: "使い方", value: "`/meshitero <query: 検索ワード>`" },
            { name: "INFO", value: `\`\`\`Servers: ${client.guilds.cache.size}\nPing: ${client.ws.ping}ms\nVersion: v${env.VERSION}\`\`\`` },
            { name: "Links", value: `[Github](${env.REPO_URL})` }
        ])
    ] }).catch((e: Error) =>{
        return Log({
            type: "error",
            content: e.message
        });
    });
};
