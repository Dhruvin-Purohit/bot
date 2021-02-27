import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { debug } from '../../constants/data/emojis';
import { MessageContext } from '../../struct/MessageContext';

export default class extends Command {
	public constructor() {
		super('COMMAND_DEBUG', {
			aliases: ['debug', 'test', 'ping'],
		});
	}

	public async exec(message: Message) {
		let ctx = new MessageContext(message);

		let emojis = {
			check: !ctx.guild
				? `${debug.checkmark}`
				: ctx.guild.me?.hasPermission('USE_EXTERNAL_EMOJIS')
				? `${debug.checkmark}`
				: `✔️`,
			cross: !ctx.guild
				? `${debug.crossmark}`
				: ctx.guild.me?.hasPermission('USE_EXTERNAL_EMOJIS')
				? `${debug.crossmark}`
				: `❌`,
		};

		if (!ctx.guild || !ctx.guild.me)
			return ctx.send(ctx.locale.COMMAND.DEBUG.NON_GUILD_DEBUG_INFO(ctx, this.handler));

		return await ctx.send(
			ctx.locale.COMMAND.DEBUG.GUILD_DEBUG_INFO(
				ctx,
				emojis,
				this.handler,
			),
		);
	}
}
