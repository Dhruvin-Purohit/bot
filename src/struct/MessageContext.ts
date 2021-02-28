import { AkairoClient } from 'discord-akairo';
import { debug } from '../constants/data/emojis';
import { languages } from '../constants/texts/locale';

import { Message } from 'discord.js';
import { MessageOptions } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { TextChannel } from 'discord.js';
import { NewsChannel } from 'discord.js';
import { DMChannel } from 'discord.js';
import { User } from 'discord.js';
import { GuildMember } from 'discord.js';
import { Role } from 'discord.js';
import { PermissionResolvable } from 'discord.js';
import { MessageReaction } from 'discord.js';
import { BaseContext } from './BaseContext';

export class MessageContext extends BaseContext {
	public message: Message;
	public constructor(message: Message) {
		super(message.client as AkairoClient)
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
	//I guess ths will do it? because now it has to be defined
	public client: AkairoClient = this.client!

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

	//not the same, this one will invlolve going through db and all.
	public get locale() {
		//TODO
		return languages['EN-US'];
	}

	public hasPermission(perm: PermissionResolvable) {
		if(!this.guild) return true
		return this.guild.me?.hasPermission(perm) || false
	}

	public hasPermissionInChannel(perm: PermissionResolvable, thing?: string | Message | User | GuildMember | Role | null, chn?: TextChannel|NewsChannel|DMChannel): boolean {
		if(!chn) chn = this.channel
		if(chn instanceof DMChannel) return true
		if(!thing) thing = this.client.user!
		return chn.permissionsFor(thing)?.has(perm) || false
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
			emoji?: string;
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
					reaction: MessageReaction,
					user: User, //the next line, (Line 69) is where this thing breaks, i fucking hate how bad discord.js has made this.
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
		await this.fetchTheseIfPartial(this.message, this.author, this.member, this.channel)
		await this.fetchIfPartial(this.message)
		return this;
	}

}
