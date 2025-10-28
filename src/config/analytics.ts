// Analytics Configuration
// This file contains configuration for Google Analytics 4 and other analytics services

export const analyticsConfig = {
  // Google Analytics 4 Configuration
  ga4: {
    measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-YM2E6FJ2GJ',
    apiKey: import.meta.env.VITE_GA4_API_KEY || '',
    propertyId: import.meta.env.VITE_GA4_PROPERTY_ID || '',
    apiUrl: import.meta.env.VITE_ANALYTICS_API_URL || 'https://analyticsdata.googleapis.com/v1beta',
  },

  // Development settings
  development: {
    useMockData: import.meta.env.VITE_USE_MOCK_ANALYTICS === 'true',
    enableConsoleLogging: import.meta.env.DEV,
  },

  // SEO Tools Configuration (Optional)
  seo: {
    apiKey: import.meta.env.VITE_SEO_API_KEY || '',
    apiUrl: import.meta.env.VITE_SEO_API_URL || '',
  },

  // Performance monitoring
  performance: {
    enableCoreWebVitals: true,
    enablePageSpeedInsights: true,
    enableRealUserMonitoring: true,
  },

  // Event tracking configuration
  events: {
    // Custom events to track
    contactFormSubmission: 'contact_form_submit',
    projectView: 'project_view',
    blogPostView: 'blog_post_view',
    downloadFile: 'file_download',
    videoPlay: 'video_play',
    buttonClick: 'button_click',
  },

  // Conversion tracking
  conversions: {
    contactForm: 'contact_form_conversion',
    projectInquiry: 'project_inquiry_conversion',
    newsletterSignup: 'newsletter_signup_conversion',
  },
};

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  // Only use mock data if explicitly set in environment
  // The backend uses service account JSON, so we don't need frontend API key
  return import.meta.env.VITE_USE_MOCK_ANALYTICS === 'true';
};

// Helper function to get GA4 measurement ID
export const getGA4MeasurementId = (): string => {
  return analyticsConfig.ga4.measurementId;
};

// Helper function to check if analytics is properly configured
export const isAnalyticsConfigured = (): boolean => {
  return !!(
    analyticsConfig.ga4.measurementId &&
    analyticsConfig.ga4.apiKey &&
    analyticsConfig.ga4.propertyId
  );
};

// Default export
export default analyticsConfig;
