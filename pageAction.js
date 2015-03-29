// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(results) {
    if (!results || results.length === 0) return
    console.log('sending switch message to', results[0].id);
    chrome.tabs.sendMessage(results[0].id, 'switch');
  });
});
