import { AkairoClient } from 'discord-akairo';
import { languages } from '../constants/texts/locale';

import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { MessageEmbedOptions } from 'discord.js';
import { TextChannel } from 'discord.js';
import { NewsChannel } from 'discord.js';
import { DMChannel } from 'discord.js';
import { User } from 'discord.js';
import { GuildMember } from 'discord.js';

export class BaseContext {
	public client: AkairoClient | undefined;
	public constructor(client?: AkairoClient) {
		this.client = client;
	}

	//This simply returns as default language of the bot. will be added to config later.
	public get locale() {
		return languages['EN-US'];
	}

	//I really don't want to use any but idk what to do.
	public randomInArray(arr: Array<any>) {
		return arr[this.random(0, arr.length)]!;
	}

	public random(minimum: number, maximum: number) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}

	public reduceString(str: string, len: number = 2000, use3dots?: boolean) {
        if(!use3dots) use3dots = true
		return str.length > len ? `${str.substr(0, use3dots ? len - 3 : len)}${use3dots ? "..." : ""}` : str;
	}

	public wait(timeInMS: number) {
		return new Promise((resolve) => setTimeout(resolve, timeInMS));
	}

	public parseStringFromCodeBlock(str: string) {
		let rgx = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;
		if (rgx.test(str)) {
			let parsed = rgx.exec(str);
			if (!parsed) return str;
			return parsed[2] || str;
		}
		return str;
	}

	/**
	 * Fetches the given things if thay are partial, good for caching.
	 */
	public async fetchTheseIfPartial(
		...what: (
			| Message
			| GuildMember
			| User
			| DMChannel
			| NewsChannel
			| TextChannel
			| null
		)[]
	) {
		//i want to do that thing in which it takes that as something and returns it as is.
		let returnArray = [];
		for (let thing of what) {
			//to check for null
			if (thing) {
				await this.fetchIfPartial(thing);
				returnArray.push(thing);
			}
		}
		return returnArray;
	}

	/**
	 * Fetches the given thing if it is partial, good for caching.
	 */
	public async fetchIfPartial(
		what:
			| Message
			| GuildMember
			| User
			| DMChannel
			| NewsChannel
			| TextChannel,
	) {
		//i want to do that thing in which it takes that as something and returns it as is. also i fucked up here, idk how to make this an array of things and not just singleton array
		if (what instanceof TextChannel || what instanceof NewsChannel)
			return what;
		if (what.partial) await what.fetch();
		return what as typeof what;
	}

	/**
	 * Returns a MessageEmbed with default color for client and timestamp
	 * Warning: The color and timestamp are overridden so you will have to reinitialize them.
	 */
	public embed(data?: MessageEmbed | MessageEmbedOptions | undefined) {
		return new MessageEmbed(data)
			.setColor(this.client?.baseColor || '') //default color for embeds
			.setTimestamp(new Date());
	}
}
