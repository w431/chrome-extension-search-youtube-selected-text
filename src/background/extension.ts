import ContextMenu from './context-menu';

const setup = (): void => {
    const contextMenu = new ContextMenu({
        id: 'searchYouTube',
        title: chrome.i18n.getMessage('contextMenuTitle'),
        contexts: ['selection'],
    });
    chrome.runtime.onInstalled.addListener(contextMenu.create);
    chrome.contextMenus.onClicked.addListener(contextMenu.onClick);
};

export default setup;
