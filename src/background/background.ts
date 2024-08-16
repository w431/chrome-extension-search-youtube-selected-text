 chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	  id: "searchYouTube",
	  title: "Search YouTube for '%s'",
	  contexts: ["selection"]
	});
  });
   
 chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
	if (info.menuItemId === "searchYouTube" && info.selectionText) {
	  const searchQuery = encodeURIComponent(info.selectionText);
	  const youtubeURL = `https://www.youtube.com/results?search_query=${searchQuery}`;
	  chrome.tabs.create({ url: youtubeURL });
	}
  });