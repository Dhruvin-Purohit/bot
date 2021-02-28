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
		await ctx.init()

		let emojis = {
			check: ctx.hasPermissionInChannel(
				'USE_EXTERNAL_EMOJIS'
			)
				? `${debug.checkmark}`
				: `✔️`,
			cross: ctx.hasPermissionInChannel(
				'USE_EXTERNAL_EMOJIS'
			)
				? `${debug.crossmark}`
				: `❌`,
		};
//this thing checks for non-guild etc, nothing should go after this.
		return await ctx.send(
			ctx.locale.COMMAND.DEBUG.GUILD_DEBUG_INFO(
				ctx,
				emojis,
				this.handler,
			),
		);
	}
}
