document.addEventListener('DOMContentLoaded', () => {
    const saSellerPriceInput = document.getElementById('saSellerPrice');
    const saShippingUSDInput = document.getElementById('saShippingUSD');
    const saSalesPriceUSDInput = document.getElementById('saSalesPriceUSD');
  
    const saSellerPriceUSDLabel = document.getElementById('saSellerPriceUSD');
    const saVATLabel = document.getElementById('saVAT');
    const saTotalCostLabel = document.getElementById('saTotalCost');
    const saNetProfitLabel = document.getElementById('saNetProfit');
    const saPercentLabel = document.getElementById('saPercent');
    const saSARLabel = document.getElementById('saSAR');
    const saNetteLabel = document.getElementById('saNette');
  
    chrome.storage.local.get(['exchangeRate'], (result) => {
      const exchangeRate = result.exchangeRate || 1;
  
      function calculateArabistan() {
        const spt = parseFloat(saSellerPriceInput.value) || 0;
        const shu = parseFloat(saShippingUSDInput.value) || 0;
        const slp = parseFloat(saSalesPriceUSDInput.value) || 0;
  
        const sellerpu = (spt / exchangeRate) * 0.8;
        const veri1 = (slp * 1.11) - slp;
        const veri2 = (slp * 1.04) - slp;
        const veri3 = (slp * 1.04) - slp;
        const veri4 = (slp * 1.02) - slp;
        const vat = (slp * 1.15) - slp;
        const TC = sellerpu + shu + veri1 + vat + veri2 + veri3 + veri4;
        const sar = slp * 3.75;
        const nt = slp - TC;
        const net = slp - veri4 - veri3 - veri2 - vat - veri1 - shu;
        const PC = TC ? (nt / TC) : 0;
  
        saSellerPriceUSDLabel.textContent = sellerpu.toFixed(2);
        saVATLabel.textContent = vat.toFixed(2);
        saTotalCostLabel.textContent = TC.toFixed(2);
        saNetProfitLabel.textContent = nt.toFixed(2);
        saPercentLabel.textContent = (PC * 100).toFixed(2) + '%';
        saSARLabel.textContent = sar.toFixed(2);
        saNetteLabel.textContent = net.toFixed(2);
      }
  
      saSellerPriceInput.addEventListener('input', calculateArabistan);
      saShippingUSDInput.addEventListener('input', calculateArabistan);
      saSalesPriceUSDInput.addEventListener('input', calculateArabistan);
    });
  });
  