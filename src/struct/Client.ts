import { AkairoClient } from 'discord-akairo';
import { IntentsString } from 'discord.js';
import { BitFieldResolvable } from 'discord.js';
import { PresenceData } from 'discord.js';
import { PartialTypes } from 'discord.js';
import { Intents } from 'discord.js';

declare module 'discord-akairo' {
	interface AkairoClient {
		baseColor: string | number;
		token: string;
	}
}

export class Client extends AkairoClient {
	public token;

	public constructor(options: {
		owners?: string | string[];
		token: string;
		partials?: PartialTypes[];
		presence?: PresenceData;
		intents?: BitFieldResolvable<IntentsString> | undefined;
	}) {
		super(
			{
				ownerID: options.owners,
			},
			{
				partials: options.partials || [
					'MESSAGE',
					'REACTION',
					'USER',
					'CHANNEL',
					'GUILD_MEMBER',
				],
				presence: options.presence,
				ws: {
					intents: options.intents || Intents.ALL,
				},
			},
		);
		this.token = options.token;
	}
	public baseColor = '';

	public async start() {
		//Command handler initiation etc goes above this, this goes at the end. nothing after this.
		return await this.login(this.token);
	}
}
