const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "settings",
    alias: ["setting", "config"],
    desc: "𝐵𝑜𝑡 𝑆𝑒𝑡𝑡𝑖𝑛𝑔𝑠 𝑀𝑒𝑛𝑢",
    category: "owner",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("⚠️ *𝑂𝑤𝑛𝑒𝑟 𝑂𝑛𝑙𝑦 𝐶𝑜𝑚𝑚𝑎𝑛𝑑!*");

        const statusText = `╭━━━〔 𝑩𝑶𝑻 𝑺𝑬𝑻𝑻𝑰𝑵𝑮𝑺 〕━━━┈⊷
┃
┃ ⚙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑎𝑐𝑡:* ${config.AUTO_REACT === 'true' ? '🟢 𝑂𝑁' : '🔴 𝑂𝐹𝐹'}
┃ 🎙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑐𝑜𝑟𝑑𝑖𝑛𝑔:* ${config.AUTO_RECORDING === 'true' ? '🟢 𝑂𝑁' : '🔴 𝑂𝐹𝐹'}
┃ ✍️ *𝐴𝑢𝑡𝑜 𝑇𝑦𝑝𝑖𝑛𝑔:* ${config.AUTO_TYPING === 'true' ? '🟢 𝑂𝑁' : '🔴 𝑂𝐹𝐹'}
┃
╰━━━━━━━━━━━━━━━━━━┈⊷

*𝑼𝒔𝒂𝒈𝒆:*
⭔ .autoreact on / off
⭔ .autorecord on / off
⭔ .autotyping on / off

*© 𝑩𝑳𝑨𝑪𝑲 𝑸𝑼𝑬𝑬𝑵 𝑴𝑫*`;

        return await conn.sendMessage(from, { text: statusText }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

cmd({
    pattern: "autoreact",
    desc: "𝑇𝑢𝑟𝑛 𝑜𝑛/𝑜𝑓𝑓 𝑎𝑢𝑡𝑜 𝑟𝑒𝑎𝑐𝑡",
    category: "owner",
    react: "💖",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, isOwner }) => {
    if (!isOwner) return reply("⚠️ *𝑂𝑤𝑛𝑒𝑟 𝑂𝑛𝑙𝑦 𝐶𝑜𝑚𝑚𝑎𝑛𝑑!*");
    if (!args[0]) return reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autoreact on / off");

    if (args[0].toLowerCase() === "on") {
        config.AUTO_REACT = "true";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑎𝑐𝑡 𝑖𝑠 𝑛𝑜𝑤 𝐸𝑛𝑎𝑏𝑙𝑒𝑑 (𝑂𝑁)* 🟢");
    } else if (args[0].toLowerCase() === "off") {
        config.AUTO_REACT = "false";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑎𝑐𝑡 𝑖𝑠 𝑛𝑜𝑤 𝐷𝑖𝑠𝑎𝑏𝑙𝑒𝑑 (𝑂𝐹𝐹)* 🔴");
    } else {
        reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autoreact on / off");
    }
});

cmd({
    pattern: "autorecord",
    desc: "𝑇𝑢𝑟𝑛 𝑜𝑛/𝑜𝑓𝑓 𝑎𝑢𝑡𝑜 𝑟𝑒𝑐𝑜𝑟𝑑𝑖𝑛𝑔",
    category: "owner",
    react: "🎙️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, isOwner }) => {
    if (!isOwner) return reply("⚠️ *𝑂𝑤𝑛𝑒𝑟 𝑂𝑛𝑙𝑦 𝐶𝑜𝑚𝑚𝑎𝑛𝑑!*");
    if (!args[0]) return reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autorecord on / off");

    if (args[0].toLowerCase() === "on") {
        config.AUTO_RECORDING = "true";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑐𝑜𝑟𝑑𝑖𝑛𝑔 𝑖𝑠 𝑛𝑜𝑤 𝐸𝑛𝑎𝑏𝑙𝑒𝑑 (𝑂𝑁)* 🟢");
    } else if (args[0].toLowerCase() === "off") {
        config.AUTO_RECORDING = "false";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑅𝑒𝑐𝑜𝑟𝑑𝑖𝑛𝑔 𝑖𝑠 𝑛𝑜𝑤 𝐷𝑖𝑠𝑎𝑏𝑙𝑒𝑑 (𝑂𝐹𝐹)* 🔴");
    } else {
        reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autorecord on / off");
    }
});

cmd({
    pattern: "autotyping",
    desc: "𝑇𝑢𝑟𝑛 𝑜𝑛/𝑜𝑓𝑓 𝑎𝑢𝑡𝑜 𝑡𝑦𝑝𝑖𝑛𝑔",
    category: "owner",
    react: "✍️",
    filename: __filename
},
async (conn, mek, m, { from, args, reply, isOwner }) => {
    if (!isOwner) return reply("⚠️ *𝑂𝑤𝑛𝑒𝑟 𝑂𝑛𝑙𝑦 𝐶𝑜𝑚𝑚𝑎𝑛𝑑!*");
    if (!args[0]) return reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autotyping on / off");

    if (args[0].toLowerCase() === "on") {
        config.AUTO_TYPING = "true";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑇𝑦𝑝𝑖𝑛𝑔 𝑖𝑠 𝑛𝑜𝑤 𝐸𝑛𝑎𝑏𝑙𝑒𝑑 (𝑂𝑁)* 🟢");
    } else if (args[0].toLowerCase() === "off") {
        config.AUTO_TYPING = "false";
        reply("⚙️ *𝐴𝑢𝑡𝑜 𝑇𝑦𝑝𝑖𝑛𝑔 𝑖𝑠 𝑛𝑜𝑤 𝐷𝑖𝑠𝑎𝑏𝑙𝑒𝑑 (𝑂𝐹𝐹)* 🔴");
    } else {
        reply("📌 *𝑈𝑠𝑎𝑔𝑒:* .autotyping on / off");
    }
});
