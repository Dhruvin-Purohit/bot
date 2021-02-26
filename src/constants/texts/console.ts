//This file contains Text that is logged to console (i.e. ready event, command run event, debug event, etc.)
//If you edit this, you are expected to edit the Values (after the ":") and not the Identifiers (before the ":")
export let text = {
	LISTENERS: {
		CLIENT_DEBUG_READY_TEXT: 'Successfully Logged in as $cl_tag.',
		COMMAND_HANDLER_COMMAND_STARTED_DEBUG_TEXT:
			'$usr_tag ran $cmd in $g_name ($g_id).',
		COMMAND_HANDLER_COMMAND_BLOCKED_DEBUG_TEXT:
			'Command $cmd was blocked with reason $rsn.',
	},
};
