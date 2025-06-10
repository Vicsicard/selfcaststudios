/**
 * AHP Module 2.0 Test Script for Self Cast Studios
 * 
 * This script tests the AHP Module 2.0 functionality on the Self Cast Studios website.
 * Run this script in the browser console when visiting http://localhost:3000
 */

(function() {
  // Configuration - specific to Self Cast Studios
  const AHP_SERVER = 'https://aihandshakeprotocol-1xgm.onrender.com';
  const BUNDLE_URL = `${AHP_SERVER}/ahp-universal-bundle.js`;
  const SITE_ID = 'selfcaststudios';
  const TEST_USER = {
    name: 'Self Cast Studios Admin',
    email: 'admin@selfcaststudios.com'
  };
  
  console.log('🔍 AHP Test: Starting test of AHP Module 2.0 on Self Cast Studios');
  console.log(`📋 Test Info:
  - Current site: ${window.location.origin}
  - Test site ID: ${SITE_ID}
  - AHP server: ${AHP_SERVER}
  `);
  
  // Step 1: Test direct API endpoints first
  testDirectAPIs()
    .then(() => testAHPFunctionality())
    .catch(error => console.error('❌ Test failed:', error));
  
  // Test API endpoints directly
  async function testDirectAPIs() {
    console.log('🔬 PHASE 1: Testing API endpoints directly');
    
    // Test metadata-scan endpoint
    console.log('🔄 Testing /api/metadata-scan endpoint...');
    
    try {
      const metadataResponse = await fetch(`${AHP_SERVER}/api/metadata-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: window.location.href,
          siteId: SITE_ID
        })
      });
      
      const metadataResult = await metadataResponse.json();
      console.log(`${metadataResponse.ok ? '✅' : '❌'} Metadata Scan Response:`, metadataResult);
      
      // Extract metadata for registration
      const extractedMetadata = metadataResult.success ? metadataResult.metadata : {
        standard: {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || ''
        }
      };
      
      // Test register-site endpoint
      console.log('🔄 Testing /api/register-site endpoint...');
      
      const registerData = {
        name: TEST_USER.name,
        email: TEST_USER.email,
        siteId: SITE_ID,
        siteUrl: window.location.origin,
        installDate: Date.now(),
        pageTitle: document.title,
        metadata: {
          title: extractedMetadata.standard?.title || document.title,
          description: extractedMetadata.standard?.description || '',
          url: window.location.href
        }
      };
      
      const registerResponse = await fetch(`${AHP_SERVER}/api/register-site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      
      const registerResult = await registerResponse.json();
      console.log(`${registerResponse.ok ? '✅' : '❌'} Register Site Response:`, registerResult);
      
    } catch (error) {
      console.error('❌ API Test Error:', error);
    }
  }
  
  // Test AHP functionality
  function testAHPFunctionality() {
    console.log('🔬 PHASE 2: Testing AHP Module functionality');
    
    // Check if AHP is loaded
    if (window.AHP) {
      console.log('✅ AHP object exists in window');
      
      // Test initialization
      if (typeof window.AHP.init === 'function') {
        try {
          window.AHP.init({
            siteId: SITE_ID,
            badgeEnabled: true,
            badgePosition: 'bottom-right'
          });
          console.log('✅ AHP initialized with site info');
        } catch (error) {
          console.error('❌ Error initializing AHP:', error);
        }
      } else {
        console.error('❌ AHP.init function not found');
      }
      
      // Test badge rendering
      if (typeof window.AHP.renderBadge === 'function') {
        try {
          window.AHP.renderBadge();
          console.log('✅ Badge rendering function called');
          
          // Check if badge is visible in DOM
          setTimeout(() => {
            const badge = document.querySelector('.ahp-badge');
            if (badge) {
              console.log('✅ AHP badge is visible in DOM');
            } else {
              console.warn('⚠️ AHP badge not found in DOM');
            }
          }, 1000);
        } catch (error) {
          console.error('❌ Error rendering badge:', error);
        }
      } else {
        console.error('❌ AHP.renderBadge function not found');
      }
      
      // Show the installation success notification
      setTimeout(() => {
        if (typeof window.AHP.showInstallationSuccessNotification === 'function') {
          try {
            window.AHP.showInstallationSuccessNotification();
            console.log('✅ Installation success notification displayed');
            
            // Find and fill the form
            setTimeout(() => {
              const form = document.querySelector('#ahp-registration-form');
              if (form) {
                const nameInput = form.querySelector('input[name="name"]');
                const emailInput = form.querySelector('input[name="email"]');
                
                if (nameInput && emailInput) {
                  nameInput.value = TEST_USER.name;
                  emailInput.value = TEST_USER.email;
                  console.log('✅ Form filled with test data');
                  
                  // Submit the form
                  console.log('🔄 Submitting registration form...');
                  const submitButton = form.querySelector('button[type="submit"]');
                  if (submitButton) {
                    submitButton.click();
                  } else {
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(submitEvent);
                  }
                  
                  // Check for thank you message
                  setTimeout(() => {
                    const thankYouMessage = document.querySelector('.ahp-thank-you-message');
                    if (thankYouMessage) {
                      console.log('✅ Thank you message displayed - form submission successful!');
                    } else {
                      console.warn('⚠️ Thank you message not found - form submission may have failed');
                    }
                  }, 2000);
                } else {
                  console.warn('⚠️ Name or email input not found in form');
                }
              } else {
                console.warn('⚠️ Registration form not found');
              }
            }, 2000);
          } catch (error) {
            console.error('❌ Error showing installation success notification:', error);
          }
        } else {
          console.error('❌ AHP.showInstallationSuccessNotification function not found');
        }
      }, 3000);
    } else {
      console.error('❌ AHP object not found in window');
      
      // Try loading the module directly
      console.log('🔄 Attempting to load AHP module directly...');
      
      const moduleScript = document.createElement('script');
      moduleScript.src = `${AHP_SERVER}/module/module.js`;
      moduleScript.async = true;
      
      moduleScript.onload = function() {
        console.log('✅ AHP module loaded successfully');
        
        // Load the universal patch
        const patchScript = document.createElement('script');
        patchScript.src = `${AHP_SERVER}/universal-ahp-patch.js`;
        patchScript.async = true;
        
        patchScript.onload = function() {
          console.log('✅ Universal patch loaded successfully');
          
          // Try again with the loaded module
          setTimeout(() => {
            if (window.AHP) {
              console.log('✅ AHP object now exists in window');
              testAHPFunctionality();
            } else {
              console.error('❌ AHP object still not found after loading module');
            }
          }, 1000);
        };
        
        patchScript.onerror = function() {
          console.error('❌ Failed to load universal patch');
        };
        
        document.head.appendChild(patchScript);
      };
      
      moduleScript.onerror = function() {
        console.error('❌ Failed to load AHP module');
      };
      
      document.head.appendChild(moduleScript);
    }
  }
})();
