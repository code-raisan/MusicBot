import { EmbedBuilder } from "discord.js";

const Log = ({ type, content }: {type: string, content: string}): void =>{
    switch(type){
        case "info":
            console.log(`[INFO] ${content}`);
            break;
        case "error":
            console.log(`[ERROR] ${content}`);
            break;
    }
}

interface EmbedType {
    title: string,
    content: string
};

const embedError = ({title, content}: EmbedType): EmbedBuilder =>{
    return new EmbedBuilder().setColor("#ff8989").setTitle(title).setDescription(content);
};

const embedSuccess = ({title, content}: EmbedType): EmbedBuilder =>{
    return new EmbedBuilder().setColor("#c4ff89").setTitle(title).setDescription(content);
};

export { embedError, embedSuccess, Log };
