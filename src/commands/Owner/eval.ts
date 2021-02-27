import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { inspect } from 'util';
import { MessageContext } from '../../struct/MessageContext';

export default class extends Command {
	public constructor() {
		super('COMMAND_EVAL', {
			aliases: ['eval', 'ev'],
			ownerOnly: true,
			args: [
				{
					id: 'silent',
					flag: ['--silent', '--s'],
					match: 'flag',
				},
				{
					id: 'del',
					flag: ['--delete', '--del', '--d'],
					match: 'flag',
				},
				{
					id: 'toEval',
					match: 'rest',
				},
			],
		});
	}

	public async exec(
		message: Message,
		{
			silent,
			del,
			toEval,
		}: { silent: boolean; del: boolean; toEval: string },
	) {
		let ctx = new MessageContext(message);

		let resp: string;
		let err = false;

		if (del) {
			ctx.message.delete().catch(() => {});
		}
		let embed = ctx
			.embed()
			.setFooter(ctx.locale.COMMAND.EVAL.EMBED_FOOTER(ctx));

		try {
			if (
				toEval.includes('await') &&
				!ctx.message.content.includes('\n')
			) {
				toEval = '( async () => {return ' + toEval + '})()';
			} else if (
				toEval.includes('await') &&
				ctx.message.content.includes('\n')
			) {
				toEval = '( async () => {' + toEval + '})()';
			}
			resp = await eval(toEval);
		} catch (e) {
			err = true;
			resp = e.toString();
		}

		if (typeof resp != 'string') {
			resp = inspect(resp, { depth: 3 });
		}
		if (silent) return;

		let len = `\`\`\`js\n${resp}\n\`\`\``.length;

		embed
			.setTitle(ctx.locale.COMMAND.EVAL.EMBED_TITLE(err))
			.setDescription(
				`\`\`\`js\n${resp.substr(0, 2038) || '\u200b'}\n\`\`\``,
			)
			.setColor(err ? 'RED' : 'GREEN');

		if (len >= 2049) {
			console.log(
				ctx.locale.COMMAND.EVAL.CONSOLE_RESPONSE(ctx, len, resp),
			);
			embed.addField(
				ctx.locale.COMMAND.EVAL.EMBED_FIELD_TOO_LONG_TITLE,
				ctx.locale.COMMAND.EVAL.EMBED_FIELD_TOO_LONG_VALUE(len),
			);
		}

		return ctx.sendDeleteable(
			{
				content: embed,
			},
			{
				userIDs: ctx.author.id,
			},
		);
	}
}
