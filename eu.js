document.addEventListener('DOMContentLoaded', () => {
    const euSellerPriceInput = document.getElementById('euSellerPrice');
    const euShippingUSDInput = document.getElementById('euShippingUSD');
    const euSalesPriceUSDInput = document.getElementById('euSalesPriceUSD');
    const euComInput = document.getElementById('euCom');
  
    const euSellerPriceUSDLabel = document.getElementById('euSellerPriceUSD');
    const euComLabel = document.getElementById('euComLabel');
    const euWATLabel = document.getElementById('euWAT');
    const euTotalCostLabel = document.getElementById('euTotalCost');
    const euSalesPriceEUROLabel = document.getElementById('euSalesPriceEURO');
    const euNetProfitLabel = document.getElementById('euNetProfit');
    const euPercentLabel = document.getElementById('euPercent');
    const euUKLabel = document.getElementById('euUK');
    const euSWELabel = document.getElementById('euSWE');
    const euPLLabel = document.getElementById('euPL');
  
    chrome.storage.local.get(['exchangeRate'], (result) => {
      const exchangeRate = result.exchangeRate ;

    function calculateEU() {
      const spt = parseFloat(euSellerPriceInput.value) || 0;
      const shpu = parseFloat(euShippingUSDInput.value) || 0;
      const spu = parseFloat(euSalesPriceUSDInput.value) || 0;
      const comRate = parseFloat(euComInput.value) || 0;
  
      const comMultiplier = 1 + comRate / 100;
  
      const sellerpu = (spt / exchangeRate) * 0.8;
      const COM2 = (spu * comMultiplier) - spu;
      const WAT = (spu * 1.18) - spu;
      const TC = sellerpu + shpu + COM2 + WAT;
      const SPE = spu * 0.9;
      const NP = spu - TC;
      const PC = TC ? (NP / TC) : 0;
      const UK = spu * 0.8;
      const SWE = spu * 10.89;
      const PL = spu * 4.04;
  
      euSellerPriceUSDLabel.textContent = sellerpu.toFixed(2);
      euComLabel.textContent = COM2.toFixed(2);
      euWATLabel.textContent = WAT.toFixed(2);
      euTotalCostLabel.textContent = TC.toFixed(2);
      euSalesPriceEUROLabel.textContent = SPE.toFixed(2);
      euNetProfitLabel.textContent = NP.toFixed(2);
      euPercentLabel.textContent = (PC * 100).toFixed(2) + '%';
      euUKLabel.textContent = UK.toFixed(2);
      euSWELabel.textContent = SWE.toFixed(2);
      euPLLabel.textContent = PL.toFixed(2);
    }
  
    euSellerPriceInput.addEventListener('input', calculateEU);
    euShippingUSDInput.addEventListener('input', calculateEU);
    euSalesPriceUSDInput.addEventListener('input', calculateEU);
    euComInput.addEventListener('input', calculateEU);
  });
});