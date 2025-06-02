/**
 * AI Handshake Protocol Module v2.0
 * Lightweight, embeddable script that renders a badge, sends tracking beacons
 * for AI crawlers visiting the site, suggests metadata improvements, and
 * provides installation success notification with user registration for analysis reports.
 */
(function() {
  // Configuration with defaults that can be overridden
  const config = {
    siteId: null,
    badgePosition: 'bottom-right',
    badgeStyle: 'standard',
    trackEndpoint: 'https://aihandshake.org/api/track-bot',
    metadataEndpoint: 'https://aihandshake.org/api/metadata-scan',
    metaEndpoint: '/.well-known/ahp-meta.json',
    registerEndpoint: 'https://aihandshake.org/api/register-site',
    analyzeEndpoint: 'https://aihandshake.org/api/analyze-site',
    suggestMetadata: true,
    customCSS: '',
    debug: false,
    showInstallNotification: true,
    installationDate: null
  };
  
  // Auto-generate a site ID if none is provided
  if (!config.siteId) {
    // Create a unique identifier based on the domain
    const domain = window.location.hostname;
    config.siteId = `auto-${domain}-${btoa(domain).replace(/[=+/]/g, '').substring(0, 8)}`;
  }

  // Known AI bot user agents
  const AI_BOTS = {
    'GPTBot': 'openai',
    'Googlebot': 'google',
    'Bingbot': 'microsoft',
    'CCBot': 'commoncrawl',
    'facebookexternalhit': 'facebook',
    'Applebot': 'apple',
    'PerplexityBot': 'perplexity',
    'anthropic-ai': 'anthropic',
    'Claude-Web': 'anthropic',
    'cohere-ai': 'cohere',
    'ClaudeBot': 'anthropic',
    'Bytespider': 'bytedance',
    'Twitterbot': 'twitter',
    'LinkedInBot': 'linkedin',
    'Diffbot': 'diffbot',
    'MetaInspector': 'meta',
    'AdsBot-Google': 'google',
    'AhrefsBot': 'ahrefs',
    'SemrushBot': 'semrush'
  };

  // Badge HTML templates
  const BADGE_TEMPLATES = {
    standard: `
      <div class="ahp-badge">
        <div class="ahp-badge-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <div class="ahp-badge-text">AI Handshake Protected</div>
      </div>
    `,
    minimal: `
      <div class="ahp-badge ahp-badge-minimal">
        <div class="ahp-badge-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      </div>
    `
  };

  // Default CSS styles
  const DEFAULT_CSS = `
    .ahp-badge {
      position: fixed;
      z-index: 9999;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      color: #333;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }
    .ahp-badge:hover {
      opacity: 1;
    }
    .ahp-badge-icon {
      margin-right: 6px;
      color: #2563eb;
    }
    .ahp-badge-text {
      font-weight: 500;
    }
    .ahp-badge-minimal {
      padding: 6px;
      background-color: rgba(255, 255, 255, 0.7);
    }
    .ahp-badge-minimal .ahp-badge-icon {
      margin-right: 0;
    }
    .ahp-badge-bottom-right {
      bottom: 20px;
      right: 20px;
    }
    .ahp-badge-bottom-left {
      bottom: 20px;
      left: 20px;
    }
    .ahp-badge-top-right {
      top: 20px;
      right: 20px;
    }
    .ahp-badge-top-left {
      top: 20px;
      left: 20px;
    }
  `;

  // Installation success notification HTML template
  const INSTALL_SUCCESS_TEMPLATE = `
    <div class="ahp-modal-overlay">
      <div class="ahp-modal">
        <div class="ahp-modal-header">
          <h2>Installation Successful!</h2>
          <button class="ahp-close-btn">×</button>
        </div>
        <div class="ahp-modal-body">
          <div class="ahp-success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
              <circle cx="12" cy="12" r="11" fill="#4CAF50" stroke="none"/>
              <path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
          </div>
          <p>AI Handshake Protocol Module 2.0 has been successfully installed on your website!</p>
          <p>To start analyzing your content and receive a personalized AI visibility report, please provide your contact information:</p>
          <form id="ahp-registration-form">
            <div class="ahp-form-group">
              <label for="ahp-name">Your Name</label>
              <input type="text" id="ahp-name" name="name" required placeholder="Enter your name">
            </div>
            <div class="ahp-form-group">
              <label for="ahp-email">Email Address</label>
              <input type="email" id="ahp-email" name="email" required placeholder="Enter your email">
            </div>
            <div class="ahp-form-group">
              <button type="submit" class="ahp-submit-btn">Start Analysis</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Additional CSS for installation notification and registration form
  const INSTALL_NOTIFICATION_CSS = `
    .ahp-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
    }
    .ahp-modal {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      width: 90%;
      max-width: 500px;
      overflow: hidden;
      animation: ahp-modal-in 0.3s ease-out;
    }
    @keyframes ahp-modal-in {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .ahp-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }
    .ahp-modal-header h2 {
      margin: 0;
      font-size: 18px;
      color: #212529;
      font-weight: 600;
    }
    .ahp-modal-body {
      padding: 20px;
    }
    .ahp-success-icon {
      text-align: center;
      margin-bottom: 20px;
    }
    .ahp-form-group {
      margin-bottom: 16px;
    }
    .ahp-form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #495057;
    }
    .ahp-form-group input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .ahp-form-group input:focus {
      border-color: #3366FF;
      outline: none;
      box-shadow: 0 0 0 3px rgba(51, 102, 255, 0.25);
    }
    .ahp-submit-btn {
      background-color: #3366FF;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 20px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s;
    }
    .ahp-submit-btn:hover {
      background-color: #2952cc;
    }
    .ahp-close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6c757d;
      padding: 0;
      line-height: 1;
    }
    .ahp-close-btn:hover {
      color: #343a40;
    }
    .ahp-thank-you {
      text-align: center;
      padding: 20px;
    }
    .ahp-thank-you h3 {
      margin-top: 0;
      color: #3366FF;
    }
  `;

  // Initialize the widget
  function init() {
    // Try to get configuration from script tag
    const scriptTag = document.currentScript || (function() {
      const scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();

    // Parse data attributes from script tag
    if (scriptTag) {
      Object.keys(config).forEach(key => {
        const dataAttr = scriptTag.getAttribute(`data-${kebabCase(key)}`);
        if (dataAttr !== null) {
          config[key] = dataAttr;
        }
      });
    }

    // Parse global configuration if available
    if (window.AHPConfig) {
      Object.assign(config, window.AHPConfig);
    }

    // Generate a unique site ID based on the domain if none is provided
    if (!config.siteId) {
      const domain = window.location.hostname;
      // Create a unique identifier based on the domain
      // Format: domain-[base64 hash of domain]
      try {
        config.siteId = `auto-${domain}-${btoa(domain).replace(/[=+/]/g, '').substring(0, 8)}`;
      } catch (e) {
        // Fallback if btoa fails
        config.siteId = `auto-${domain}-${Math.random().toString(36).substring(2, 10)}`;
      }
      log('Auto-generated site ID: ' + config.siteId, 'info');
    }

    // Add CSS to the document
    addStyles();

    // Detect if current visitor is an AI bot
    const botInfo = detectBot();
    
    // Send tracking beacon if it's a bot
    if (botInfo) {
      sendBeacon(botInfo);
    }

    // Render badge if not disabled
    renderBadge();

    // Try to fetch metadata for additional configuration
    fetchMetadata();
    
    // Check if this is a new installation and show notification
    checkInstallationStatus();

    log('AI Handshake Protocol Widget initialized');
  }

  // Convert camelCase to kebab-case for data attributes
  function kebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  // Add styles to the document
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = DEFAULT_CSS + INSTALL_NOTIFICATION_CSS + (config.customCSS || '');
    document.head.appendChild(style);
  }

  // Detect if the current visitor is an AI bot
  function detectBot() {
    const userAgent = navigator.userAgent;
    
    for (const [botPattern, botName] of Object.entries(AI_BOTS)) {
      if (userAgent.includes(botPattern)) {
        return botName;
      }
    }

    // Special case for server-side detection via HTTP headers
    // This won't work client-side but is here for completeness
    if (document.querySelector('meta[name="x-detected-bot"]')) {
      const botMeta = document.querySelector('meta[name="x-detected-bot"]');
      return botMeta.getAttribute('content');
    }

    return null;
  }

  // Send tracking beacon to the server
  function sendBeacon(botName) {
    // Prepare data for POST request
    const data = {
      siteId: config.siteId,
      botType: botName,
      pageUrl: window.location.href,
      metadata: {
        title: document.title,
        referrer: document.referrer,
        viewport: window.innerWidth + 'x' + window.innerHeight
      }
    };

    // Use Navigator.sendBeacon if available, fallback to fetch
    if (navigator.sendBeacon) {
      try {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        navigator.sendBeacon(config.trackEndpoint, blob);
        log(`Beacon sent to ${config.trackEndpoint}`, 'info', data);
      } catch (e) {
        log(`Error sending beacon: ${e.message}`, 'error');
      }
    } else {
      fetch(config.trackEndpoint, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true 
      })
        .then(() => log(`Beacon sent to ${url.toString()}`))
        .catch(err => log(`Beacon error: ${err.message}`, 'error'));
    }
  }

  // Render the badge on the page
  function renderBadge() {
    const badgeTemplate = BADGE_TEMPLATES[config.badgeStyle] || BADGE_TEMPLATES.standard;
    
    const div = document.createElement('div');
    div.innerHTML = badgeTemplate.trim();
    const badge = div.firstChild;
    
    // Add position class
    badge.classList.add(`ahp-badge-${config.badgePosition}`);
    
    // Add click handler to open info popup
    badge.addEventListener('click', showInfoPopup);
    
    document.body.appendChild(badge);
    log('Badge rendered');
  }

  // Show info popup when badge is clicked
  function showInfoPopup() {
    // Simple popup implementation
    alert('This site is protected by AI Handshake Protocol.\nLearn more at aihandshake.com');
  }

  // Fetch metadata from the well-known location
  function fetchMetadata() {
    fetch(config.metaEndpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        log('Metadata fetched successfully', 'info', data);
        
        // Update badge if needed
        if (data.badgePosition) {
          updateBadgePosition(data.badgePosition);
        }
        
        if (data.badgeStyle) {
          updateBadgeStyle(data.badgeStyle);
        }
        
        if (data.customCSS) {
          updateCustomCSS(data.customCSS);
        }

        // Check if we should analyze metadata
        if (config.suggestMetadata) {
          analyzeMetadata();
        }
      })
      .catch(error => {
        log(`Error fetching metadata: ${error.message}`, 'error');
        
        // Still try to analyze metadata if enabled
        if (config.suggestMetadata) {
          analyzeMetadata();
        }
      });
  }

  // Analyze page metadata and suggest improvements
  function analyzeMetadata() {
    // Only run on non-bot visits
    if (detectBot()) return;
    
    // Basic metadata analysis
    const metaTags = {};
    document.querySelectorAll('meta').forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      if (name && content) {
        metaTags[name] = content;
      }
    });
    
    // Check for essential metadata
    const missingMetadata = [];
    
    if (!document.title || document.title.length < 10) {
      missingMetadata.push('title');
    }
    
    if (!metaTags['description']) {
      missingMetadata.push('description');
    }
    
    if (!metaTags['og:title'] && !metaTags['og:description']) {
      missingMetadata.push('og-tags');
    }
    
    // Check for AHP specific metadata
    let hasAhpMetadata = false;
    Object.keys(metaTags).forEach(key => {
      if (key.startsWith('ahp:')) {
        hasAhpMetadata = true;
      }
    });
    
    if (!hasAhpMetadata) {
      missingMetadata.push('ahp-metadata');
    }
    
    // If missing important metadata and admin is logged in, show notification
    if (missingMetadata.length > 0 && (window.ahpAdmin || localStorage.getItem('ahp-admin'))) {
      showMetadataNotification(missingMetadata);
    }
    
    log('Metadata analysis complete', 'info', { missingMetadata, metaTags });
  }
  
  // Show metadata improvement notification
  function showMetadataNotification(missingItems) {
    const notification = document.createElement('div');
    notification.className = 'ahp-metadata-notification';
    notification.innerHTML = `
      <div class="ahp-notification-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
        <span>AI Handshake Protocol</span>
        <button class="ahp-close-btn">×</button>
      </div>
      <div class="ahp-notification-body">
        <p>Your page is missing metadata that helps AI systems understand your content:</p>
        <ul>
          ${missingItems.includes('title') ? '<li>Page title is too short or missing</li>' : ''}
          ${missingItems.includes('description') ? '<li>Meta description is missing</li>' : ''}
          ${missingItems.includes('og-tags') ? '<li>Social media tags are missing</li>' : ''}
          ${missingItems.includes('ahp-metadata') ? '<li>AI Handshake Protocol metadata is missing</li>' : ''}
        </ul>
        <p>Improve your AI visibility by adding these tags.</p>
        <a href="https://aihandshake.org/dashboard" target="_blank" class="ahp-notification-btn">Fix Now</a>
      </div>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
      .ahp-metadata-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 320px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        z-index: 999999;
        overflow: hidden;
        border: 1px solid #e1e4e8;
      }
      .ahp-notification-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: #f6f8fa;
        border-bottom: 1px solid #e1e4e8;
        color: #24292e;
      }
      .ahp-notification-header svg {
        margin-right: 8px;
        color: #3366FF;
      }
      .ahp-notification-header span {
        flex-grow: 1;
        font-weight: 600;
      }
      .ahp-close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6a737d;
      }
      .ahp-notification-body {
        padding: 16px;
        color: #24292e;
      }
      .ahp-notification-body p {
        margin: 0 0 12px;
        line-height: 1.5;
      }
      .ahp-notification-body ul {
        margin: 0 0 12px;
        padding-left: 20px;
      }
      .ahp-notification-body li {
        margin-bottom: 4px;
      }
      .ahp-notification-btn {
        display: inline-block;
        padding: 8px 16px;
        background: #3366FF;
        color: white;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 500;
        margin-top: 8px;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close button functionality
    notification.querySelector('.ahp-close-btn').addEventListener('click', () => {
      notification.remove();
    });
  }

  // Update badge position
  function updateBadgePosition(position) {
    const badge = document.querySelector('.ahp-badge');
    if (badge) {
      // Remove existing position class
      ['bottom-right', 'bottom-left', 'top-right', 'top-left'].forEach(pos => {
        badge.classList.remove(`ahp-badge-${pos}`);
      });
      // Add new position class
      badge.classList.add(`ahp-badge-${position}`);
    }
  }

  // Update badge style
  function updateBadgeStyle(style) {
    const badge = document.querySelector('.ahp-badge');
    if (badge && BADGE_TEMPLATES[style]) {
      // Replace badge with new template
      const div = document.createElement('div');
      div.innerHTML = BADGE_TEMPLATES[style].trim();
      const newBadge = div.firstChild;
      
      // Copy classes and event listeners
      badge.classList.forEach(cls => {
        newBadge.classList.add(cls);
      });
      newBadge.addEventListener('click', showInfoPopup);
      
      badge.parentNode.replaceChild(newBadge, badge);
    }
  }

  // Update custom CSS
  function updateCustomCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Check if this is a new installation and show notification
  function checkInstallationStatus() {
    // Skip if notification is disabled
    if (!config.showInstallNotification) {
      return;
    }
    
    // Check if we've already shown the notification
    const installationShown = localStorage.getItem('ahp-installation-shown');
    if (installationShown) {
      return;
    }
    
    // Check if this is a recent installation (within the last 7 days)
    const now = new Date().getTime();
    let installDate = localStorage.getItem('ahp-install-date');
    
    if (!installDate) {
      // First time seeing the widget, set installation date
      installDate = now;
      localStorage.setItem('ahp-install-date', installDate);
      
      // Show installation success notification
      showInstallationSuccessNotification();
    } else {
      // Convert to number
      installDate = parseInt(installDate, 10);
      
      // Check if installation was recent (within 7 days)
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      if (now - installDate < sevenDaysMs) {
        // Only show if we haven't shown it yet
        showInstallationSuccessNotification();
      }
    }
  }
  
  // Show installation success notification with registration form
  function showInstallationSuccessNotification() {
    // Create modal element
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = INSTALL_SUCCESS_TEMPLATE.trim();
    const modal = modalDiv.firstChild;
    
    // Add to body
    document.body.appendChild(modal);
    
    // Mark as shown
    localStorage.setItem('ahp-installation-shown', 'true');
    
    // Add event listeners
    const closeBtn = modal.querySelector('.ahp-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    // Handle form submission
    const form = modal.querySelector('#ahp-registration-form');
    form.addEventListener('submit', handleRegistrationSubmit);
    
    log('Installation success notification shown');
  }
  
  // Handle registration form submission
  function handleRegistrationSubmit(event) {
    event.preventDefault();
    
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
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    // Prepare data for submission
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      siteId: config.siteId,
      siteUrl: window.location.origin,
      installDate: localStorage.getItem('ahp-install-date') || new Date().getTime(),
      pageTitle: document.title,
      metadata: collectPageMetadata()
    };
    
    // Send registration and trigger analysis
    fetch(config.registerEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        // Show thank you message
        showThankYouMessage(form.closest('.ahp-modal-body'));
        log('Registration successful', 'info', result);
      })
      .catch(error => {
        log(`Registration error: ${error.message}`, 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Analysis';
        alert('There was an error processing your request. Please try again.');
      });
  }
  
  // Collect page metadata for analysis
  function collectPageMetadata() {
    const metadata = {
      title: document.title,
      description: '',
      url: window.location.href,
      domain: window.location.hostname,
      ogTags: {},
      metaTags: {}
    };
    
    // Collect meta tags
    document.querySelectorAll('meta').forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      
      if (name && content) {
        if (name === 'description') {
          metadata.description = content;
        } else if (name.startsWith('og:')) {
          metadata.ogTags[name] = content;
        } else {
          metadata.metaTags[name] = content;
        }
      }
    });
    
    return metadata;
  }
  
  // Show thank you message after form submission
  function showThankYouMessage(container) {
    // Clear container
    container.innerHTML = `
      <div class="ahp-thank-you">
        <div class="ahp-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
            <circle cx="12" cy="12" r="11" fill="#3366FF" stroke="none"/>
            <path fill="white" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </div>
        <h3>Thank You!</h3>
        <p>Your site analysis is now in progress.</p>
        <p>We'll email your personalized AI visibility report shortly.</p>
      </div>
    `;
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      const modal = container.closest('.ahp-modal-overlay');
      if (modal) {
        modal.remove();
      }
    }, 5000);
  }

  // Logging utility
  function log(message, level = 'info', data = null) {
    if (config.debug) {
      const prefix = '[AHP Widget]';
      if (level === 'error') {
        console.error(prefix, message, data);
      } else {
        console.log(prefix, message, data);
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
