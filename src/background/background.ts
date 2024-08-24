const CONTEXT_MENU_ID = 'searchYouTube';
const CONTEXT_MENU_TITLE = "Search YouTube for '%s'";
const CONTEXTS = ['selection'] as chrome.contextMenus.ContextType[];
const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

function createContextMenu(): void {
    chrome.contextMenus.create({
        id: CONTEXT_MENU_ID,
        title: CONTEXT_MENU_TITLE,
        contexts: CONTEXTS,
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error creating context menu:', chrome.runtime.lastError);
        }
    });
}

function generateYouTubeSearchURL(encodedQuery: string): string {
    return `${YOUTUBE_SEARCH_URL}${encodedQuery}`;
}

function openNewTab(url: string): void {
    chrome.tabs.create({url})
        .catch(error => console.error('Error creating tab:', error));
}

function handleContextMenuClick(info: chrome.contextMenus.OnClickData): void {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
        const youtubeSearchUrl = generateYouTubeSearchURL(info.selectionText);
        openNewTab(youtubeSearchUrl);
    }
}

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);