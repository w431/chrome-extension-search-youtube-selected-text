class ContextMenu {

    private readonly id: string;

    private readonly title: string;

    private readonly contexts: chrome.contextMenus.ContextType[];

    static readonly SEARCH_URL: string = 'https://www.youtube.com/results?search_query=';

    constructor (config: ContextMenuConfig) {

        this.id = config.id;
        this.title = config.title;
        this.contexts = config.contexts;

    }

    public create = (): void => {

        chrome.contextMenus.create(
            {
                id: this.id,
                title: this.title,
                contexts: this.contexts,
            },
            () => {

                if (chrome.runtime.lastError) {

                    console.error(
                        'Error creating context menu:',
                        chrome.runtime.lastError,
                    );

                }

            },
        );

    };

    public onClick = (info: chrome.contextMenus.OnClickData): void => {

        if (info.menuItemId === this.id && info.selectionText) {

            const fullSearchUrl = ContextMenu.generateSearchURL(info.selectionText);
            ContextMenu.openNewTab(fullSearchUrl);

        }

    };

    private static openNewTab = (url: string): void => {

        chrome.tabs.create({ url }).catch((error) => console.error(
            'Error creating tab:',
            error,
        ));

    };

    private static generateSearchURL = (query: string): string => {

        const encodedQuery = encodeURIComponent(query);
        return `${ContextMenu.SEARCH_URL}${encodedQuery}`;

    };

}

export default ContextMenu;
