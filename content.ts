import type {PlasmoCSConfig} from "plasmo"
import {sendToBackground} from "@plasmohq/messaging"
import $ from 'jquery'
import {supabase} from "~core/supabase";

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
    console.log("Calling tweetChanges")
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

async function startNewsFeedFilter() {
    let timelineElement: HTMLElement
    do {
        timelineElement = $('div[data-testid="cellInnerDiv"]:first').parent()[0]
        await new Promise(r => setTimeout(r, 1000));
    }
    while (timelineElement == null)
    const observerOptions = {
        childList: true,
        subtree: true,
    };
    const observer = new MutationObserver(tweetChanges);
    // Stop observer when user logs out
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            console.log('SIGNED_OUT', session)
            observer.disconnect()
        }
    })
    if (timelineElement) {
        observer.observe(timelineElement, observerOptions);
    }
}

async function start () {
    console.log("Extension starting up")
    const { data, error } = await supabase.auth.getSession()
    if (data.session !== null && data.session.user !== null) {
        await startNewsFeedFilter();
    } else if (data.session === null || data.session.user === null) {
        console.log("Please log in")
    }
    // Start feed filter when user logs in
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
            console.log('SIGNED_IN', session)
            await startNewsFeedFilter();
        }
    })
}

$().ready(start)