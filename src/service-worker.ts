/**
 * Service worker for Triton Extensions Enabler
 */

/**
 * Getter function for the Neptune's Pride web page address.
 *
 * @returns {string} the URL to the Neptune's Pride web page.
 */
function getTritonUrl(): string {
  "use strict";
  return "https://np.ironhelmet.com/";
}

/**
 * Opens a specified triton web page inside a
 * new tab. A new tab will only be created when necessary.
 *
 * @param {string} path The path to to be opened triton web page
 */
function goToTritron(path?: string): void {
  "use strict";
  path = path || "";
  chrome.tabs.query({ url: getTritonUrl() + "*" }, function (tabs) {
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.update(tab.id, { active: true });
      }
    }
    if (tabs.length > 0) return;
    chrome.tabs.create({
      url: getTritonUrl() + path,
      active: true,
    });
  });
}

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener(function callback(): void {
  goToTritron();
});

// Listen for runtime messages from popup
chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): boolean => {
  if (message.action === "goToTritron") {
    goToTritron();
  }
  // Always return true for async response
  return true;
});