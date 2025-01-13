document.addEventListener('DOMContentLoaded', () => {
    const aeSellerPriceInput = document.getElementById('aeSellerPrice');
    const aeShippingUSDInput = document.getElementById('aeShippingUSD');
    const aeSalesPriceUSDInput = document.getElementById('aeSalesPriceUSD');
    const aeComInput = document.getElementById('aeCom');
  
    const aeSellerPriceUSDLabel = document.getElementById('aeSellerPriceUSD');
    const aeComLabel = document.getElementById('aeComLabel');
    const aeWATLabel = document.getElementById('aeWAT');
    const aeTotalCostLabel = document.getElementById('aeTotalCost');
    const aeSalesPriceAEDLabel = document.getElementById('aeSalesPriceAED');
    const aeNetProfitLabel = document.getElementById('aeNetProfit');
    const aePercentLabel = document.getElementById('aePercent');
  
    
    chrome.storage.local.get(['exchangeRate'], (result) => {
      const exchangeRate = result.exchangeRate ;
    function calculateAE() {
      const spt = parseFloat(aeSellerPriceInput.value) || 0;
      const shpu = parseFloat(aeShippingUSDInput.value) || 0;
      const spu = parseFloat(aeSalesPriceUSDInput.value) || 0;
      const comRate = parseFloat(aeComInput.value) || 0;
  
      const comMultiplier = 1 + comRate / 100;
  
      const sellerpu = (spt / exchangeRate);
      const COM2 = (spu * comMultiplier) - spu;
      const WAT = (spu * 1.02) - spu;
      const TC = sellerpu + shpu + COM2 + WAT;
      const spea = spu * 3.67;
      const NP = spu - TC;
      const PC = TC ? (NP / TC) : 0;
  
      aeSellerPriceUSDLabel.textContent = sellerpu.toFixed(2);
      aeComLabel.textContent = COM2.toFixed(2);
      aeWATLabel.textContent = WAT.toFixed(2);
      aeTotalCostLabel.textContent = TC.toFixed(2);
      aeSalesPriceAEDLabel.textContent = spea.toFixed(2);
      aeNetProfitLabel.textContent = NP.toFixed(2);
      aePercentLabel.textContent = (PC * 100).toFixed(2) + '%';
    }
  
    aeSellerPriceInput.addEventListener('input', calculateAE);
    aeShippingUSDInput.addEventListener('input', calculateAE);
    aeSalesPriceUSDInput.addEventListener('input', calculateAE);
    aeComInput.addEventListener('input', calculateAE);
  });
});