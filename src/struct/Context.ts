import { Message } from "discord.js";

export class MesContext {
    public message: Message
    public constructor(message: Message) {
        this.message = message
    }
}