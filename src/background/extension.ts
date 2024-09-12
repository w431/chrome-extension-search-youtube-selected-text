import { createContextMenu, handleContextMenuClick } from './context-menu';

const setup = (): void => {
    chrome.runtime.onInstalled.addListener(createContextMenu);
    chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
};

export default setup;
