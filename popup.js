document.addEventListener('DOMContentLoaded', () => {
  const exchangeRateElement = document.getElementById('exchangeRate');

  // Retrieve the exchange rate from chrome.storage
  chrome.storage.local.get(['exchangeRate'], (result) => {
    if (result.exchangeRate !== undefined) {
      exchangeRateElement.textContent = result.exchangeRate;
    } else {
      exchangeRateElement.textContent = 'Veri alınamadı';
    }
  });

  const usButton = document.getElementById('usButton');
  const euButton = document.getElementById('euButton');
  const aeButton = document.getElementById('aeButton');
  const caButton = document.getElementById('caButton');
  const saButton = document.getElementById('saButton');

  const usForm = document.getElementById('usForm');
  const euForm = document.getElementById('euForm');
  const aeForm = document.getElementById('aeForm');
  const caForm = document.getElementById('caForm');
  const saForm = document.getElementById('saForm');


  function handleRegionSwitch(event) {
    const activeButton = event.target.id;

    [usButton, euButton, aeButton, caButton].forEach(button => {
      button.classList.remove('active');
    });

    document.getElementById(activeButton).classList.add('active');

    [usForm, euForm, aeForm, caForm].forEach(form => {
      form.style.display = 'none';
    });

    if (activeButton === 'usButton') {
      usForm.style.display = 'block';
    } else if (activeButton === 'euButton') {
      euForm.style.display = 'block';
    } else if (activeButton === 'aeButton') {
      aeForm.style.display = 'block';
    } else if (activeButton === 'caButton') {
      caForm.style.display = 'block';
    } else if (activeButton === 'saButton') {
      saForm.style.display = 'block';
    }
   
  }

  usButton.addEventListener('click', handleRegionSwitch);
  euButton.addEventListener('click', handleRegionSwitch);
  aeButton.addEventListener('click', handleRegionSwitch);
  caButton.addEventListener('click', handleRegionSwitch);
  saButton.addEventListener('click', handleRegionSwitch);


  handleRegionSwitch({ target: usButton });
});
document.getElementById('darkModeSwitch').addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});
