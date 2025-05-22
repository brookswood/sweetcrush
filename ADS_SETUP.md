# 🎯 Google Ads Setup Guide for Sweet Crush

This guide will help you set up Google AdSense and Analytics for your Sweet Crush game to start earning revenue from your players.

## 📋 Prerequisites

Before you begin, you'll need:
- A Google AdSense account
- A Google Analytics account
- Your website/domain verified with Google
- Content that complies with Google AdSense policies

## 🚀 Step 1: Google AdSense Setup

### 1.1 Create AdSense Account
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Add your website URL and verify ownership
4. Wait for account approval (can take 24-48 hours)

### 1.2 Create Ad Units
Once approved, create the following ad units:

1. **Top Banner Ad (728x90 or responsive)**
   - Name: "Sweet Crush - Top Banner"
   - Size: Responsive or 728x90 leaderboard
   - Type: Display ads

2. **Sidebar Ad (300x250 or responsive)**
   - Name: "Sweet Crush - Sidebar"  
   - Size: Responsive or 300x250 medium rectangle
   - Type: Display ads

3. **Bottom Banner Ad (728x90 or responsive)**
   - Name: "Sweet Crush - Bottom Banner"
   - Size: Responsive or 728x90 leaderboard
   - Type: Display ads

4. **Mobile Bottom Ad (320x50 or responsive)**
   - Name: "Sweet Crush - Mobile Bottom"
   - Size: Responsive or 320x50 mobile banner
   - Type: Display ads

5. **Interstitial Ad (responsive)**
   - Name: "Sweet Crush - Level Complete"
   - Size: Responsive
   - Type: Display ads

## 🔧 Step 2: Configuration

### 2.1 Update ads-config.js

Replace the placeholder values in `ads-config.js`:

```javascript
const ADS_CONFIG = {
    // Replace with your actual publisher ID (found in AdSense dashboard)
    publisherId: 'ca-pub-1234567890123456',  // Your real publisher ID
    
    // Replace with your Google Analytics tracking ID
    analyticsId: 'GA_MEASUREMENT_ID',        // Your real GA tracking ID
    
    // Replace with your actual ad slot IDs from AdSense
    adSlots: {
        bannerTop: '1234567890',      // Top banner ad slot ID
        bannerBottom: '5544332211',   // Bottom banner ad slot ID
        sidebar: '0987654321',        // Sidebar ad slot ID
        mobileBottom: '1122334455',   // Mobile bottom ad slot ID
        interstitial: '6677889900'    // Interstitial ad slot ID
    }
};
```

### 2.2 Update HTML File

Replace the placeholder values in `index.html`:

1. **AdSense Script** (in `<head>` section):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
 crossorigin="anonymous"></script>
```

2. **Google Analytics** (in `<head>` section):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_TRACKING_ID');
</script>
```

3. **Ad Units** - Update each `data-ad-client` and `data-ad-slot`:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

## 📊 Step 3: Google Analytics Setup

### 3.1 Create Analytics Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your game
3. Copy the tracking ID (format: GA_MEASUREMENT_ID)

### 3.2 Set Up Goals
Create goals to track:
- Game completions
- Level progression
- Power-up usage
- Ad interactions

## 🎮 Step 4: Ad Placement Strategy

The Sweet Crush game includes strategically placed ads:

### 4.1 Desktop Layout
- **Top Banner**: Above the game board, non-intrusive
- **Sidebar**: Next to game controls, highly visible
- **Bottom Banner**: Below the game, catches attention after gameplay
- **Interstitial**: In level completion modal (every 3 levels)

### 4.2 Mobile Layout
- **Top Banner**: Smaller mobile-optimized banner
- **Mobile Bottom**: Replaces sidebar on mobile devices
- **Interstitial**: Same as desktop but mobile-optimized

### 4.3 User Experience Considerations
- Ads don't interfere with gameplay
- Interstitials only show every 3rd level completion
- Mobile ads are appropriately sized
- Loading placeholders prevent layout shifts

## 💰 Step 5: Revenue Optimization

### 5.1 Ad Settings
- Enable auto ads for additional revenue
- Use responsive ad units for better performance
- Test different ad frequencies
- Monitor user engagement vs. ad revenue

### 5.2 Performance Monitoring
Track these metrics:
- RPM (Revenue per 1000 impressions)
- CTR (Click-through rate)
- User retention after ad implementation
- Level completion rates

### 5.3 A/B Testing
Test different configurations:
- Ad frequency (every 2 vs 3 vs 5 levels)
- Ad placement positions
- Ad sizes and formats
- With/without certain ad positions

## 🔒 Step 6: Privacy & Compliance

### 6.1 Privacy Policy
Ensure your privacy policy covers:
- Google AdSense data collection
- Google Analytics tracking
- Cookie usage
- User data handling

### 6.2 GDPR Compliance
- Implement consent management if serving EU users
- Respect Do Not Track headers (already implemented)
- Provide opt-out mechanisms

### 6.3 AdSense Policies
Ensure compliance with:
- Content policy guidelines
- Ad placement policies
- Traffic quality standards
- Invalid activity policies

## 🚀 Step 7: Deployment

### 7.1 Update Docker Container
1. Rebuild the container with new ad configuration:
```bash
./deploy.sh stop
./deploy.sh build
./deploy.sh start
```

2. Verify ads are loading:
```bash
# Check if container is running
./deploy.sh status

# View logs for any ad loading errors
./deploy.sh logs
```

### 7.2 Testing
1. Open http://localhost:3099
2. Check browser console for any ad loading errors
3. Verify ads display correctly on desktop and mobile
4. Test interstitial ads by completing 3 levels

## 📈 Step 8: Monitoring & Optimization

### 8.1 AdSense Dashboard
Monitor daily:
- Impressions and clicks
- Revenue and RPM
- Ad performance by unit

### 8.2 Analytics Dashboard
Track:
- User engagement metrics
- Session duration
- Bounce rate changes
- Level completion rates

### 8.3 Optimization Tips
- Adjust interstitial frequency based on user retention
- Test different ad sizes and placements
- Monitor seasonal performance variations
- Keep content fresh to maintain traffic

## 🎯 Expected Revenue

Revenue depends on:
- **Traffic volume**: More players = more ad impressions
- **Geographic location**: Different regions have different CPM rates
- **User engagement**: Longer sessions = more ad views
- **Seasonal factors**: Holiday periods often have higher CPM

Typical ranges:
- Gaming sites: $0.50 - $3.00 RPM
- Mobile games: $1.00 - $5.00 RPM
- High-engagement casual games: $2.00 - $8.00 RPM

## 🆘 Troubleshooting

### Common Issues:
1. **Ads not showing**: Check publisher ID and ad slot IDs
2. **Console errors**: Verify AdSense script is loading
3. **Mobile layout issues**: Check responsive CSS rules
4. **Low revenue**: Review ad placement and user engagement

### Debug Steps:
1. Check browser console for JavaScript errors
2. Verify AdSense account is active and approved
3. Test with different browsers and devices
4. Check for ad blockers during testing

## 📞 Support Resources

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)
- [Web Fundamentals - Ad Best Practices](https://developers.google.com/web/fundamentals/monetization/ads)

---

🎮 **Ready to start earning from your Sweet Crush game!** Follow this guide step-by-step, and you'll have a monetized game that provides value to players while generating revenue for you. 