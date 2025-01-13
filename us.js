document.addEventListener('DOMContentLoaded', () => {
  const sellerPriceInput = document.getElementById('sellerPrice');
  const shippingInput = document.getElementById('shipping');
  const salesPriceUSDInput = document.getElementById('salesPriceUSD');
  const comtInput = document.getElementById('comt');

  const splLabel = document.getElementById('splLabel');
  const comLabel = document.getElementById('comLabel');
  const ratioLabel = document.getElementById('ratioLabel');
  const tcLabel = document.getElementById('tcLabel');
  const netProfitLabel = document.getElementById('netProfitLabel');
  const percentLabel = document.getElementById('percentLabel');

  // Retrieve the exchange rate from chrome.storage
  chrome.storage.local.get(['exchangeRate'], (result) => {
    const exchangeRate = result.exchangeRate ;

    function calculateUS() {
      const tlveri = parseFloat(sellerPriceInput.value) || 0;
      const spp = parseFloat(shippingInput.value) || 0;
      const slpr = parseFloat(salesPriceUSDInput.value) || 0;
      const comRate = parseFloat(comtInput.value) || 0;

      const comMultiplier = 1 + comRate / 100;

      const spl = (tlveri / exchangeRate) * 0.8;
      const com = (slpr * comMultiplier) - slpr;
      const ratio = (slpr * 1.02) - slpr;
      const TC = spl + spp + com + ratio;
      const netProfit = slpr - TC;
      const percent = TC ? (netProfit / TC) : 0;

      splLabel.textContent = spl.toFixed(2);
      comLabel.textContent = com.toFixed(2);
      ratioLabel.textContent = ratio.toFixed(2);
      tcLabel.textContent = TC.toFixed(2);
      netProfitLabel.textContent = netProfit.toFixed(2);
      percentLabel.textContent = (percent * 100).toFixed(2) + '%';
    }

    sellerPriceInput.addEventListener('input', calculateUS);
    shippingInput.addEventListener('input', calculateUS);
    salesPriceUSDInput.addEventListener('input', calculateUS);
    comtInput.addEventListener('input', calculateUS);
  });
});
