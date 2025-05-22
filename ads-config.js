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
        consentRequired: true // Require consent for personalized ads
    }
};

// Ad Management Functions
class AdManager {
    constructor() {
        this.adsLoaded = false;
        this.consentStatus = 'unknown';
        this.initializeConsentManagement();
        this.initializeAds();
    }

    initializeAds() {
        // Check if AdSense is available
        if (typeof adsbygoogle !== 'undefined') {
            this.adsLoaded = true;
            this.loadAllAds();
        } else {
            // Retry loading ads after a delay
            setTimeout(() => this.initializeAds(), 1000);
        }
    }

    loadAllAds() {
        try {
            // Load all static ads
            const adElements = document.querySelectorAll('.adsbygoogle');
            adElements.forEach(() => {
                (adsbygoogle = window.adsbygoogle || []).push({});
            });
        } catch (error) {
            console.log('Ad loading error:', error);
        }
    }

    loadInterstitialAd() {
        if (!this.adsLoaded) return;
        
        try {
            const interstitialAd = document.querySelector('.ad-interstitial .adsbygoogle');
            if (interstitialAd && !interstitialAd.innerHTML) {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.log('Interstitial ad loading skipped');
        }
    }

    // Track ad performance and user engagement
    trackAdEvent(eventName, adSlot) {
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
            return false;
        }
        return ADS_CONFIG.settings.respectPrivacy;
    }

    // Consent Management Platform integration
    initializeConsentManagement() {
        if (!ADS_CONFIG.settings.enableConsentManagement) return;

        // Wait for Google FC (Funding Choices) to load
        window.addEventListener('load', () => {
            if (typeof window.googlefc !== 'undefined') {
                // Set up consent change callback
                window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
                window.googlefc.callbackQueue.push({
                    'CONSENT_DATA_READY': () => {
                        this.handleConsentUpdate();
                    }
                });
            }
        });
    }

    // Handle consent updates
    handleConsentUpdate() {
        if (typeof window.googlefc !== 'undefined' && window.googlefc.getConsentData) {
            const consentData = window.googlefc.getConsentData();
            
            if (consentData && consentData.gdprApplies) {
                // GDPR applies, check if user has given consent
                const hasConsent = consentData.hasConsentFor && 
                                 consentData.hasConsentFor('STORAGE') && 
                                 consentData.hasConsentFor('PERSONALIZATION');
                
                if (hasConsent) {
                    this.loadPersonalizedAds();
                } else {
                    this.loadNonPersonalizedAds();
                }
            } else {
                // GDPR doesn't apply, load normal ads
                this.loadAllAds();
            }
        }
    }

    // Load personalized ads (with user consent)
    loadPersonalizedAds() {
        console.log('Loading personalized ads with user consent');
        this.loadAllAds();
        this.trackAdEvent('consent_granted', 'personalized_ads');
    }

    // Load non-personalized ads (without consent)
    loadNonPersonalizedAds() {
        console.log('Loading non-personalized ads');
        // Set request for non-personalized ads
        if (typeof window.adsbygoogle !== 'undefined') {
            window.adsbygoogle.requestNonPersonalizedAds = 1;
        }
        this.loadAllAds();
        this.trackAdEvent('consent_denied', 'non_personalized_ads');
    }
}

// Initialize ad manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.adManager === 'undefined') {
        window.adManager = new AdManager();
    }
});

// Export for use in main game script
window.ADS_CONFIG = ADS_CONFIG; 