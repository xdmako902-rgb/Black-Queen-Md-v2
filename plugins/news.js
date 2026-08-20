const { cmd } = require('../command');
const axios = require('axios');

// Axios client with timeout for faster error handling & performance
const httpClient = axios.create({
    timeout: 8000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
});

// Channel & Forward context
const newsletterContext = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: "120363363363363363@newsletter",
        newsletterName: "𝐁𝐋𝐀𝐂𝐊 𝐐𝐔𝐄𝐄𝐍 𝐌𝐃 🖤!",
        serverMessageId: 1
    }
};

// Reusable optimized news handler
const sendNewsResponse = async (conn, mek, from, reply, sourceTitle, apiUrl) => {
    try {
        const { data } = await httpClient.get(apiUrl);

        if (!data || !data.result) {
            return reply(`❌ *Failed To Fetch ${sourceTitle} News.*`);
        }

        const res = data.result;

        // Clean description text and HTML entities
        let desc = (res.desc || res.description || 'No Description')
            .replace(/&l;/g, '<')
            .replace(/&g;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&a;quot;/g, '"')
            .replace(/&a;nbsp;/g, ' ')
            .replace(/<[^>]*>/g, '')
            .replace(/\n\s*\n/g, '\n')
            .trim();

        let formattedDate = res.date ? res.date.split('T')[0].split(' ')[0] : 'Today';
        let newsLink = res.link || res.url || 'No Link Available';
        let newsImage = res.image || res.img || null;

        const newsInfo = `╭─── « 📰 Ｄ ${sourceTitle.toUpperCase()} 📰 » ───
│
│ ➢ ❝ ${res.title || 'Breaking News'} ❞
│
│ 📅 *ᴅᴀᴛᴇ:* ${formattedDate}
│
│ 📃 *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ:*
│ ${desc}
│
│ 🔗 *ʟɪɴᴋ:* ${newsLink}
│
╰───────────────⟡
> © 𝙱𝙻𝙰𝙲𝙺 𝚀𝚄𝙴𝙴𝙽 𝙼𝙳 𝙽𝙴𝚆𝚂`;

        if (newsImage) {
            await conn.sendMessage(from, {
                image: { url: newsImage },
                caption: newsInfo,
                contextInfo: newsletterContext
            }, { quoted: mek });
        } else {
            await conn.sendMessage(from, {
                text: newsInfo,
                contextInfo: newsletterContext
            }, { quoted: mek });
        }

    } catch (e) {
        reply(`❌ *Error (${sourceTitle}):* ${e.message}`);
    }
};

// 1. Gagana News
cmd({
    pattern: "gagana",
    alias: ["gagananews"],
    desc: "Get the latest news from Gagana.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "GAGANA NEWS", 'https://saviya-kolla-api.koyeb.app/news/gagana');
});

// 2. Ada Derana News
cmd({
    pattern: "derana",
    alias: ["adaderana", "derananews"],
    desc: "Get the latest news from Ada Derana.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "ADA DERANA", 'https://api.srihub.store/news/derana?apikey=dew_HFHK1BMLQLKAKmm3QfE5oIKEWwFFIUwX4zwBeEDK');
});

// 3. Lankadeepa News
cmd({
    pattern: "lankadeepa",
    alias: ["deepa", "lankadeepanews"],
    desc: "Get the latest news from Lankadeepa.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "LANKA DEEPA", 'https://private-api-ebon.vercel.app/news/lankadeepa');
});

// 4. Sirasa News
cmd({
    pattern: "sirasa",
    alias: ["sirasanews", "news1st"],
    desc: "Get the latest news from Sirasa News1st.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "SIRASA NEWS", 'https://private-api-ebon.vercel.app/news/sirasa');
});

// 5. Hiru News
cmd({
    pattern: "hiru",
    alias: ["hirunews"],
    desc: "Get the latest news from Hiru News.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "HIRU NEWS", 'https://private-api-ebon.vercel.app/news/hiru');
});

// 6. ITN News
cmd({
    pattern: "itn",
    alias: ["itnnews"],
    desc: "Get the latest news from ITN.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    await sendNewsResponse(conn, mek, from, reply, "ITN NEWS", 'https://private-api-ebon.vercel.app/news/itn');
});
