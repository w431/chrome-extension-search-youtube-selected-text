import 'jest-webextension-mock';
globalThis.chrome.contextMenus = {
    create: jest.fn((config: chrome.contextMenus.CreateProperties, callback?: () => void) => {
        if (callback) callback();
        return undefined;
    }),
    update: jest.fn(),
    remove: jest.fn(),
    removeAll: jest.fn(),
    onClicked: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
        hasListener: jest.fn(),
        addRules: jest.fn(),
        removeRules: jest.fn(),
        getRules: jest.fn(),
        hasListeners: jest.fn(),
    },
    ACTION_MENU_TOP_LEVEL_LIMIT: 6,
};
