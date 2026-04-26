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
      // Backend uses service account authentication, so no Authorization header needed
      const response = await fetch('/api/analytics/realtime', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformGA4Data(data, false); // Real-time data
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateRange }),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      const data = await response.json();
      const transformed = this.transformGA4Data(data, true); // Historical data
      
      // Fetch PageSpeed Insights data for performance metrics
      try {
        const pagespeedData = await this.getCoreWebVitals();
        transformed.coreWebVitals = {
          lcp: pagespeedData.lcp,
          fid: pagespeedData.fid,
          cls: pagespeedData.cls
        };
        transformed.pageLoadSpeed = pagespeedData.pageLoadSpeed;
      } catch (error) {
        console.error('Error fetching PageSpeed data:', error);
      }
      
      return transformed;
    } catch (error) {
      console.error('Error fetching historical analytics:', error);
      // Fallback to mock data if API fails
      return this.getMockData();
    }
  }

  // Get Core Web Vitals data
  async getCoreWebVitals(): Promise<{ lcp: number; fid: number; cls: number; pageLoadSpeed: number }> {
    if (this.shouldUseMockData()) {
      return { lcp: 2.3, fid: 45, cls: 0.08, pageLoadSpeed: 2.1 };
    }

    try {
      // Use Google's PageSpeed Insights API or Chrome UX Report
      const response = await fetch('/api/pagespeed?url=https://sanddollardesign.co.za&strategy=mobile', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`PageSpeed API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        lcp: parseFloat(data.lcp) || 2.3,
        fid: parseInt(data.fid) || 45,
        cls: parseFloat(data.cls) || 0.08,
        pageLoadSpeed: parseFloat(data.fcp) || 2.1 // First Contentful Paint as page load speed
      };
    } catch (error) {
      console.error('Error fetching Core Web Vitals:', error);
      return { lcp: 2.3, fid: 45, cls: 0.08, pageLoadSpeed: 2.1 };
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

  private transformGA4Data(ga4Data: Record<string, unknown>, isHistorical = false): AnalyticsData {
    // Transform Google Analytics 4 data to our AnalyticsData interface
    const rows = ga4Data.rows || [];
    
    // Calculate totals from rows since GA4 may not return totals
    let totalVisitors = 0;
    let totalPageViews = 0;
    let totalSessions = 0;
    let totalDuration = 0;
    let totalBounceRate = 0;
    let sessionCount = 0;
    
    rows.forEach((row: any) => {
      // Sum up the active users (metric 0)
      const visitors = parseInt(row.metricValues?.[0]?.value || '0');
      totalVisitors += visitors;
      
      // Sum up page views (metric 1)
      const pageViews = parseInt(row.metricValues?.[1]?.value || '0');
      totalPageViews += pageViews;
      
      // For historical data, calculate average bounce rate and session duration
      if (isHistorical) {
        const sessions = parseInt(row.metricValues?.[2]?.value || '0'); // metric 2 = sessions
        const avgDuration = parseFloat(row.metricValues?.[3]?.value || '0'); // metric 3 = averageSessionDuration
        const bounce = parseFloat(row.metricValues?.[4]?.value || '0'); // metric 4 = bounceRate
        
        totalSessions += sessions;
        totalDuration += avgDuration * sessions;
        totalBounceRate += bounce * sessions;
        sessionCount += sessions;
      }
    });
    
    // Try to get totals from GA4 response, fallback to calculated values
    const finalTotalVisitors = ga4Data.totals?.[0]?.values?.[0] || totalVisitors;
    
    // Calculate averages for historical data
    const avgSessionDuration = isHistorical && sessionCount > 0 
      ? this.formatDuration(totalDuration / sessionCount)
      : null;
    const bounceRate = isHistorical && sessionCount > 0
      ? totalBounceRate / sessionCount
      : null;
    
    return {
      totalVisitors: finalTotalVisitors,
      uniqueVisitors: finalTotalVisitors, // GA4 doesn't distinguish in real-time
      pageViews: ga4Data.totals?.[0]?.values?.[1] || totalPageViews,
      bounceRate: bounceRate,
      avgSessionDuration: avgSessionDuration,
      newVsReturning: { new: 0, returning: 0 }, // Would need separate query with newVsReturning dimension
      pageLoadSpeed: null, // Would come from PageSpeed Insights
      coreWebVitals: null, // Would come from separate API
      organicTraffic: null, // Not available in real-time
      keywordRankings: null, // Would need separate service
      backlinks: null, // Would need separate service
      domainAuthority: null, // Would need separate service
      topPages: this.transformTopPages(rows, isHistorical),
      trafficSources: this.transformTrafficSources(rows, isHistorical),
      deviceBreakdown: this.transformDeviceBreakdown(rows, isHistorical),
      contactFormSubmissions: null, // Would need backend tracking
      conversionRate: null, // Would need backend tracking
      leadQuality: null, // Would need backend tracking
      performanceIssues: [],
      seoIssues: [],
      recommendations: []
    };
  }

  private transformTopPages(rows: Record<string, unknown>[], isHistorical = false): Array<{ page: string; views: number; bounceRate: number }> {
    // Transform GA4 rows to top pages format
    // For historical data: aggregate by pagePath to show unique pages
    const pageMap = new Map<string, { views: number; bounceRate: number }>();
    
    rows.forEach((row: any) => {
      let pagePath: string;
      if (isHistorical) {
        // Historical data: dimension 0 = pagePath
        pagePath = row.dimensionValues?.[0]?.value || '/';
      } else {
        // Real-time data: dimension 2 = unifiedScreenName
        pagePath = row.dimensionValues?.[2]?.value || '/';
      }
      
      const views = parseInt(row.metricValues?.[1]?.value || '0'); // screenPageViews
      let bounceRate = 0;
      
      if (isHistorical && row.metricValues?.[4]?.value) {
        bounceRate = parseFloat(row.metricValues[4].value);
      }
      
      const existing = pageMap.get(pagePath);
      if (existing) {
        pageMap.set(pagePath, {
          views: existing.views + views,
          bounceRate: existing.bounceRate + bounceRate / 2 // Average bounce rate
        });
      } else {
        pageMap.set(pagePath, { views, bounceRate });
      }
    });
    
    // Convert to array and sort by views
    return Array.from(pageMap.entries())
      .map(([page, data]) => ({
        page,
        views: data.views,
        bounceRate: isHistorical ? parseFloat((data.bounceRate * 100).toFixed(2)) : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }

  private transformTrafficSources(rows: Record<string, unknown>[], isHistorical = false): Array<{ source: string; percentage: number; visitors: number }> {
    const sourceMap = new Map<string, number>();
    
    rows.forEach((row: any) => {
      let source: string;
      if (isHistorical) {
        // Historical data: dimension 1 = sessionSource
        source = row.dimensionValues?.[1]?.value || 'Unknown';
      } else {
        // Real-time data: dimension 0 = country
        source = row.dimensionValues?.[0]?.value || 'Unknown';
      }
      const visitors = parseInt(row.metricValues?.[0]?.value || '0');
      sourceMap.set(source, (sourceMap.get(source) || 0) + visitors);
    });
    
    // Calculate total visitors
    const totalVisitors = Array.from(sourceMap.values()).reduce((sum, val) => sum + val, 0);
    
    // Convert to array with percentages, sorted by visitors
    return Array.from(sourceMap.entries())
      .map(([source, visitors]) => ({
        source: source,
        percentage: totalVisitors > 0 ? Math.round((visitors / totalVisitors) * 100) : 0,
        visitors
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 4);
  }

  private transformDeviceBreakdown(rows: Record<string, unknown>[], isHistorical = false): Array<{ device: string; percentage: number; visitors: number }> {
    // Group by device category and sum visitors
    const deviceMap = new Map<string, number>();
    
    rows.forEach((row: any) => {
      let device: string;
      if (isHistorical) {
        // Historical data: dimension 2 = deviceCategory (pagePath=0, sessionSource=1, deviceCategory=2)
        device = row.dimensionValues?.[2]?.value || 'Unknown';
      } else {
        // Real-time data: dimension 1 = deviceCategory
        device = row.dimensionValues?.[1]?.value || 'Unknown';
      }
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
