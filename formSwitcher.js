// formSwitcher.js
document.addEventListener('DOMContentLoaded', () => {
  const forms = {
    usForm: document.getElementById('usForm'),
    euForm: document.getElementById('euForm'),
    aeForm: document.getElementById('aeForm'),
    caForm: document.getElementById('caForm'),
    saForm: document.getElementById('saForm')
  };

  const buttons = {
    usButton: document.getElementById('usButton'),
    euButton: document.getElementById('euButton'),
    aeButton: document.getElementById('aeButton'),
    caButton: document.getElementById('caButton'),
    saButton: document.getElementById('saButton')
  };

  function switchForm(activeButtonId, activeFormId) {
    // Remove active class from all buttons
    Object.values(buttons).forEach(button => {
      button.classList.remove('active');
    });

    // Add active class to the clicked button
    buttons[activeButtonId].classList.add('active');

    // Handle form transitions
    Object.values(forms).forEach(form => {
      form.classList.remove('animate__animated', 'animate__slideInRight', 'animate__slideOutLeft', 'animate__fadeOut', 'animate__fadeIn');
      
      if (form.id === activeFormId) {
        form.style.display = 'block';
        form.classList.add('animate__animated', 'animate__fadeIn');  // Use fadeIn for smoother transition
      } else if (form.style.display === 'block') {
        form.classList.add('animate__animated', 'animate__fadeOut'); // Use fadeOut for smoother transition
        form.addEventListener('animationend', () => {
          form.style.display = 'none';
        }, { once: true });
      }
    });
  }

  buttons.usButton.addEventListener('click', () => switchForm('usButton', 'usForm'));
  buttons.euButton.addEventListener('click', () => switchForm('euButton', 'euForm'));
  buttons.aeButton.addEventListener('click', () => switchForm('aeButton', 'aeForm'));
  buttons.caButton.addEventListener('click', () => switchForm('caButton', 'caForm'));
  buttons.saButton.addEventListener('click', () => switchForm('saButton', 'saForm'));

  // Initialize with US form visible
  switchForm('usButton', 'usForm');
});
