const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

cmd({
    pattern: "colorize",
    alias: ["color", "🎨"],
    desc: "Add color to black and white images.",
    category: "other",
    react: "🥑",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (!mime.includes('image')) {
            return reply("📸 *𝑃𝑙𝑒𝑎𝑠𝑒 𝑅𝑒𝑝𝑙𝑦 𝑇𝑜 𝐴 𝐵𝑙𝑎𝑐𝑘 & 𝑊ℎ𝑖𝑡𝑒 𝐼𝑚𝑎𝑔𝑒!*");
        }

        const { key } = await conn.sendMessage(from, { text: "🖌️ *𝐼𝑛𝑖𝑡𝑖𝑎𝑙𝑖𝑧𝑖𝑛𝑔 𝐶𝑜𝑙𝑜𝑟𝑖𝑧𝑒...*" }, { quoted: mek });

        const mediaBuffer = await q.download();
        if (!mediaBuffer) {
            return reply("❌ *Failed to download media!*");
        }

        await conn.sendMessage(from, { text: "📤 *𝑈𝑝𝑙𝑜𝑎𝑑𝑖𝑛𝑔 𝑇𝑜 𝑆𝑒𝑟𝑣𝑒𝑟...*", edit: key });

        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', mediaBuffer, { filename: 'colorize.jpg' });

        const catboxRes = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: { ...form.getHeaders() }
        });

        const catboxUrl = String(catboxRes.data).trim();

        if (!catboxUrl.startsWith('http')) {
            throw new Error("Failed to upload image to temporary server.");
        }

        await conn.sendMessage(from, { text: "🎨 *𝗖𝗼𝗹𝗼𝗿𝗶𝘇𝗶𝗻𝗴 𝗜𝗺𝗮𝗴𝗲...*", edit: key });

        const apiRes = await axios.get(`https://www.movanest.xyz/v2/colorize?image_url=${encodeURIComponent(catboxUrl)}`);
        const resData = apiRes.data;

        if (resData && (resData.status === true || resData.status === 200) && resData.results?.output_url) {
            const finalImage = resData.results.output_url;

            await conn.sendMessage(from, {
                image: { url: finalImage },
                caption: "🎨 *𝐶𝑜𝑙𝑜𝑟𝑖𝑧𝑒𝑑 𝑆𝑢𝑐𝑐𝑒𝑠𝑠𝐹𝑢𝑙𝑙𝑦!*\n\n> © ʙʟᴀᴄᴋ ǫᴜᴇᴇɴ ᴍᴅ"
            }, { quoted: mek });

            await conn.sendMessage(from, { text: "✅ *𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱!*", edit: key });
        } else {
            throw new Error(resData?.message || "API did not return a valid image.");
        }

    } catch (e) {
        console.error(e);
        reply("❌ *𝗘𝗿𝗿𝗼𝗿:* " + (e.message || e));
    }
});
