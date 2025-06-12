// AHP Standalone Implementation for Selfcast Studios
(function() {
  // Check if already initialized to prevent multiple instances
  if (window.AHP && window.AHP._initialized) {
    console.log('🔄 AHP Standalone Implementation already initialized, skipping');
    return;
  }
  
  console.log('🚀 AHP Standalone Implementation loading...');
  
  // Create AHP object if it doesn't exist
  window.AHP = window.AHP || {};
  
  // Set initialization flag
  window.AHP._initialized = true;
  
  // Configuration
  window.AHP.config = {
    siteId: 'selfcaststudios-' + Math.random().toString(36).substring(2, 10),
    badgeEnabled: true,
    badgePosition: 'bottom-right',
    showInstallNotification: true,
    installationDate: new Date().getTime(),
    baseUrl: 'https://aihandshakeprotocol-1xgm.onrender.com',
    debug: true
  };
  
  // Utility functions
  window.AHP.getApiUrl = function(endpoint) {
    if (endpoint.startsWith('http')) return endpoint;
    return window.AHP.config.baseUrl + (endpoint.startsWith('/') ? endpoint : '/' + endpoint);
  };
  
  window.AHP.log = function(message, data) {
    if (window.AHP.config.debug) {
      console.log('AHP:', message, data || '');
    }
  };
  
  // Page metadata collection
  window.AHP.collectPageMetadata = function() {
    const metadata = {
      standard: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
      }
    };
    
    // Try to get Open Graph metadata
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const ogDescription = document.querySelector('meta[property="og:description"]')?.content;
    const ogImage = document.querySelector('meta[property="og:image"]')?.content;
    
    if (ogTitle || ogDescription || ogImage) {
      metadata.openGraph = {
        title: ogTitle || metadata.standard.title,
        description: ogDescription || metadata.standard.description,
        image: ogImage || ''
      };
    }
    
    return metadata;
  };
  
  // Create and show the modal
  window.AHP.createModal = function() {
    window.AHP.log('Creating registration modal');
    
    // Check if modal already exists
    if (document.querySelector('.ahp-modal')) {
      window.AHP.log('Modal already exists, not creating another one');
      return;
    }
    
    // Create modal HTML
    const modalHTML = `
      <div class="ahp-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 9999;">
        <div class="ahp-modal-content" style="background: white; padding: 30px; border-radius: 8px; max-width: 500px; width: 90%;">
          <h2 style="margin-top: 0;">Register Your AI Handshake Protocol</h2>
          <p>Complete your registration to ensure your site is properly indexed by AI systems.</p>
          <form id="ahp-registration-form">
            <div style="margin-bottom: 15px;">
              <label for="ahp-name" style="display: block; margin-bottom: 5px;">Your Name</label>
              <input type="text" id="ahp-name" name="name" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
            </div>
            <div style="margin-bottom: 15px;">
              <label for="ahp-email" style="display: block; margin-bottom: 5px;">Your Email</label>
              <input type="email" id="ahp-email" name="email" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
            </div>
            <button type="submit" class="ahp-submit-btn" style="background: #3366FF; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Complete Registration</button>
          </form>
        </div>
      </div>
    `;
    
    // Add modal to DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Add event listener to form
    const form = document.getElementById('ahp-registration-form');
    if (form) {
      form.addEventListener('submit', window.AHP.handleRegistrationSubmit);
    }
  };
  
  // Show thank you message
  window.AHP.showThankYouMessage = function(container) {
    window.AHP.log('Showing thank you message');
    
    if (!container) {
      container = document.querySelector('.ahp-modal-content');
    }
    
    if (container) {
      container.innerHTML = `
        <h2>Thank You!</h2>
        <p>Your registration has been successfully submitted. You will receive your AI visibility report soon.</p>
        <button id="ahp-close-btn" style="background: #3366FF; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Close</button>
      `;
      
      document.getElementById('ahp-close-btn').addEventListener('click', function() {
        document.querySelector('.ahp-modal').style.display = 'none';
      });
    }
  };
  
  // Handle registration form submission
  window.AHP.handleRegistrationSubmit = function(event) {
    event.preventDefault();
    window.AHP.log('Registration form submitted');
    
    const form = event.target;
    const nameInput = form.querySelector('#ahp-name');
    const emailInput = form.querySelector('#ahp-email');
    
    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
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
      siteId: window.AHP.config.siteId,
      siteUrl: window.location.origin,
      installDate: window.AHP.config.installationDate,
      pageTitle: document.title,
      metadata: window.AHP.collectPageMetadata()
    };
    
    window.AHP.log('Sending registration data', data);
    
    // Log the full API URL for debugging
    const apiUrl = window.AHP.getApiUrl('/api/register-site');
    console.log('📡 Sending registration to:', apiUrl);
    
    // Send registration directly to the Render backend with detailed logging
    fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Source': 'selfcaststudios-standalone-script'
      },
      body: JSON.stringify(data),
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      window.AHP.log('Registration response status', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      window.AHP.log('Registration successful', result);
      window.AHP.showThankYouMessage(form.closest('.ahp-modal-content'));
      
      // Store that installation was shown
      localStorage.setItem('ahp-installation-shown', 'true');
      localStorage.setItem('ahp-install-date', window.AHP.config.installationDate);
    })
    .catch(error => {
      console.error('Registration error:', error);
      alert('Thank you for registering! You will receive your AI visibility report soon.');
      
      // Close the modal anyway
      const modal = document.querySelector('.ahp-modal');
      if (modal) modal.style.display = 'none';
      
      // Store that installation was shown even on error
      localStorage.setItem('ahp-installation-shown', 'true');
      localStorage.setItem('ahp-install-date', window.AHP.config.installationDate);
    });
  };
  
  // Show installation notification
  window.AHP.showInstallationSuccessNotification = function() {
    window.AHP.log('Showing installation notification');
    
    // Check if already shown or if modal already exists
    if (localStorage.getItem('ahp-installation-shown') === 'true' || document.querySelector('.ahp-modal')) {
      window.AHP.log('Installation notification already shown or modal already exists');
      return;
    }
    
    // Create and show the modal
    window.AHP.createModal();
    
    // Store that installation was shown
    localStorage.setItem('ahp-installation-shown', 'true');
    localStorage.setItem('ahp-install-date', window.AHP.config.installationDate);
  };
  
  // Check installation status
  window.AHP.checkInstallationStatus = function() {
    window.AHP.log('Checking installation status');
    
    // Reset installation flags to force notification
    localStorage.removeItem('ahp-installation-shown');
    localStorage.removeItem('ahp-install-date');
    
    // Show installation notification
    window.AHP.showInstallationSuccessNotification();
  };
  
  // Initialize AHP
  window.AHP.init = function(config) {
    // Merge provided config with defaults
    if (config) {
      Object.assign(window.AHP.config, config);
    }
    
    window.AHP.log('Initialized with config', window.AHP.config);
    
    // Force check installation status after a short delay
    setTimeout(function() {
      window.AHP.checkInstallationStatus();
    }, 1000);
  };
  
  // Auto-initialize
  console.log('🎉 AHP Standalone Implementation loaded successfully');
  
  // Initialize after a short delay
  setTimeout(function() {
    window.AHP.init();
  }, 500);
})();
