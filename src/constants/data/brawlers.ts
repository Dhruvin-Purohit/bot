//This file contains Client#user#username and Client#user#avatar that are set over intervals by the bot,
//(i.e. Bot changing name and avatar every "n" hours (expected to be atleast 1 hour.))
//You do not need to change this unless you actually update it due to some new brawler into the game or something


//if you edit this, you are expected to edit the Values (after the ":") and not the Identifiers (before the ":")
export let content: BrawlerRotation[] = [
    {
        name: ["Shelly", "Star Shelly", "Bandita Shelly", "PSG Shelly", "Witch Shelly"],
        image: [
            "https://media.discordapp.net/attachments/814530838828941322/814545860204822549/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814545904643342347/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814545945826951168/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814545988797726720/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814546040816533564/140.png"
        ],
        baseColor: "#a045d4"
    },
    {
        name: ["Nita", "Panda Nita", "Koala Nita", "Red Nose Nita", "Shiba Nita"],
        image: [
            "https://media.discordapp.net/attachments/814530838828941322/814546328180883536/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814546380491980810/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814546426390380634/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814546470668861490/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814546512478076958/140.png"
        ],
        baseColor: "#df4249"
    },
    {
        name: ["Colt", "Royal Agent Colt", "Corsair Colt", "Outlaw Colt", "Challenger Colt"],
        image: [
            "https://media.discordapp.net/attachments/814530838828941322/814547862817079316/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814547955017187368/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548022461071410/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548060113207297/140.png"
        ],
        baseColor: "#cd0c4fd"
    },
    {
        name: ["Bull"],
        image: [
            "https://media.discordapp.net/attachments/814530838828941322/814548339814039632/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548416977174528/143.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548447210373150/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548486061031534/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548520173305867/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814548559566733372/140.png",
            ""
        ],
        baseColor: "#232529"
    },
    {
        name: ["Jessie", "Red Dragon Jessie", "Summer Jessie", "Dragon Knight Jessie", "Tanuki Jessie", "Shadow Knight Jessie"],
        image: [
            "https://media.discordapp.net/attachments/814530838828941322/814549080498896926/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814549114184007700/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814549144236064828/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814549185444839465/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814549225232269352/140.png",
            "https://media.discordapp.net/attachments/814530838828941322/814549264365256714/140.png"
        ],//ToDo
        baseColor: 0//ToDo
    },
    {
        name: ["Brock"],
        image: [""],//ToDo
        baseColor: 0//ToDo
    },
    {
        name: ["Dynomike"],
        image: [""],//ToDo
        baseColor: 0//ToDo
    },
    {
        name: ["Bo"],
        image: [""],//ToDo
        baseColor: 0//ToDo
    },
    {
        name: ["8-Bit"],
        image: [""],//ToDo
        baseColor: 0//ToDo
    },
    {
        name: ["Emz"],
        image: [""],//ToDo
        baseColor: 0//ToDo
    },
]

//This is the type used to neglect any errors
//In the file above, the indexes of name and image should match so like if the image at index 2 is "Witch Shelly" skin image,
//the name at index 2 is expected to be "Witch Shelly", in case you might just forget to add it or maybe there is nothing at index 2
//in that case the element at index 1 is used which is supposed to be the brawlers default name although it is a good practice to add
//the names to match the image indexes.
type BrawlerRotation = {
    name: string[],
    image: string[],
    baseColor?: number|string
}