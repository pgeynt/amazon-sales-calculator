document.addEventListener('DOMContentLoaded', () => {
    const caSellerPriceInput = document.getElementById('caSellerPrice');
    const caShippingUSDInput = document.getElementById('caShippingUSD');
    const caSalesPriceUSDInput = document.getElementById('caSalesPriceUSD');
    const caComInput = document.getElementById('caCom');
  
    const caSellerPriceUSDLabel = document.getElementById('caSellerPriceUSD');
    const caComLabel = document.getElementById('caComLabel');
    const caWATLabel = document.getElementById('caWAT');
    const caTotalCostLabel = document.getElementById('caTotalCost');
    const caSalesPriceCADLabel = document.getElementById('caSalesPriceCAD');
    const caNetProfitLabel = document.getElementById('caNetProfit');
    const caPercentLabel = document.getElementById('caPercent');

    chrome.storage.local.get(['exchangeRate'], (result) => {
      const exchangeRate = result.exchangeRate ;
  
    function calculateCanada() {
      const spt = parseFloat(caSellerPriceInput.value) || 0;
      const shpu = parseFloat(caShippingUSDInput.value) || 0;
      const spu = parseFloat(caSalesPriceUSDInput.value) || 0;
      const comRate = parseFloat(caComInput.value) || 0;
  
      const comMultiplier = 1 + comRate / 100;
  
      const sellerpu = (spt / exchangeRate) * 0.8;
      const COM2 = (spu * comMultiplier) - spu;
      const WAT = (spu * 1.02) - spu;
      const TC = sellerpu + shpu + COM2 + WAT;
      const CAD = spu * 1.37;
      const NP = spu - TC;
      const PC = TC ? (NP / TC) : 0;
  
      caSellerPriceUSDLabel.textContent = sellerpu.toFixed(2);
      caComLabel.textContent = COM2.toFixed(2);
      caWATLabel.textContent = WAT.toFixed(2);
      caTotalCostLabel.textContent = TC.toFixed(2);
      caSalesPriceCADLabel.textContent = CAD.toFixed(2);
      caNetProfitLabel.textContent = NP.toFixed(2);
      caPercentLabel.textContent = (PC * 100).toFixed(2) + '%';
    }
  
    caSellerPriceInput.addEventListener('input', calculateCanada);
    caShippingUSDInput.addEventListener('input', calculateCanada);
    caSalesPriceUSDInput.addEventListener('input', calculateCanada);
    caComInput.addEventListener('input', calculateCanada);
  });
});