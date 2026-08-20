const { cmd } = require('../command');
const googleTTS = require('google-tts-api');

cmd({
    pattern: "tts",
    alias: ["say", "voice"],
    desc: "Convert text to speech audio",
    category: "convert",
    react: "🗣️",
    filename: __filename
},
async (sock, msg, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ *හඬක් බවට පත් කිරීමට අවශ්‍ය Text එක ලබා දෙන්න! (උදා: .tts hello)*");

        const audioUrl = googleTTS.getAudioUrl(q, {
            lang: 'si',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });

        await sock.sendMessage(from, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mp4', 
            ptt: true 
        }, { quoted: msg });

    } catch (e) {
        console.error("TTS Error:", e);
        reply("❌ *හඬ පටය සෑදීමේදී දෝෂයක් සිදුවිය!*");
    }
});
