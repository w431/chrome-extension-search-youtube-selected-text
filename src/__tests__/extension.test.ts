import setup from '../background/extension';
import ContextMenu from '../background/context-menu';

jest.mock('../background/context-menu');

const MockedContextMenu = ContextMenu as jest.MockedClass<typeof ContextMenu>;

describe('Extension Setup', () => {
    let mockContextMenuInstance: jest.Mocked<ContextMenu>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockContextMenuInstance = {
            create: jest.fn(),
            onClick: jest.fn(),
        } as unknown as jest.Mocked<ContextMenu>;
        MockedContextMenu.mockImplementation(() => mockContextMenuInstance);
    });

    it('should create a new ContextMenu with correct configuration', () => {
        setup();

        expect(MockedContextMenu).toHaveBeenCalledWith({
            id: 'searchYouTube',
            title: expect.any(String),
            contexts: ['selection']
        });
    });

    it('should use chrome.i18n.getMessage for the context menu title', () => {
        const mockGetMessage = jest.fn().mockReturnValue('Mocked Title');
        chrome.i18n.getMessage = mockGetMessage;

        setup();

        expect(mockGetMessage).toHaveBeenCalledWith('contextMenuTitle');
        expect(MockedContextMenu).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Mocked Title',
            }),
        );
    });

    it('should listen on onInstalled', () => {
        setup();

        expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalledWith(mockContextMenuInstance.create);
    });

    it('should listen to onClick', () => {
        setup();

        expect(chrome.contextMenus.onClicked.addListener).toHaveBeenCalledWith(mockContextMenuInstance.onClick);
    });
});
