import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

async function classifyTweet(tweetText: string): Promise<boolean> {
    const endpoint = process.env.PLASMO_PUBLIC_CLASSIFY_URL.concat("v2/classify")
    const selectedOptions: string[] = await storage.get("selectedOptions")
    try {
        console.log("Calling news feed filter server with text", tweetText, "and options", selectedOptions)
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tweetText: tweetText, selectedOptions: selectedOptions })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result['isPolitical'];
    } catch (error) {
        console.error('Error calling /v2/classify endpoint:', error);
    }
}


const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const message = await classifyTweet(req.body.tweetText)

    res.send({
        message
    })
}

export default handler