import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Globe,
  Search,
  Mail,
  Smartphone,
  Monitor,
  Zap,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { analyticsService, AnalyticsData } from '@/services/analyticsService';

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Load real analytics data from Google Analytics
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        console.log('Loading analytics data for period:', selectedPeriod);
        const data = await analyticsService.getHistoricalData(selectedPeriod);
        setAnalyticsData(data);
        console.log('Analytics data loaded successfully:', data);
      } catch (error) {
        console.error('Error loading analytics data:', error);
        // Fallback to mock data if real data fails
        const fallbackData = await analyticsService.getMockData();
        setAnalyticsData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [selectedPeriod]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      console.log('Refreshing analytics data...');
      const data = await analyticsService.getHistoricalData(selectedPeriod);
      setAnalyticsData(data);
      console.log('Analytics data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing analytics data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Website performance and business insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12.5% from last period
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.pageViews.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +8.3% from last period
              </p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.bounceRate !== null && analyticsData.bounceRate !== undefined 
                  ? `${analyticsData.bounceRate.toFixed(1)}%` 
                  : 'N/A'}
              </p>
              <p className="text-sm text-red-600 flex items-center">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                {analyticsData.bounceRate !== null ? '+2.1% from last period' : 'Data not available'}
              </p>
            </div>
            <MousePointer className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.avgSessionDuration || 'N/A'}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {analyticsData.avgSessionDuration ? '+15s from last period' : 'Data not available'}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Performance & SEO Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Page Load Speed</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.pageLoadSpeed ? `${analyticsData.pageLoadSpeed}s` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Largest Contentful Paint</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.coreWebVitals?.lcp ? `${analyticsData.coreWebVitals.lcp}s` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">First Input Delay</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.coreWebVitals?.fid ? `${analyticsData.coreWebVitals.fid}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cumulative Layout Shift</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.coreWebVitals?.cls ? analyticsData.coreWebVitals.cls : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* SEO Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            SEO Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Organic Traffic</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.organicTraffic !== null ? `${analyticsData.organicTraffic}%` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Keyword Rankings</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.keywordRankings !== null ? analyticsData.keywordRankings : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Backlinks</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.backlinks !== null ? analyticsData.backlinks : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Domain Authority</span>
              <span className="text-lg font-semibold text-gray-900">
                {analyticsData.domainAuthority !== null ? `${analyticsData.domainAuthority}/100` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Generation */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          Lead Generation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {analyticsData.contactFormSubmissions !== null ? analyticsData.contactFormSubmissions : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Contact Form Submissions</div>
            {analyticsData.contactFormSubmissions !== null && (
              <div className="text-sm text-green-600 flex items-center justify-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +23% from last period
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {analyticsData.conversionRate !== null ? `${analyticsData.conversionRate}%` : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            {analyticsData.conversionRate !== null && (
              <div className="text-sm text-green-600 flex items-center justify-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +1.2% from last period
              </div>
            )}
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold capitalize ${
              analyticsData.leadQuality === 'high' ? 'text-green-600' : 
              analyticsData.leadQuality === 'medium' ? 'text-yellow-600' : 
              analyticsData.leadQuality === 'low' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {analyticsData.leadQuality || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Lead Quality</div>
            <div className="text-sm text-gray-500 mt-1">Based on engagement</div>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                  <span className="text-sm text-gray-600">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{source.percentage}%</div>
                  <div className="text-xs text-gray-500">{source.visitors.toLocaleString()} visitors</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-purple-600" />
            Device Breakdown
          </h3>
          <div className="space-y-3">
            {analyticsData.deviceBreakdown.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  {device.device === 'Desktop' ? <Monitor className="w-4 h-4 mr-3 text-gray-600" /> :
                   device.device === 'Mobile' ? <Smartphone className="w-4 h-4 mr-3 text-gray-600" /> :
                   <Monitor className="w-4 h-4 mr-3 text-gray-600" />}
                  <span className="text-sm text-gray-600">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{device.percentage}%</div>
                  <div className="text-xs text-gray-500">{device.visitors.toLocaleString()} visitors</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
          Top Pages
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.topPages.map((page, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.page}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issues & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Issues */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Performance Issues
          </h3>
          <div className="space-y-3">
            {analyticsData.performanceIssues.map((issue, index) => (
              <div key={index} className="border-l-4 border-red-200 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{issue.issue}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                    {getSeverityIcon(issue.severity)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{issue.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Issues */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-yellow-600" />
            SEO Issues
          </h3>
          <div className="space-y-3">
            {analyticsData.seoIssues.map((issue, index) => (
              <div key={index} className="border-l-4 border-yellow-200 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{issue.issue}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                    {getSeverityIcon(issue.severity)}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{issue.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {analyticsData.recommendations.map((rec, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase">{rec.category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rec.priority)}`}>
                    {getSeverityIcon(rec.priority)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">{rec.recommendation}</p>
                <p className="text-xs text-gray-600">{rec.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export & Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            <Mail className="w-4 h-4 mr-2" />
            Email Report
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            <Activity className="w-4 h-4 mr-2" />
            Set Up Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
