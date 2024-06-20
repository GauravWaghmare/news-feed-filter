import type { PlasmoMessaging } from "@plasmohq/messaging"

async function classifyTweet(tweetText: string): Promise<boolean> {
    const endpoint = process.env.PLASMO_PUBLIC_CLASSIFY_URL.concat("/classify")
    try {
        console.log("Calling news feed filter server with text", tweetText)
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
        console.log("Received response", result['isPolitical'], "for tweet text", tweetText)
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