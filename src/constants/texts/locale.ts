import { MessageContext } from '../../struct/MessageContext';
import { CommandHandler } from 'discord-akairo';
//This file contains Text that are mostly command responces or just reponses to a user. This will be highly useful if i get translators.
//If you edit this, you are expected to edit the Values (after the ":") and not the Identifiers (before the ":")
export let languages = {
	'EN-US': {
		COMMAND: {
			EVAL: {
				EMBED_FOOTER(ctx: MessageContext) {
					return `Eval command executed by ${ctx.author.tag}`;
				},
				EMBED_TITLE(err: boolean) {
					return err ? 'ERROR' : 'SUCCESS';
				},
				CONSOLE_RESPONSE(ctx: MessageContext, len: number, resp: string,) {
					return `An eval command executed by ${ctx.author.tag}'s response was too long (${len}/2048) the response was:\n${resp}`;
				},
				EMBED_FIELD_TOO_LONG_TITLE: 'Note:',
				EMBED_FIELD_TOO_LONG_VALUE(len: number) {
					return `The response was too long with a length of \`${len}/2048\` characters. it was logged to the console`;
				},
			},
            DEBUG: {
                GUILD_DEBUG_INFO(ctx: MessageContext, emojis: {check: string, cross: string}, cmdh: CommandHandler) {
                    if(!ctx.guild || !ctx.guild.me) return this.NON_GUILD_DEBUG_INFO(ctx, cmdh)
                    let str = `This is the debug menu. This can be used to check if the bot has permissions that are needed for proper functioning.\n` +
                    `\n\n` +
                    `**Miscellaneous Information**\n\n` +
                    `\`         Bot Prefix\`` + "    " + `\`${cmdh.prefix}\`` + `\n` +
                    `\`            User ID\`` + "    " + `\`${ctx.author.id}\`` + `\n` +
                    `\`         Channel ID\`` + "    " + `\`${ctx.channel.id}\`` + `\n` +
                    `\`          Server ID\`` + "    " + `\`${ctx.guild.id}\`` + `\n` +
                    `\`        API Latency\`` + "    " + `\`${ctx.message.client.ws.ping}\`` +
                    `\`        Bot Latency\`` + "    " + `\`GOTTA DO THAT PING THING HERE\`` +
                    `\n\n` + 
                    `**Server Permissions**\n\n` +
                    `\`      Send Messages\`` + "    " + `${ctx.hasPermission('SEND_MESSAGES') ? emojis.check : emojis.cross}` + `\n` +
                    `\`       View Channel\`` + "    " + `${ctx.hasPermission('VIEW_CHANNEL') ? emojis.check : emojis.cross}` + `\n` +
                    `\`Use External Emojis\`` + "    " + `${ctx.hasPermission('USE_EXTERNAL_EMOJIS') ? emojis.check : emojis.cross}` + `\n` +
                    `\`      Add Reactions\`` + "    " + `${ctx.hasPermission('ADD_REACTIONS') ? emojis.check : emojis.cross}` + `\n` +
                    `\`        Send Embeds\`` + "    " + `${ctx.hasPermission('EMBED_LINKS') ? emojis.check : emojis.cross}` +
                    `\n\n` +
                    `**Channel Permissions**\n\n` +
                    `\`      Send Messages\`` + "    " + `${ctx.hasPermissionInChannel('SEND_MESSAGES') ? emojis.check : emojis.cross}` + `\n` +
                    `\`       View Channel\`` + "    " + `${ctx.hasPermissionInChannel('VIEW_CHANNEL') ? emojis.check : emojis.cross}` + `\n` +
                    `\`Use External Emojis\`` + "    " + `${ctx.hasPermissionInChannel('USE_EXTERNAL_EMOJIS') ? emojis.check : emojis.cross}` + `\n` +
                    `\`      Add Reactions\`` + "    " + `${ctx.hasPermissionInChannel('ADD_REACTIONS') ? emojis.check : emojis.cross}` + `\n` +
                    `\`        Send Embeds\`` + "    " + `${ctx.hasPermissionInChannel('EMBED_LINKS') ? emojis.check : emojis.cross}`
                    return str
                },
                NON_GUILD_DEBUG_INFO(ctx: MessageContext, cmdh: CommandHandler) {
                    let str = `This is the debug menu. This can be used to check if the bot is functioning properly.\n` +
                    `\n\n` +
                    `**Miscellaneous Information**\n\n` +
                    `\`         Bot Prefix\`` + "    " + `\`${cmdh.prefix}\`` + `\n` +
                    `\`            User ID\`` + "    " + `\`${ctx.author.id}\`` + `\n` +
                    `\`        API Latency\`` + "    " + `\`${ctx.message.client.ws.ping}\`` +
                    `\`        Bot Latency\`` + "    " + `\`GOTTA DO THAT PING THING HERE\``
                    return str
                }
            }
		},
	},
};
