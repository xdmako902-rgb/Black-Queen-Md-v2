const { cmd, commands } = require('../command'); 
const os = require('os');
const moment = require('moment-timezone');

const botLogo = "https://i.ibb.co/FbXLJxw4/b6980c118e1b.jpg";

const logoTypes = [
    "neon","neon2","fire2","glitch","hacker","futuristic","thunder","devil",
    "fire","ice","snow","lava","metal","gold","silver","glossy","blackpink",
    "transformer","horror","blood","joker","galaxy","space","cloud","sand",
    "stone","magma","gradient","light","paper","watercolor","candy","christmas",
    "luxury","leaf","summer","circuit","block3d","cartoon","chrome","frozen"
];

const channelLink = "https://whatsapp.com/channel/0029VbDWcyuATRSrD3z0kS3F";

// Newsletter Context Header Setup
const newsletterContext = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: "120363363363363363@newsletter",
        newsletterName: "𝐁𝐋𝐀𝐂𝐊 𝐐𝐔𝐄𝐄𝐍 𝐌𝐃 🖤!",
        serverMessageId: 1
    }
};

cmd({
    pattern: "menu",
    alias: ["panel", "list", "commands"],
    desc: "Show main menu.",
    category: "main",
    react: "🌈",
    filename: __filename
},
async (conn, mek, m, { from, pushname, prefix, reply }) => {
    try {
        let hostname = os.hostname();
        if (hostname.length === 12) hostname = 'Replit';
        else if (hostname.length === 36) hostname = 'Heroku';
        else if (hostname.length === 8) hostname = 'Koyeb';
        else hostname = 'VPS / Local';

        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = Math.round(os.totalmem() / 1024 / 1024);
        const ramUsage = `${ramUsed}MB / ${ramTotal}MB`;

        const uptimeSeconds = process.uptime();
        const uptimeHours = Math.floor(uptimeSeconds / 3600);
        const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
        const rtime = `${uptimeHours}h ${uptimeMinutes}m`;

        const time = moment.tz('Asia/Colombo').format('HH');
        let greeting = "Good Night";
        if (time >= 4 && time < 12) greeting = "Good Morning";
        else if (time >= 12 && time < 17) greeting = "Good Afternoon";
        else if (time >= 17 && time < 20) greeting = "Good Evening";

        const menuText = `⟡───« ʙ ʟ ᴀ ᴄ ᴋ - Q ᴜ ᴇ ᴇ ɴ - ᴍ ᴅ »───⟡
│
│ ⊳ *𝐇𝐞𝐲𝐲 ${pushname || 'User'}, ${greeting}!*
│
│ ◈ ᴠᴇʀꜱɪᴏɴ : 1.0.0
│ ◈ ᴏᴡɴᴇʀ  : ᴍᴀᴋᴏ xᴅ ヤ
│ ◈ ʀᴀᴍ   : ${ramUsage}
│ ◈ ᴜᴘᴛɪᴍᴇ : ${rtime}
│ ◈ ʜᴏꜱᴛ   : ${hostname}
│
╰───────────────⟡

╭───────────────╮
*│  ʙʟᴀᴄᴋ Qᴜᴇᴇɴ ᴍᴅ 🧃 │*
*│     ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ     │*
╰───────────────╯

*✦ ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ ✦*

*➊ : 🏠 ᴍᴀɪɴ ᴍᴇɴᴜ*
*➋ : 👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ*
*➌ : 👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ*
*➍ : 🎨 ʟᴏɢᴏ ᴍᴇɴᴜ*
*➎ : 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ*
*➏ : 🔎 ꜱᴇᴀʀᴄʜ ᴍᴇɴᴜ*
*➐ : 🤖 ᴀɪ ꜰᴇᴀᴛᴜʀᴇꜱ*
*➑ : 🔄 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ*
*➒ : 🛠️ ᴏᴛʜᴇʀ ᴛᴏᴏʟꜱ*

━━━━━━━━━━━━━━━━
*📢 Follow WhatsApp Channel:*
${channelLink}
━━━━━━━━━━━━━━━━
*<  ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʙʟᴀᴄᴋ Qᴜᴇᴇɴ ᴍᴅ 🦋: >*
━━━━━━━━━━━━━━━━`;

        const imgBuffer = Buffer.from(await (await fetch(botLogo)).arrayBuffer());

        const sentMsg = await conn.sendMessage(from, {
            image: imgBuffer,
            caption: menuText,
            contextInfo: newsletterContext
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {
            "1": "mainmenu",
            "2": "ownermenu",
            "3": "groupmenu",
            "4": "logomenu",
            "5": "downloadmenu",
            "6": "searchmenu",
            "7": "aimenu",
            "8": "convertmenu",
            "9": "othermenu"
        };

    } catch (e) {
        console.error(e);
        reply(`*❌ System Error!*\n\n${e.message || e}`);
    }
});

const generateSubMenu = async (conn, mek, from, category, title, pushname, reply) => {
    try {
        let cmdList = '';
        for (let i = 0; i < commands.length; i++) { 
            if (commands[i].category === category && !commands[i].dontAddCommandList) {
                cmdList += `│ ⊳ *${commands[i].pattern}*\n│   ${commands[i].desc || 'No Description'}\n│\n`;
            }
        }

        if (cmdList === '') cmdList = `│ ⊳ No commands found.\n│\n`;

        let menuContent = `⟡───« ʙ ʟ ᴀ ᴄ ᴋ - Q ᴜ ᴇ ᴇ ɴ - ᴍ ᴅ »───⟡
│
│ ⊳ *${title}*
│
${cmdList}╰───────────────⟡

> 📢 *Channel:* ${channelLink}
> © ʙʟᴀᴄᴋ Qᴜᴇᴇɴ ᴍᴅ`;

        const imgBuffer = Buffer.from(await (await fetch(botLogo)).arrayBuffer());
        await conn.sendMessage(from, { 
            image: imgBuffer, 
            caption: menuContent,
            contextInfo: newsletterContext
        }, { quoted: mek });
    } catch (e) { 
        console.error(e); 
        reply('*❌ Submenu Error !!*'); 
    }
};

cmd({ 
    pattern: "logomenu", 
    dontAddCommandList: true, 
    filename: __filename 
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        let logoList = `⟡───« ʙ ʟ ᴀ ᴄ ᴋ - Q ᴜ ᴇ ᴇ ɴ - ᴍ ᴅ »───⟡
│
│ ⊳ *Lᴏɢᴏ Mᴀᴋᴇʀ Mᴇɴᴜ*
│
`;
        
        logoTypes.forEach((type, index) => {
            let num = (index + 1).toString().padStart(2, '0');
            logoList += `│ [ ${num} ] ${type.toUpperCase()}\n`;
        });

        logoList += `│
╰───────────────⟡

> _Reply with a number to generate._
> _To set custom name: .logo <name>_

> 📢 *Channel:* ${channelLink}
> © ʙʟᴀᴄᴋ Qᴜᴇᴇɴ ᴍᴅ`;

        const imgBuffer = Buffer.from(await (await fetch(botLogo)).arrayBuffer());
        const sentMsg = await conn.sendMessage(from, { 
            image: imgBuffer, 
            caption: logoList,
            contextInfo: newsletterContext
        }, { quoted: mek });

        const msgId = sentMsg.key.id;
        global.numberStore = global.numberStore || {};
        global.numberStore[msgId] = {};

        logoTypes.forEach((type, index) => {
            global.numberStore[msgId][(index + 1).toString()] = `genlogo ${type}&${pushname || 'User'}`;
        });

    } catch (e) {
        console.error(e);
        reply('*❌ Logo Menu Error!*');
    }
});

// Submenu Command Registrations
cmd({ pattern: "mainmenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'main', '𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦', pushname, reply);
});

cmd({ pattern: "ownermenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'owner', '𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦', pushname, reply);
});

cmd({ pattern: "groupmenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'group', '𝗚𝗥𝗢𝗨𝗣 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦', pushname, reply);
});

cmd({ pattern: "downloadmenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'download', '𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥𝗦', pushname, reply);
});

cmd({ pattern: "searchmenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'search', '𝗦𝗘𝗔𝗥𝗖𝗛 𝗧𝗢𝗢𝗟𝗦', pushname, reply);
});

cmd({ pattern: "aimenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'ai', '𝗔𝗜 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦', pushname, reply);
});

cmd({ pattern: "convertmenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'convert', '𝗖𝗢𝗡𝗩𝗘𝗥𝗧 𝗧𝗢𝗢𝗟𝗦', pushname, reply);
});

cmd({ pattern: "othermenu", react: "🍭", dontAddCommandList: true, filename: __filename },
async (conn, mek, m, { from, pushname, reply }) => {
    await generateSubMenu(conn, mek, from, 'other', '𝗢𝗧𝗛𝗘𝗥 𝗨𝗧𝗜𝗟𝗜𝗧𝗜𝗘𝗦', pushname, reply);
});
