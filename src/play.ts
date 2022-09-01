import { embedError, embedSuccess, Log } from "./utils";
import { entersState, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel,  StreamType } from "@discordjs/voice";
import ytdl from "ytdl-core";

export default async (interaction: any): Promise<void> =>{
    //if(!interaction.guild) return interaction.reply({embeds: [embedError({title: "エラー", content: "DMでは使用できません"})]}).catch((e: Error) => Log({ type: "error", content: e.message }));
    const URL = interaction.options.getString("url");
    if(!ytdl.validateURL(URL)) return interaction.reply({embeds: [embedError({title: "エラー", content: "このリンクは使用できません"})]}).catch((e: Error) => Log({ type: "error", content: e.message }));
    await interaction.deferReply().catch((e: Error) => Log({ type: "error", content: e.message }));
    const UserVoiceChannel = interaction.member.voice.channel;
    if(!UserVoiceChannel) return interaction.editReply({embeds: [embedError({title: "エラー", content: "ボイスチャンネルに参加してください"})]}).catch((e: Error) => Log({ type: "error", content: e.message }));
    const connection = joinVoiceChannel({
        adapterCreator: UserVoiceChannel.guild.voiceAdapterCreator,
        channelId: UserVoiceChannel.id,
        guildId: UserVoiceChannel.guild.id,
        selfDeaf: true,
        selfMute: false,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);

    const vid = ytdl.getURLVideoID(URL);
    const vinfo = await ytdl.getInfo(vid);
    const stream = ytdl(vid, {
        filter: "audioonly",
        quality: "highest",
        highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
    });
    const resource = createAudioResource(stream, { inputType: StreamType.WebmOpus });

    player.play(resource);
    await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
    console.log(vinfo);
    interaction.editReply({embeds: [embedSuccess({title: "*Playing!*", content: `[${vinfo.videoDetails.title}](https://youtu.be/${vid})\n**[${vinfo.videoDetails.author.name}](${vinfo.videoDetails.author.channel_url})**`}).setImage(vinfo.videoDetails.thumbnails[4].url)]}).catch((e: Error) => Log({ type: "error", content: e.message }));
    await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
    interaction.followUp({embeds: [embedSuccess({title: "*Stopped*", content: "曲が終わりました"})]}).catch((e: Error) => Log({ type: "error", content: e.message }));
    connection.destroy();
}
