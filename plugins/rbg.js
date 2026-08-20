const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

// Optimized axios instance for fast API requests
const httpClient = axios.create({
    timeout: 20000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
});

cmd({
    pattern: "removebg",
    alias: ["rbg", "bgremove"],
    desc: "Remove the background of an image.",
    category: "image",
    react: "✂️",
    filename: __filename
},
async (conn, mek, m, { from, reply, quoted }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        
        if (!mime.startsWith('image/')) return reply("🚫 *𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲.*");

        const { key } = await conn.sendMessage(from, { text: "🖌️ *𝗔𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴 𝗜𝗺𝗮𝗴𝗲...*" }, { quoted: mek });

        // Download image buffer
        let media = await (q.download ? q.download() : conn.downloadMediaMessage(q));

        await conn.sendMessage(from, { text: "⬆️ *𝗨𝗽𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝘁𝗼 𝗖𝗹𝗼𝘂𝗱...*", edit: key });
        
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", media, { filename: "image.jpg", contentType: mime });

        const uploadRes = await httpClient.post("https://catbox.moe/user/api.php", form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        
        const imageUrl = uploadRes.data.trim();

        if (!imageUrl.startsWith("http")) {
            return reply("❌ *Image Upload Failed! Try again.*");
        }

        await conn.sendMessage(from, { text: "✂️ *𝗥𝗲𝗺𝗼𝘃𝗶𝗻𝗴 𝗕𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱...*", edit: key });

        const apiUrl = `https://www.movanest.xyz/v2/removebg?image_url=${encodeURIComponent(imageUrl)}`;
        const rbgResponse = await httpClient.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(from, { 
            image: Buffer.from(rbgResponse.data), 
            caption: "✅ *𝗥𝗘𝗠𝗢𝗩𝗘𝗕𝗚 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬!*\n\n> © 𝙱𝙻𝙰𝙲𝙺 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳 𝙾𝙵𝙲" 
        }, { quoted: mek });

        await conn.sendMessage(from, { text: "✨ *𝗣𝗿𝗼𝗰𝗲𝘀𝘀 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱!*", edit: key });

    } catch (e) {
        console.error(e);
        reply("❌ *𝗘𝗿𝗿𝗼𝗿:* " + (e.response?.data?.message || e.message));
    }
});
