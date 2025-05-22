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
        respectPrivacy: true
    }
};

// Ad Management Functions
class AdManager {
    constructor() {
        this.adsLoaded = false;
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
}

// Initialize ad manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.adManager === 'undefined') {
        window.adManager = new AdManager();
    }
});

// Export for use in main game script
window.ADS_CONFIG = ADS_CONFIG; 