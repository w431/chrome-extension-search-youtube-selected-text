const CONTEXT_MENU_ID = 'searchYouTube';
const CONTEXT_MENU_TITLE = "Search YouTube for '%s'";
const CONTEXTS = ['selection'] as chrome.contextMenus.ContextType[];
const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

const createContextMenu = (): void => {
    const contextMenuConfig = getContextMenuConfig();
    chrome.contextMenus.create(contextMenuConfig, () => {
        if (chrome.runtime.lastError) {
            console.error('Error creating context menu:', chrome.runtime.lastError);
        }
    });
};

const handleContextMenuClick = (info: chrome.contextMenus.OnClickData): void => {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
        const youtubeSearchUrl = generateYouTubeSearchURL(info.selectionText);
        openNewTab(youtubeSearchUrl);
    }
};

const openNewTab = (url: string): void => {
    chrome.tabs.create({ url }).catch((error) => console.error('Error creating tab:', error));
};

const generateYouTubeSearchURL = (query: string): string => {
    const encodedQuery = encodeURIComponent(query);
    return `${YOUTUBE_SEARCH_URL}${encodedQuery}`;
};

const getContextMenuConfig = (): chrome.contextMenus.CreateProperties => ({
    id: CONTEXT_MENU_ID,
    title: CONTEXT_MENU_TITLE,
    contexts: CONTEXTS,
});

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
