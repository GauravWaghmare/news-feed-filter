'use strict';

const plasmohqMessaging = jest.createMockFromModule('@plasmohq/messaging');

let isPolitical: boolean = false;

function mockSendToBackground({name, body}) {
    return {"message": isPolitical}
}

plasmohqMessaging.__setIsPolitical = (mockReturnValue) => {
    isPolitical = mockReturnValue
}
plasmohqMessaging.sendToBackground = mockSendToBackground

module.exports = plasmohqMessaging;