import {exportedForTesting} from "~content";
import {describe, expect, jest, it, beforeEach} from "@jest/globals"

const {start, tweetChanges} = exportedForTesting;
describe("startFunction", () => {
    let mutationObserverMock;
    let observeFunctionMock;

    beforeEach(() => {
        observeFunctionMock = jest.fn()
        mutationObserverMock = jest.fn(function MutationObserver(callback: (arg0: MutationRecord[], arg1: MutationObserver) => any) {
            this.observe = observeFunctionMock;
            // Optionally add a trigger() method to manually trigger a change
            this.trigger = (mockedMutationsList) => {
                callback(mockedMutationsList, this);
            };
        });
        global.MutationObserver = mutationObserverMock;
    })

    it('observes the timeline element', () => {
        document.body.innerHTML = `
        <div id="test-id">
            <div data-testid="cellInnerDiv"></div>
            <div data-testid="cellInnerDiv"></div>
            <div data-testid="cellInnerDiv"></div>
        </div>
        `;

        const targetNode = document.getElementById("test-id");

        start();

        // Ensure observe was called with correct parameters
        expect(mutationObserverMock).toHaveBeenCalledWith(tweetChanges);
        expect(observeFunctionMock).toHaveBeenCalledWith(targetNode, {
            childList: true,
            subtree: true,
        })

    });
});
