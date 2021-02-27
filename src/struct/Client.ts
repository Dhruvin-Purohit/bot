import { CommandHandler, AkairoClient } from 'discord-akairo';
import { IntentsString, BitFieldResolvable, PresenceData, PartialTypes, Intents } from 'discord.js';
import { join } from 'path';
import { content } from '../constants/data/base';
import { data } from '../constants/data/dev-config';

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

	public CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "commands"),
		prefix: content.bot.prefix,
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		ignoreCooldown: data.bot.owners,
		ignorePermissions: data.bot.owners,
		automateCategories: true,
		//prompts are being skipped atm.
	})

	public async start() {
		this.CommandHandler.loadAll()
		//Command handler initiation etc goes above this, this goes at the end. nothing after this.
		return await this.login(this.token);
	}
}
