import ContextMenu from '../background/context-menu';

describe('Context Menu Module', () => {
    let contextMenu: ContextMenu;
    const menuConfig: ContextMenuConfig = {
        id: 'test-id',
        title: 'Test Title',
        contexts: ['selection'],
    };
    beforeEach(() => {
        contextMenu = new ContextMenu(menuConfig);
        jest.clearAllMocks();
    });
    describe('constructor', () => {
        it('should initialize with the correct properties', () => {
            expect(contextMenu['id']).toBe(menuConfig.id);
            expect(contextMenu['title']).toBe(menuConfig.title);
            expect(contextMenu['contexts']).toBe(menuConfig.contexts);
        });
    });
    describe('create', () => {
        it('creates context menu with correct config', () => {
            contextMenu.create();
            expect(chrome.contextMenus.create).toHaveBeenCalledWith(
                expect.objectContaining(menuConfig),
                expect.any(Function),
            );
        });
        it('logs error when lastError is present', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            chrome.runtime.lastError = { message: 'Oops error!' };
            contextMenu.create();
            expect(chrome.contextMenus.create).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith('Error creating context menu:', { message: 'Oops error!' });
            consoleSpy.mockRestore();
        });
    });
    describe('onClick', () => {
        it('opens new tab with correct URL when clicked', () => {
            contextMenu.onClick({
                menuItemId: menuConfig.id,
                selectionText: 'test query',
            } as chrome.contextMenus.OnClickData);

            expect(chrome.tabs.create).toHaveBeenCalledWith({
                url: 'https://www.youtube.com/results?search_query=test%20query',
            });
        });

        it('does not open new tab when menuItemId does not match', () => {
            contextMenu.onClick({
                menuItemId: 'wrongId',
                selectionText: 'test query',
            } as chrome.contextMenus.OnClickData);

            expect(chrome.tabs.create).not.toHaveBeenCalled();
        });

        it('does not open new tab when selected text is empty', () => {
            contextMenu.onClick({
                menuItemId: menuConfig.id,
                selectionText: '',
            } as chrome.contextMenus.OnClickData);

            expect(chrome.tabs.create).not.toHaveBeenCalled();
        });

        it('generates the correct URL for a query with special characters', () => {
            contextMenu.onClick({
                menuItemId: menuConfig.id,
                selectionText: 'query with & and ?',
            } as chrome.contextMenus.OnClickData);

            expect(chrome.tabs.create).toHaveBeenCalledWith({
                url: 'https://www.youtube.com/results?search_query=query%20with%20%26%20and%20%3F',
            });
        });

        it('logs an error when opening new tab fails', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            (chrome.tabs.create as jest.Mock).mockRejectedValueOnce(new Error('Failed to create tab'));

            contextMenu.onClick({
                menuItemId: menuConfig.id,
                selectionText: 'test',
            } as chrome.contextMenus.OnClickData);

            // Wait for the promise to resolve
            await new Promise(process.nextTick);

            expect(consoleSpy).toHaveBeenCalledWith('Error creating tab:', new Error('Failed to create tab'));
            consoleSpy.mockRestore();
        });
    });
});
