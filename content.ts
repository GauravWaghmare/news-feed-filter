import type {PlasmoCSConfig} from "plasmo";
import {sendToBackground} from "@plasmohq/messaging";
import $ from 'jquery';

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/home"],
    all_frames: true,
}

async function classifyTweet(tweetText: string): Promise<boolean> {
    return await sendToBackground({
        name: "classify",
        body: {
            tweetText: tweetText
        },
    })
}

async function tweetChanges(records, observer) {
    for (const record of records) {
        for (const addedNode of record.addedNodes) {
            let tweetText = $(addedNode).find('[data-testid="tweetText"]:first').children('span.css-1jxf684').text()
            if (tweetText.length == 0) {
                continue
            }
            let isPolitical = await classifyTweet(tweetText)
            if (isPolitical["message"]) {
                $(addedNode).hide()
            }

        }
    }
}

async function start () {
    let timelineElement: HTMLElement
    timelineElement = $('div[data-testid="cellInnerDiv"]:first').parent()[0]
    while (timelineElement == null) {
        await new Promise(r => setTimeout(r, 1000));
        timelineElement = $('div[data-testid="cellInnerDiv"]:first').parent()[0]
    }
    const observerOptions = {
        childList: true,
        subtree: true,
    };
    const observer = new MutationObserver(tweetChanges);
    if (timelineElement) {
        observer.observe(timelineElement, observerOptions);
    }
}

export const exportedForTesting = {
    start,
    tweetChanges
}

$().ready(start)