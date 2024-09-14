declare global {
    type ContextMenuConfig = {
        id: string;
        title: string;
        contexts: chrome.contextMenus.ContextType[];
    };
}

export {};
