import {exportedForTesting} from "~content";
import $ from "jquery";

const {start} = exportedForTesting;

describe("integration", () => {

    it('extracts the tweet text and calls classify',async () => {
        document.body.innerHTML = `
        <div id="dom-test-id">
            <div data-testid="cellInnerDiv" id="cell-test-id"></div>
            <div data-testid="cellInnerDiv"></div>
            <div data-testid="cellInnerDiv"></div>
        </div>
        `;

        expect($(document.getElementById("cell-test-id")).css("display")).toEqual("block")
        const targetNode = document.getElementById("dom-test-id");
        await start();

        targetNode.insertAdjacentHTML("beforeend", `
            <div data-testid="cellInnerDiv" id="added-node">
                <div data-testid="tweetText">
                    <span class="css-1jxf684">Test text</span>
                </div>
            </div>
            `)

        const addedNode = document.getElementById('added-node')
        await new Promise(f => setTimeout(f, 1000))
        expect($(addedNode).css('display')).toEqual("none")
    })
})