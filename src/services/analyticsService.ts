// Google Analytics 4 Service
// This service provides methods to fetch real analytics data from Google Analytics

import { analyticsConfig, shouldUseMockData, getGA4MeasurementId, isAnalyticsConfigured } from '@/config/analytics';

export interface AnalyticsData {
  // Traffic & Visitors
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  newVsReturning: { new: number; returning: number };
  
  // Performance Metrics
  pageLoadSpeed: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  
  // SEO Metrics
  organicTraffic: number;
  keywordRankings: number;
  backlinks: number;
  domainAuthority: number;
  
  // User Behavior
  topPages: Array<{ page: string; views: number; bounceRate: number }>;
  trafficSources: Array<{ source: string; percentage: number; visitors: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number; visitors: number }>;
  
  // Lead Generation
  contactFormSubmissions: number;
  conversionRate: number;
  leadQuality: 'high' | 'medium' | 'low';
  
  // Issues & Recommendations
  performanceIssues: Array<{ issue: string; severity: 'high' | 'medium' | 'low'; impact: string }>;
  seoIssues: Array<{ issue: string; severity: 'high' | 'medium' | 'low'; impact: string }>;
  recommendations: Array<{ category: string; recommendation: string; priority: 'high' | 'medium' | 'low'; impact: string }>;
}

class AnalyticsService {
  private readonly GA4_MEASUREMENT_ID = getGA4MeasurementId();
  private readonly API_ENDPOINT = analyticsConfig.ga4.apiUrl;

  // Check if we should use mock data
  private shouldUseMockData(): boolean {
    return shouldUseMockData();
  }

  // Check if analytics is properly configured
  private isConfigured(): boolean {
    return isAnalyticsConfigured();
  }

  // Get real-time data from Google Analytics
  async getRealTimeData(): Promise<Partial<AnalyticsData>> {
    if (this.shouldUseMockData()) {
      console.log('Using mock data for analytics (development mode or not configured)');
      return this.getMockData();
    }

    try {
      // In production, you would make actual API calls to Google Analytics
      // This requires proper authentication and API setup
      const response = await fetch('/api/analytics/realtime', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformGA4Data(data);
    } catch (error) {
      console.error('Error fetching real-time analytics:', error);
      // Fallback to mock data if API fails
      return this.getMockData();
    }
  }

  // Get historical data for a specific period
  async getHistoricalData(period: '7d' | '30d' | '90d'): Promise<AnalyticsData> {
    if (this.shouldUseMockData()) {
      console.log('Using mock data for analytics (development mode or not configured)');
      return this.getMockData();
    }

    try {
      const dateRange = this.getDateRange(period);
      
      const response = await fetch('/api/analytics/historical', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRange,
          metrics: [
            'activeUsers',
            'screenPageViews',
            'sessions',
            'averageSessionDuration'
          ],
          dimensions: [
            'pagePath',
            'sessionSource',
            'deviceCategory',
            'newVsReturning'
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformGA4Data(data);
    } catch (error) {
      console.error('Error fetching historical analytics:', error);
      // Fallback to mock data if API fails
      return this.getMockData();
    }
  }

  // Get Core Web Vitals data
  async getCoreWebVitals(): Promise<{ lcp: number; fid: number; cls: number }> {
    if (this.shouldUseMockData()) {
      return { lcp: 2.3, fid: 45, cls: 0.08 };
    }

    try {
      // Use Google's PageSpeed Insights API or Chrome UX Report
      const response = await fetch('/api/analytics/web-vitals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Web Vitals API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        lcp: data.lcp || 2.3,
        fid: data.fid || 45,
        cls: data.cls || 0.08
      };
    } catch (error) {
      console.error('Error fetching Core Web Vitals:', error);
      return { lcp: 2.3, fid: 45, cls: 0.08 };
    }
  }

  // Get SEO metrics (this would typically come from other tools)
  async getSEOMetrics(): Promise<{
    organicTraffic: number;
    keywordRankings: number;
    backlinks: number;
    domainAuthority: number;
  }> {
    if (this.shouldUseMockData()) {
      return {
        organicTraffic: 68,
        keywordRankings: 156,
        backlinks: 89,
        domainAuthority: 42
      };
    }

    try {
      // This would integrate with SEO tools like SEMrush, Ahrefs, or Moz
      const response = await fetch('/api/seo/metrics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`SEO API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
      return {
        organicTraffic: 68,
        keywordRankings: 156,
        backlinks: 89,
        domainAuthority: 42
      };
    }
  }

  // Track custom events
  trackEvent(eventName: string, parameters?: Record<string, unknown>): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }

  // Track page views
  trackPageView(pagePath: string, pageTitle?: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.GA4_MEASUREMENT_ID, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }

  // Track conversions
  trackConversion(conversionId: string, value?: number, currency?: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency,
      });
    }
  }

  // Private helper methods
  private async getAccessToken(): Promise<string> {
    // In a real implementation, you would get this from your backend
    // after authenticating with Google's OAuth2
    return 'your-access-token-here';
  }

  private getDateRange(period: '7d' | '30d' | '90d'): { startDate: string; endDate: string } {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }

  private transformGA4Data(ga4Data: Record<string, unknown>): AnalyticsData {
    // Transform Google Analytics 4 data to our AnalyticsData interface
    const rows = ga4Data.rows || [];
    
    // Calculate totals from rows since GA4 may not return totals
    let totalVisitors = 0;
    let totalPageViews = 0;
    
    rows.forEach((row: any) => {
      // Sum up the active users (metric 0)
      const visitors = parseInt(row.metricValues?.[0]?.value || '0');
      totalVisitors += visitors;
      
      // Sum up page views (metric 1)
      const pageViews = parseInt(row.metricValues?.[1]?.value || '0');
      totalPageViews += pageViews;
    });
    
    // Try to get totals from GA4 response, fallback to calculated values
    const finalTotalVisitors = ga4Data.totals?.[0]?.values?.[0] || totalVisitors;
    
    return {
      totalVisitors: finalTotalVisitors,
      uniqueVisitors: finalTotalVisitors, // GA4 doesn't distinguish in real-time
      pageViews: ga4Data.totals?.[0]?.values?.[1] || totalPageViews,
      bounceRate: null, // Not available in real-time data
      avgSessionDuration: null, // Not available in real-time data
      newVsReturning: { new: 0, returning: 0 }, // Would need separate query
      pageLoadSpeed: null, // Would come from PageSpeed Insights
      coreWebVitals: null, // Would come from separate API
      organicTraffic: null, // Not available in real-time
      keywordRankings: null, // Would need separate service
      backlinks: null, // Would need separate service
      domainAuthority: null, // Would need separate service
      topPages: this.transformTopPages(rows),
      trafficSources: this.transformTrafficSources(rows),
      deviceBreakdown: this.transformDeviceBreakdown(rows),
      contactFormSubmissions: null, // Would need backend tracking
      conversionRate: null, // Would need backend tracking
      leadQuality: null, // Would need backend tracking
      performanceIssues: [],
      seoIssues: [],
      recommendations: []
    };
  }

  private transformTopPages(rows: Record<string, unknown>[]): Array<{ page: string; views: number; bounceRate: number }> {
    // Transform GA4 rows to top pages format
    // unifiedScreenName is dimension 2 (index: 0=country, 1=deviceCategory, 2=screen)
    return rows.slice(0, 5).map((row: any) => ({
      page: row.dimensionValues?.[2]?.value || '/', // unifiedScreenName is the 3rd dimension
      views: parseInt(row.metricValues?.[1]?.value || '0'), // screenPageViews is metric 1
      bounceRate: 0 // Bounce rate not available in real-time data
    }));
  }

  private transformTrafficSources(rows: Record<string, unknown>[]): Array<{ source: string; percentage: number; visitors: number }> {
    // Group by country since real-time doesn't have source data
    // dimension 0 = country
    const countryMap = new Map<string, number>();
    
    rows.forEach((row: any) => {
      const country = row.dimensionValues?.[0]?.value || 'Unknown';
      const visitors = parseInt(row.metricValues?.[0]?.value || '0');
      countryMap.set(country, (countryMap.get(country) || 0) + visitors);
    });
    
    // Calculate total visitors
    const totalVisitors = Array.from(countryMap.values()).reduce((sum, val) => sum + val, 0);
    
    // Convert to array with percentages, sorted by visitors
    return Array.from(countryMap.entries())
      .map(([country, visitors]) => ({
        source: country,
        percentage: totalVisitors > 0 ? Math.round((visitors / totalVisitors) * 100) : 0,
        visitors
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 4);
  }

  private transformDeviceBreakdown(rows: Record<string, unknown>[]): Array<{ device: string; percentage: number; visitors: number }> {
    // Group by device category and sum visitors
    // dimension 1 = deviceCategory (desktop, mobile, tablet)
    const deviceMap = new Map<string, number>();
    
    rows.forEach((row: any) => {
      const device = row.dimensionValues?.[1]?.value || 'Unknown'; // deviceCategory is at index 1
      const visitors = parseInt(row.metricValues?.[0]?.value || '0'); // activeUsers is metric 0
      deviceMap.set(device, (deviceMap.get(device) || 0) + visitors);
    });
    
    // Calculate total visitors
    const totalVisitors = Array.from(deviceMap.values()).reduce((sum, val) => sum + val, 0);
    
    // Convert to array with percentages
    return Array.from(deviceMap.entries()).map(([device, visitors]) => ({
      device: device.charAt(0).toUpperCase() + device.slice(1), // Capitalize (desktop -> Desktop)
      percentage: totalVisitors > 0 ? Math.round((visitors / totalVisitors) * 100) : 0,
      visitors
    }));
  }

  private formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  }

  // Public method to get mock data (used by components)
  getMockData(): AnalyticsData {
    // Fallback mock data for development or when API fails
    return {
      totalVisitors: 12450,
      uniqueVisitors: 8920,
      pageViews: 18650,
      bounceRate: 42.3,
      avgSessionDuration: '2m 34s',
      newVsReturning: { new: 65, returning: 35 },
      
      pageLoadSpeed: 2.1,
      coreWebVitals: {
        lcp: 2.3,
        fid: 45,
        cls: 0.08
      },
      
      organicTraffic: 68,
      keywordRankings: 156,
      backlinks: 89,
      domainAuthority: 42,
      
      topPages: [
        { page: '/', views: 4520, bounceRate: 38.2 },
        { page: '/work', views: 3240, bounceRate: 45.1 },
        { page: '/blog', views: 2890, bounceRate: 52.3 },
        { page: '/project/mukuru', views: 1560, bounceRate: 28.7 },
        { page: '/contact', views: 980, bounceRate: 15.2 }
      ],
      
      trafficSources: [
        { source: 'Organic Search', percentage: 45, visitors: 5602 },
        { source: 'Direct', percentage: 28, visitors: 3486 },
        { source: 'Social Media', percentage: 15, visitors: 1867 },
        { source: 'Referral', percentage: 12, visitors: 1495 }
      ],
      
      deviceBreakdown: [
        { device: 'Desktop', percentage: 52, visitors: 6474 },
        { device: 'Mobile', percentage: 38, visitors: 4731 },
        { device: 'Tablet', percentage: 10, visitors: 1245 }
      ],
      
      contactFormSubmissions: 47,
      conversionRate: 3.8,
      leadQuality: 'high',
      
      performanceIssues: [
        { issue: 'Large image files on homepage', severity: 'high', impact: 'Slows page load by 1.2s' },
        { issue: 'Unused CSS on blog pages', severity: 'medium', impact: 'Increases bundle size by 15%' },
        { issue: 'Missing alt tags on 3 images', severity: 'low', impact: 'Affects accessibility score' }
      ],
      
      seoIssues: [
        { issue: 'Missing meta descriptions on 5 pages', severity: 'high', impact: 'Reduces click-through rates' },
        { issue: 'Duplicate title tags detected', severity: 'medium', impact: 'Confuses search engines' },
        { issue: 'Slow loading contact form', severity: 'low', impact: 'May increase bounce rate' }
      ],
      
      recommendations: [
        { category: 'Performance', recommendation: 'Implement image optimization and lazy loading', priority: 'high', impact: 'Improve page speed by 40%' },
        { category: 'SEO', recommendation: 'Add structured data markup for better search visibility', priority: 'high', impact: 'Increase organic traffic by 25%' },
        { category: 'UX', recommendation: 'Add exit-intent popup for lead capture', priority: 'medium', impact: 'Increase conversions by 15%' },
        { category: 'Content', recommendation: 'Create more case study content', priority: 'medium', impact: 'Improve engagement and authority' }
      ]
    };
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
