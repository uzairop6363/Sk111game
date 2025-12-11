export default async function handler(req, res) {
    // Vercel Settings se Token aur ID uthana
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    // Agar settings na milen
    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({ error: 'Bot Token or Chat ID missing in Vercel Settings' });
    }

    // Frontend se message lena
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    // Telegram ko message bhejna
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
