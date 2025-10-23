# Google Analytics 4 Integration Setup

This document explains how to set up and configure Google Analytics 4 (GA4) integration with your analytics dashboard.

## 🎯 Current Status

✅ **Google Analytics 4 tracking code** is already installed in `index.html`  
✅ **Analytics service** is created and ready to use  
✅ **Analytics dashboard** is updated to use real GA4 data  
✅ **Configuration system** is in place  
✅ **Mock data fallback** is working for development  

## 📊 What's Working Now

### Development Mode (Current)
- Uses **mock data** for all analytics
- No API calls to Google Analytics
- Perfect for development and testing
- Console logging enabled for debugging

### Production Mode (Ready to Configure)
- Will use **real Google Analytics data**
- Requires proper API setup and authentication
- Full analytics dashboard functionality

## 🔧 Setup Instructions

### Step 1: Google Analytics 4 Setup

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Create a GA4 Property** (if not already done)
3. **Get your Measurement ID**: `G-YM2E6FJ2GJ` (already configured)
4. **Enable Google Analytics Reporting API**

### Step 2: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google Analytics Reporting API**
4. **Create credentials** (Service Account)
5. **Download the JSON key file**

### Step 3: Backend API Setup

Create API endpoints in your backend to proxy Google Analytics requests:

```javascript
// Example: /api/analytics/historical
app.post('/api/analytics/historical', async (req, res) => {
  const { dateRange, metrics, dimensions } = req.body;
  
  // Use Google Analytics Reporting API
  const response = await analytics.reports.batchGet({
    requestBody: {
      reportRequests: [{
        viewId: 'YOUR_VIEW_ID',
        dateRanges: [dateRange],
        metrics: metrics.map(m => ({ expression: m })),
        dimensions: dimensions.map(d => ({ name: d }))
      }]
    }
  });
  
  res.json(response.data);
});
```

### Step 4: Environment Variables

Create a `.env` file in your project root:

```env
# Google Analytics 4 Configuration
VITE_GA4_MEASUREMENT_ID=G-YM2E6FJ2GJ
VITE_GA4_API_KEY=your-google-analytics-api-key
VITE_GA4_PROPERTY_ID=your-ga4-property-id

# Analytics API Configuration
VITE_ANALYTICS_API_URL=https://analyticsdata.googleapis.com/v1beta
VITE_ANALYTICS_REFRESH_TOKEN=your-refresh-token

# Development Mode (set to false for production)
VITE_USE_MOCK_ANALYTICS=true
```

### Step 5: Production Deployment

1. **Set environment variables** in your hosting platform
2. **Set `VITE_USE_MOCK_ANALYTICS=false`** for production
3. **Deploy your backend API** with Google Analytics integration
4. **Test the analytics dashboard** with real data

## 📈 Analytics Features

### Real-Time Data
- **Total Visitors**: Current active users
- **Page Views**: Real-time page view count
- **Traffic Sources**: Live traffic source breakdown
- **Device Types**: Current device usage

### Historical Data
- **7-day, 30-day, 90-day** periods
- **Page performance metrics**
- **User behavior analysis**
- **Conversion tracking**

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **Page load speeds**
- **Performance issues detection**
- **SEO recommendations**

### Lead Generation
- **Contact form submissions**
- **Conversion rates**
- **Lead quality assessment**
- **Conversion tracking**

## 🛠️ Customization

### Adding Custom Events

```javascript
// Track custom events
analyticsService.trackEvent('contact_form_submit', {
  form_type: 'contact',
  page: window.location.pathname
});

// Track conversions
analyticsService.trackConversion('contact_form_conversion', 100, 'USD');
```

### Adding New Metrics

1. **Update the interface** in `analyticsService.ts`
2. **Add data transformation** in `transformGA4Data()`
3. **Update the dashboard** component to display new metrics

## 🔍 Troubleshooting

### Common Issues

1. **Mock data showing in production**
   - Check `VITE_USE_MOCK_ANALYTICS` environment variable
   - Verify API credentials are set

2. **API errors**
   - Check Google Analytics API quotas
   - Verify service account permissions
   - Check network connectivity

3. **No data showing**
   - Verify GA4 measurement ID is correct
   - Check if tracking code is loading
   - Verify date ranges are valid

### Debug Mode

Enable debug logging by setting:
```env
VITE_USE_MOCK_ANALYTICS=true
```

This will show console logs with data flow information.

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Google Analytics Reporting API](https://developers.google.com/analytics/devguides/reporting/core/v4)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

## 🚀 Next Steps

1. **Set up Google Cloud Console** project
2. **Create backend API** endpoints
3. **Configure environment variables**
4. **Test with real data**
5. **Deploy to production**

The analytics dashboard is now ready to use real Google Analytics data once the backend API is set up!
