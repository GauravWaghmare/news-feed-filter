import {sendToBackground} from "@plasmohq/messaging";
import $ from "jquery";

async function classifyTweet(tweetText: string): Promise<boolean> {
    return await sendToBackground({
        name: "classify",
        body: {
            tweetText: tweetText
        },
    })
}

export async function tweetChanges(records: MutationRecord[], observer: MutationObserver) {
    for (const record of records) {
        for (const addedNode of record.addedNodes) {
            let tweetText = $(addedNode).find('[data-testid="tweetText"]:first').children('span.css-1jxf684').text()
            if (tweetText.length == 0) {
                continue
            }
            let isPolitical = await classifyTweet(tweetText.trim())
            if (isPolitical["message"]) {
                $(addedNode).hide()
            }

        }
    }
}