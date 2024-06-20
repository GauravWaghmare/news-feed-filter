'use strict';

const plasmohqMessaging = jest.createMockFromModule('@plasmohq/messaging');

function mockSendToBackground({name, body}) {
    return {"message": false}
}

plasmohqMessaging.sendToBackground = mockSendToBackground

module.exports = plasmohqMessaging;