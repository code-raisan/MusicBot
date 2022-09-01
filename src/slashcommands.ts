import { ApplicationCommandDataResolvable, ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

const commands: ApplicationCommandDataResolvable[] = [
    {
        name: "help",
        description: "このBotの使い方を見れます",
        type: 1 // ApplicationCommandType.ChatInput
    },
    {
        name: "music",
        description: "音楽を再生します",
        type: 1, // ApplicationCommandType.ChatInput
        options: [
            {
                name: "play",
                description: "YouTubeを再生します",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "url",
                        description: "YouTubeのURLを入れてください",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    }
                ]
            },
            {
                name: "stop",
                description: "停止します",
                type: ApplicationCommandOptionType.Subcommand,
            }
        ]
    }
]

export default commands;