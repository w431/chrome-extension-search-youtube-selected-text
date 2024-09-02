const CONTEXT_MENU_ID = 'searchYouTube';
const CONTEXT_MENU_TITLE = "Search YouTube for '%s'";
const CONTEXTS = ['selection'] as chrome.contextMenus.ContextType[];
const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

function createContextMenu(): void {
    const contextMenuConfig = getContextMenuConfig();
    chrome.contextMenus.create(contextMenuConfig, handleRuntimeError);
}

function handleContextMenuClick(info: chrome.contextMenus.OnClickData): void {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
        const youtubeSearchUrl = generateYouTubeSearchURL(info.selectionText);
        openNewTab(youtubeSearchUrl);
    }
}

function openNewTab(url: string): void {
    chrome.tabs.create({ url }).catch((error) => console.error('Error creating tab:', error));
}

function generateYouTubeSearchURL(query: string): string {
    const encodedQuery = encodeURIComponent(query);
    return `${YOUTUBE_SEARCH_URL}${encodedQuery}`;
}

function getContextMenuConfig(): chrome.contextMenus.CreateProperties {
    return {
        id: CONTEXT_MENU_ID,
        title: CONTEXT_MENU_TITLE,
        contexts: CONTEXTS,
    };
}

function handleRuntimeError(): void {
    if (chrome.runtime.lastError) {
        console.error('Error creating context menu:', chrome.runtime.lastError);
    }
}

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
