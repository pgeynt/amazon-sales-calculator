// content.js
(() => {
    const lastRow = document.querySelector('.value-table .table.table-narrow.sortable tbody tr:last-child');
    if (lastRow) {
      const thirdTd = lastRow.querySelector('td:nth-child(3)');
      if (thirdTd) {
        const rateText = thirdTd.textContent.trim();
        const exchangeRate = parseFloat(rateText.replace(',', '.'));
  
        // Veriyi background.js'e gönder
        chrome.runtime.sendMessage({ exchangeRate });
      }
    }
  })();
  