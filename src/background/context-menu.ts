const CONTEXT_MENU_ID = 'searchYouTube';
const CONTEXT_MENU_TITLE = chrome.i18n.getMessage('contextMenuTitle');
const CONTEXTS = ['selection'] as chrome.contextMenus.ContextType[];
const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

/**
 * Creates the main context menu item for the extension.
 * @return {void}
 */
const createContextMenu = (): void => {
    const contextMenuConfig = getContextMenuConfig();
    chrome.contextMenus.create(contextMenuConfig, () => {
        if (chrome.runtime.lastError) {
            console.error('Error creating context menu:', chrome.runtime.lastError);
        }
    });
};

/**
 * Handles the click event on the context menu item after a selection is made.
 * Redirects to YouTube search page.
 * @param {chrome.contextMenus.OnClickData} info - Information about the context menu click event.
 * @return {void}
 */
const handleContextMenuClick = (info: chrome.contextMenus.OnClickData): void => {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
        const youtubeSearchUrl = generateYouTubeSearchURL(info.selectionText);
        openNewTab(youtubeSearchUrl);
    }
};

/**
 * Opens a new Chrome tab with the specified URL.
 * @param {string} url - The URL to open in a new tab.
 * @return {void}
 */
const openNewTab = (url: string): void => {
    chrome.tabs.create({ url }).catch((error) => console.error('Error creating tab:', error));
};

/**
 * Generates a YouTube search URL for the given query. Encodes the query.
 * @param {string} query - The search query.
 * @return {string} - The generated YouTube search URL.
 */
const generateYouTubeSearchURL = (query: string): string => {
    const encodedQuery = encodeURIComponent(query);
    return `${YOUTUBE_SEARCH_URL}${encodedQuery}`;
};

/**
 * Gets the configuration for the context menu.
 * @return {chrome.contextMenus.CreateProperties} - The context menu configuration.
 */
const getContextMenuConfig = (): chrome.contextMenus.CreateProperties => ({
    id: CONTEXT_MENU_ID,
    title: CONTEXT_MENU_TITLE,
    contexts: CONTEXTS,
});

export { createContextMenu, handleContextMenuClick };
