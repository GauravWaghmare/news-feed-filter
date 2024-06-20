import type {PlasmoCSConfig} from "plasmo";
import $ from 'jquery';
import {tweetChanges} from "~handler"

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/home"],
    all_frames: true,
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
    start
}

$().ready(start)