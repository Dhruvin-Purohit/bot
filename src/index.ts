import { data } from "./constants/data/dev-config";
import { Client } from "./struct/Client";

export let client = new Client({
    owners: data.bot.owners,
    token: data.bot.token
})

client.start()
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`)
})