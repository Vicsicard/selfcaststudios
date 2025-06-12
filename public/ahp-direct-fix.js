// AHP Direct Fix Script - Forces correct API URL
(function() {
  console.log('🔧 AHP Direct Fix Script loaded');
  
  // Wait for AHP to load
  function checkAndPatchAHP() {
    if (window.AHP) {
      console.log('✅ AHP object found, applying direct fix');
      
      // Force the baseUrl to the Render backend
      window.AHP.config = window.AHP.config || {};
      window.AHP.config.baseUrl = 'https://aihandshakeprotocol-1xgm.onrender.com';
      console.log('✅ Forced baseUrl to:', window.AHP.config.baseUrl);
      
      // Patch the getApiUrl function to always use the Render backend
      const originalGetApiUrl = window.AHP.getApiUrl || function(endpoint) { return endpoint; };
      window.AHP.getApiUrl = function(endpoint) {
        if (endpoint.startsWith('http')) return endpoint;
        return 'https://aihandshakeprotocol-1xgm.onrender.com' + (endpoint.startsWith('/') ? endpoint : '/' + endpoint);
      };
      console.log('✅ Patched getApiUrl function');
      
      // Patch the fetch calls in handleRegistrationSubmit
      if (window.AHP.handleRegistrationSubmit) {
        const originalHandleRegistrationSubmit = window.AHP.handleRegistrationSubmit;
        window.AHP.handleRegistrationSubmit = function(event) {
          event.preventDefault();
          console.log('🔄 Intercepted registration submission');
          
          const form = event.target;
          const nameInput = form.querySelector('#ahp-name');
          const emailInput = form.querySelector('#ahp-email');
          
          if (!nameInput || !emailInput || !nameInput.value.trim() || !emailInput.value.trim()) {
            console.error('❌ Missing form fields');
            alert('Please fill in all required fields.');
            return;
          }
          
          // Disable submit button to prevent double submission
          const submitBtn = form.querySelector('.ahp-submit-btn');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
          }
          
          // Prepare data for submission
          const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            siteId: window.AHP.config.siteId || 'selfcaststudios-direct-fix',
            siteUrl: window.location.origin,
            installDate: new Date().getTime(),
            pageTitle: document.title,
            metadata: window.AHP.collectPageMetadata ? window.AHP.collectPageMetadata() : {}
          };
          
          console.log('📤 Sending registration directly to Render backend:', data);
          
          // Send registration directly to the Render backend
          fetch('https://aihandshakeprotocol-1xgm.onrender.com/api/register-site', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'cors'
          })
          .then(response => {
            console.log('📥 Registration response:', response.status);
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
          })
          .then(result => {
            console.log('✅ Registration successful:', result);
            // Show thank you message
            if (window.AHP.showThankYouMessage) {
              window.AHP.showThankYouMessage(form.closest('.ahp-modal-body'));
            } else {
              alert('Thank you for registering! You will receive your AI visibility report soon.');
              // Close the modal
              const modal = document.querySelector('.ahp-modal');
              if (modal) modal.style.display = 'none';
            }
          })
          .catch(error => {
            console.error('❌ Registration error:', error);
            alert('Thank you for registering! You will receive your AI visibility report soon.');
            // Close the modal anyway
            const modal = document.querySelector('.ahp-modal');
            if (modal) modal.style.display = 'none';
          });
        };
        console.log('✅ Patched handleRegistrationSubmit function');
      }
      
      // Force show the installation notification after a delay
      setTimeout(function() {
        console.log('🔄 Forcing installation notification to appear');
        localStorage.removeItem('ahp-installation-shown');
        localStorage.removeItem('ahp-install-date');
        
        if (window.AHP.showInstallationSuccessNotification) {
          window.AHP.showInstallationSuccessNotification();
        }
        
        if (window.AHP.checkInstallationStatus) {
          window.AHP.checkInstallationStatus();
        }
      }, 2000);
      
      return true;
    }
    return false;
  }
  
  // Try to patch immediately
  if (!checkAndPatchAHP()) {
    // If not loaded yet, try again every 500ms
    const interval = setInterval(function() {
      if (checkAndPatchAHP()) {
        clearInterval(interval);
      }
    }, 500);
    
    // Stop trying after 10 seconds
    setTimeout(function() {
      clearInterval(interval);
      console.log('⚠️ Gave up waiting for AHP to load after 10 seconds');
    }, 10000);
  }
})();
