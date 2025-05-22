// Google Ads Configuration for Sweet Crush Game
// Replace these placeholder values with your actual Google AdSense publisher ID and ad slot IDs

const ADS_CONFIG = {
    // Replace with your actual Google AdSense publisher ID
    publisherId: 'ca-pub-3049833326692399',
    
    // Replace with your actual Google Analytics tracking ID
    analyticsId: 'GA_MEASUREMENT_ID',
    
    // Ad slot IDs - Replace with your actual ad slot IDs from AdSense
    adSlots: {
        bannerTop: '1234567890',
        bannerBottom: '5544332211',
        sidebar: '0987654321',
        mobileBottom: '1122334455',
        interstitial: '6677889900'
    },
    
    // Ad display settings
    settings: {
        showInterstitialFrequency: 3, // Show interstitial ad every 3 levels
        enableAutoAds: true,
        enableAnalytics: true,
        respectPrivacy: true,
        enableConsentManagement: true, // Enable Google CMP for GDPR compliance
        consentRequired: true, // Require consent for personalized ads
        debugMode: true, // Enable debug logging
        forceConsentForTesting: true // Set to true to test consent popup
    }
};

// Ad Management Functions
class AdManager {
    constructor() {
        this.adsLoaded = false;
        this.consentStatus = 'unknown';
        this.debugLog('AdManager initialized');
        this.initializeConsentManagement();
        this.initializeAds();
    }

    debugLog(message, data = null) {
        if (ADS_CONFIG.settings.debugMode) {
            console.log(`[AdManager Debug] ${message}`, data || '');
        }
    }

    initializeAds() {
        // Check if AdSense is available
        if (typeof adsbygoogle !== 'undefined') {
            this.adsLoaded = true;
            this.debugLog('AdSense loaded successfully');
            this.loadAllAds();
        } else {
            this.debugLog('AdSense not yet loaded, retrying...');
            // Retry loading ads after a delay
            setTimeout(() => this.initializeAds(), 1000);
        }
    }

    loadAllAds() {
        try {
            // Load all static ads
            const adElements = document.querySelectorAll('.adsbygoogle');
            this.debugLog(`Loading ${adElements.length} ad units`);
            adElements.forEach((ad, index) => {
                (adsbygoogle = window.adsbygoogle || []).push({});
                this.debugLog(`Ad unit ${index + 1} loaded`);
            });
        } catch (error) {
            this.debugLog('Ad loading error:', error);
        }
    }

    loadInterstitialAd() {
        if (!this.adsLoaded) return;
        
        try {
            const interstitialAd = document.querySelector('.ad-interstitial .adsbygoogle');
            if (interstitialAd && !interstitialAd.innerHTML) {
                (adsbygoogle = window.adsbygoogle || []).push({});
                this.debugLog('Interstitial ad loaded');
            }
        } catch (error) {
            this.debugLog('Interstitial ad loading error:', error);
        }
    }

    // Track ad performance and user engagement
    trackAdEvent(eventName, adSlot) {
        this.debugLog(`Tracking ad event: ${eventName} for ${adSlot}`);
        if (typeof gtag !== 'undefined' && ADS_CONFIG.settings.enableAnalytics) {
            gtag('event', eventName, {
                event_category: 'Advertisement',
                event_label: adSlot,
                value: 1
            });
        }
    }

    // Privacy-friendly ad loading
    respectUserPrivacy() {
        // Check for Do Not Track header
        if (navigator.doNotTrack === '1' || 
            window.doNotTrack === '1' || 
            navigator.msDoNotTrack === '1') {
            this.debugLog('Do Not Track detected');
            return false;
        }
        return ADS_CONFIG.settings.respectPrivacy;
    }

    // Consent Management Platform integration
    initializeConsentManagement() {
        if (!ADS_CONFIG.settings.enableConsentManagement) {
            this.debugLog('Consent management disabled');
            return;
        }

        this.debugLog('Initializing consent management...');

        // Check if we should force consent popup for testing
        if (ADS_CONFIG.settings.forceConsentForTesting) {
            this.debugLog('Force consent enabled - clearing consent data');
            this.clearConsentData();
        }

        // Wait for Google FC (Funding Choices) to load
        window.addEventListener('load', () => {
            this.debugLog('Window loaded, checking for Google FC');
            
            if (typeof window.googlefc !== 'undefined') {
                this.debugLog('Google FC found, setting up callbacks');
                // Set up consent change callback
                window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
                window.googlefc.callbackQueue.push({
                    'CONSENT_DATA_READY': () => {
                        this.debugLog('Consent data ready callback triggered');
                        this.handleConsentUpdate();
                    }
                });

                // Also check immediately if consent data is already available
                setTimeout(() => this.checkConsentStatus(), 2000);
            } else {
                this.debugLog('Google FC not found - consent popup may not appear');
                this.showConsentDebugInfo();
            }
        });
    }

    // Check current consent status for debugging
    checkConsentStatus() {
        this.debugLog('Checking consent status...');
        
        if (typeof window.googlefc !== 'undefined' && window.googlefc.getConsentData) {
            const consentData = window.googlefc.getConsentData();
            this.debugLog('Consent data received:', consentData);
            
            if (consentData) {
                this.debugLog('GDPR applies:', consentData.gdprApplies);
                this.debugLog('Consent given:', consentData.consentGiven);
                this.debugLog('Consent required:', consentData.consentRequired);
            }
        } else {
            this.debugLog('getConsentData not available');
        }
    }

    // Clear consent data for testing
    clearConsentData() {
        try {
            // Clear Google consent cookies
            document.cookie = '__gads=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = '__gpi=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = 'googlefc=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            
            // Clear localStorage
            localStorage.removeItem('googlefc');
            
            this.debugLog('Consent data cleared for testing');
        } catch (error) {
            this.debugLog('Error clearing consent data:', error);
        }
    }

    // Show debug info about consent setup
    showConsentDebugInfo() {
        this.debugLog('=== CONSENT DEBUG INFO ===');
        this.debugLog('User location (estimated):', Intl.DateTimeFormat().resolvedOptions().timeZone);
        this.debugLog('Publisher ID:', ADS_CONFIG.publisherId);
        this.debugLog('Consent management enabled:', ADS_CONFIG.settings.enableConsentManagement);
        this.debugLog('Force consent for testing:', ADS_CONFIG.settings.forceConsentForTesting);
        this.debugLog('Google FC script loaded:', typeof window.googlefc !== 'undefined');
        
        // Check if we're likely in a GDPR region
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const gdprRegions = ['Europe', 'London', 'Paris', 'Berlin', 'Amsterdam', 'Brussels', 'Rome', 'Madrid'];
        const likelyGdprRegion = gdprRegions.some(region => timezone.includes(region));
        this.debugLog('Likely GDPR region:', likelyGdprRegion);
        
        if (!likelyGdprRegion) {
            this.debugLog('⚠️ You may not see consent popup outside GDPR regions');
        }
        
        this.debugLog('=== END DEBUG INFO ===');
    }

    // Handle consent updates
    handleConsentUpdate() {
        this.debugLog('Handling consent update...');
        
        if (typeof window.googlefc !== 'undefined' && window.googlefc.getConsentData) {
            const consentData = window.googlefc.getConsentData();
            this.debugLog('Consent update data:', consentData);
            
            if (consentData && consentData.gdprApplies) {
                // GDPR applies, check if user has given consent
                const hasConsent = consentData.hasConsentFor && 
                                 consentData.hasConsentFor('STORAGE') && 
                                 consentData.hasConsentFor('PERSONALIZATION');
                
                this.debugLog('User has given consent:', hasConsent);
                
                if (hasConsent) {
                    this.loadPersonalizedAds();
                } else {
                    this.loadNonPersonalizedAds();
                }
            } else {
                // GDPR doesn't apply, load normal ads
                this.debugLog('GDPR does not apply, loading normal ads');
                this.loadAllAds();
            }
        }
    }

    // Load personalized ads (with user consent)
    loadPersonalizedAds() {
        this.debugLog('Loading personalized ads with user consent');
        this.loadAllAds();
        this.trackAdEvent('consent_granted', 'personalized_ads');
    }

    // Load non-personalized ads (without consent)
    loadNonPersonalizedAds() {
        this.debugLog('Loading non-personalized ads');
        // Set request for non-personalized ads
        if (typeof window.adsbygoogle !== 'undefined') {
            window.adsbygoogle.requestNonPersonalizedAds = 1;
        }
        this.loadAllAds();
        this.trackAdEvent('consent_denied', 'non_personalized_ads');
    }
}

// Helper function to test consent popup
window.testConsentPopup = function() {
    console.log('🧪 Testing consent popup...');
    
    if (window.adManager) {
        // Clear consent data and reload
        window.adManager.clearConsentData();
        
        // Reload the page to trigger consent popup
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        console.log('❌ AdManager not found');
    }
};

// Initialize ad manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.adManager === 'undefined') {
        window.adManager = new AdManager();
        
        // Add test button for consent popup (debug only)
        if (ADS_CONFIG.settings.debugMode) {
            setTimeout(() => {
                const testButton = document.createElement('button');
                testButton.textContent = '🧪 Test Consent Popup';
                testButton.style.cssText = `
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 99999;
                    background: #ff6b9d;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                testButton.onclick = window.testConsentPopup;
                document.body.appendChild(testButton);
                
                console.log('🧪 Debug mode enabled. Use the test button or call testConsentPopup() in console.');
            }, 2000);
        }
    }
});

// Export for use in main game script
window.ADS_CONFIG = ADS_CONFIG; 