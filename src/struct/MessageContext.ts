import { AkairoClient } from 'discord-akairo';
import { debug } from '../constants/data/emojis';
import { languages } from '../constants/texts/locale';

import {
	EmojiIdentifierResolvable,
	Message,
	MessageEmbed,
	MessageOptions,
	MessageEmbedOptions,
} from 'discord.js';

export class MessageContext {
	public message: Message;
	public constructor(message: Message) {
		this.message = message;
	}

	public async send(
		content?: string | MessageEmbed,
		options: MessageOptions = {},
	) {
		if (content instanceof MessageEmbed) {
			options = { ...options, embed: content };
			content = undefined;
		}
		return await this.message.channel.send(content, options);
	}

	public get client() {
		return this.message.client as AkairoClient;
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

	public get locale() {
		//TODO
		return languages['EN-US'];
	}

	/**
	 * Sends a message that is deleteable with a reaction to the message.
	 */
	public async sendDeleteable(
		message: {
			content?: string | MessageEmbed;
			options?: MessageOptions;
		},
		deleteable: {
			emoji?: EmojiIdentifierResolvable;
			userIDs: string | string[];
			time?: number;
		},
	) {
		let msg = await this.send(message.content, message.options);
		if (Array.isArray(msg)) {
			if (!msg[0]) return undefined;
			msg = msg[0];
		}
		let emoji = deleteable.emoji || debug.bin;
		let rctn = await msg.react(emoji);
		try {
			let confirmation = msg.awaitReactions(
				(
					reaction,
					user, //the next line, (Line 69) is where this thing breaks, i fucking hate how bad discord.js has made this.
				) =>
					reaction.emoji.name === emoji &&
					Array.isArray(deleteable.userIDs)
						? deleteable.userIDs.includes(user.id)
						: user.id === deleteable.userIDs,
				{
					time: deleteable.time || 60 * 1000, //1 minute
					errors: ['time'],
				},
			);
			if (await confirmation) return await msg.delete();
			else {
				return await rctn.remove();
			}
		} catch (e) {
			return await rctn.remove();
		}
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
	public embed(data?: MessageEmbed | MessageEmbedOptions | undefined) {
		return new MessageEmbed(data)
			.setColor(this.client.baseColor) //default color for embeds
			.setTimestamp(new Date());
	}
}
