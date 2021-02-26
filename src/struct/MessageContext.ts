import { AkairoClient } from 'discord-akairo';
import {
	Collection,
	EmojiIdentifierResolvable,
	Message,
	MessageEmbed,
	MessageOptions,
	MessageReaction,
	MessageEmbedOptions,
} from 'discord.js';

export class MessageContext {
	public message: Message;
	public constructor(message: Message) {
		this.message = message;
	}

	public async send(content: string | MessageEmbed, options: MessageOptions) {
		return await this.message.channel.send(content, options);
	}

    public get client() {
        return this.message.client as AkairoClient
    }

	public get author() {
		return this.message.author;
	}

	public get channel() {
		return this.message.channel;
	}

	public get guild() {
		return this.message.guild;
	}

	public get member() {
		return this.message.member;
	}

	/**
	 * Sends a message that is deleteable with a reaction to the message.
	 */
	public async sendDeleteable(
		message: {
			content: string | MessageEmbed;
			options: MessageOptions;
		},
		deleteable: {
			emoji: EmojiIdentifierResolvable;
			userIDs: string | string[];
			time: number;
		},
	) {
		let msg = await this.send(message.content, message.options);
		if (Array.isArray(msg)){
			if(!msg[0]) return undefined
			msg = msg[0];
		}
		let rctn = await msg.react(deleteable.emoji);
		let resp: Collection<string, MessageReaction>;
		try {
			resp = await msg.awaitReactions(
				(reaction, user) =>
					reaction.emoji.name === rctn.emoji.name &&
					Array.isArray(deleteable.userIDs)
						? deleteable.userIDs.includes(user.id)
						: user.id === deleteable.userIDs,
				{
					time: deleteable.time || 60 * 1000, //1 minute
					errors: ['time'],
				},
			);
		} catch (e) {
			return rctn.remove();
		}
		return resp ? resp.first()?.message.delete() : undefined;
	}

	public async init(): Promise<MessageContext> {
		if (this.message.partial) await this.message.fetch();
		if (this.member?.partial) await this.member.fetch();
		if (this.author.partial) await this.author.fetch();
		if (this.channel.type === 'dm') {
			if (this.channel.partial) await this.channel.fetch();
		}
		return this;
	}

	/**
	 * Returns a MessageEmbed with default color for client and timestamp
	 * Warning: The color and timestamp are overridden so you will have to reinitialize them.
	 */
	public embed(data: MessageEmbed | MessageEmbedOptions | undefined) {
		return new MessageEmbed(data)
			.setColor(this.client.baseColor) //default color for embeds
			.setTimestamp(new Date());
	}
}
