// background.js
chrome.runtime.onInstalled.addListener(() => {
  updateExchangeRate();
  // Veriyi her saat güncelle
  setInterval(updateExchangeRate, 3600000); // 1 hour = 3600000 ms
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.exchangeRate !== undefined) {
    // Veriyi chrome.storage'e kaydet
    chrome.storage.local.set({ exchangeRate: request.exchangeRate }, () => {
      console.log('Exchange rate saved:', request.exchangeRate);
    });
  }
});

function updateExchangeRate() {
  chrome.tabs.create({
    url: 'https://kur.doviz.com/serbest-piyasa/amerikan-dolari',
    active: false
  }, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (info.status === 'complete' && tabId === tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        });
        chrome.tabs.onUpdated.removeListener(listener);
        // Tab'ı kapat
        chrome.tabs.remove(tabId);
      }
    });
  });
}
