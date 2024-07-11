import {sendToBackground} from "@plasmohq/messaging";
import $ from "jquery";
import { Storage } from "@plasmohq/storage"

async function classifyTweet(tweetText: string): Promise<boolean> {
    return await sendToBackground({
        name: "classify",
        body: {
            tweetText: tweetText
        },
    })
}

export async function tweetChanges(records: MutationRecord[], observer: MutationObserver) {
    const storage = new Storage()
    const filterCount = await storage.get("filterCount")

    let filterCountInt = Number(filterCount)
    if (Number.isNaN(filterCountInt)) {
        filterCountInt = 0
    }

    for (const record of records) {
        for (const addedNode of record.addedNodes) {
            let tweetText = $(addedNode).find('[data-testid="tweetText"]:first').children('span.css-1jxf684').text()
            if (tweetText.length == 0) {
                continue
            }
            let isPolitical = await classifyTweet(tweetText.trim())
            if (isPolitical["message"]) {
                $(addedNode).hide()
                filterCountInt += 1
            }

        }
    }
    await storage.set("filterCount", filterCountInt.toString())
}