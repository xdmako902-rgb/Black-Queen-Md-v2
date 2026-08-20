const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "ai",
    alias: ["gpt", "ask", "bot"],
    desc: "𝑨𝒔𝒌 𝒂𝒏𝒚𝒕𝒉𝒊𝒏𝒈 𝒇𝒓𝒐𝒎 𝑨𝑰",
    category: "main",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❓ *𝑷𝒍𝒆𝒂𝒔𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒂 𝒒𝒖𝒆𝒔𝒕𝒊𝒐𝒏!*\n*𝑬𝒙:* .ai Sinhala songs list");

        await reply("⏳ *𝑻𝒉𝒊𝒏𝒌𝒊𝒏𝒈...*");

        const response = await axios.get(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&query=${encodeURIComponent(q)}`);
        
        if (response.data && response.data.result) {
            const aiReply = `🤖 *𝑩𝑳𝑨𝑪𝑲 𝑸𝑼𝑬𝑬𝑵 𝑨𝑰*\n\n${response.data.result}\n\n*© 𝑩𝑳𝑨𝑪𝑲 𝑸𝑼𝑬𝑬𝑵 𝑴𝑫*`;
            await conn.sendMessage(from, { text: aiReply }, { quoted: mek });
        } else {
            reply("❌ *𝑨𝑰 𝒔𝒆𝒓𝒗𝒊𝒄𝒆 𝒖𝒏𝒂𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒆. 𝑻𝒓𝒚 𝒂𝒈𝒂𝒊𝒏 𝒍𝒂𝒕𝒆𝒓.*");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
