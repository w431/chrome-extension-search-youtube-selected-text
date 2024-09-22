class ContextMenu {
    constructor(config) {
        this.create = () => {
            chrome.contextMenus.create(
                {
                    id: this.id,
                    title: this.title,
                    contexts: this.contexts,
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error('Error creating context menu:', chrome.runtime.lastError);
                    }
                },
            );
        };
        this.onClick = (info) => {
            if (info.menuItemId === this.id && info.selectionText) {
                const fullSearchUrl = ContextMenu.generateSearchURL(info.selectionText);
                ContextMenu.openNewTab(fullSearchUrl);
            }
        };
        this.id = config.id;
        this.title = config.title;
        this.contexts = config.contexts;
    }
}
ContextMenu.SEARCH_URL = 'https://www.youtube.com/results?search_query=';
ContextMenu.openNewTab = (url) => {
    chrome.tabs.create({ url }).catch((error) => console.error('Error creating tab:', error));
};
ContextMenu.generateSearchURL = (query) => {
    const encodedQuery = encodeURIComponent(query);
    return `${ContextMenu.SEARCH_URL}${encodedQuery}`;
};
export default ContextMenu;
