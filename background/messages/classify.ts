import type { PlasmoMessaging } from "@plasmohq/messaging"

async function classifyTweet(tweetText: string): Promise<boolean> {
    const endpoint = 'http://127.0.0.1:8787/classify';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tweetText })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result['isPolitical'];
    } catch (error) {
        console.error('Error calling /classify endpoint:', error);
    }
}


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const message = await classifyTweet(req.body.tweetText)

    res.send({
        message
    })
}

export default handler