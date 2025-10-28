import React, { useState } from 'react';
import { 
  Globe, 
  Download, 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Eye,
  Smartphone,
  Shield,
  Search,
  Users,
  ShoppingCart,
  Database,
  FileImage,
  Lightbulb,
  X,
  Presentation,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Share2,
} from 'lucide-react';
import { websiteAuditService, AuditResult } from '@/services/websiteAuditService';
import { documentGenerationService } from '@/services/documentGenerationService';
import SandDollarLoader from '@/components/SandDollarLoader';
import SalesPitchDashboard from './SalesPitchDashboard';

interface WebsiteAuditDashboardProps {
  onClose: () => void;
}

const WebsiteAuditDashboard: React.FC<WebsiteAuditDashboardProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingDocument, setIsGeneratingDocument] = useState(false);
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [showSalesPitch, setShowSalesPitch] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<{type: 'fullPage' | 'viewport', src: string, alt: string} | null>(null);

  const handleAudit = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setIsAuditing(true);
    setError(null);
    setAuditResult(null);

    try {
      const result = await websiteAuditService.auditWebsite(url);
      setAuditResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to audit website');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleGenerateWordDocument = async () => {
    if (!auditResult) {
      console.error('No audit result available');
      return;
    }

    console.log('Starting Word document generation...');
    setIsGeneratingDocument(true);
    try {
      await documentGenerationService.generateWordDocument(auditResult, {
        includeCharts: true,
        includeTechnicalDetails: true,
        includeRecommendations: true,
        includePrompts: true
      });
      console.log('Word document generated successfully');
    } catch (err) {
      console.error('Failed to generate Word document:', err);
      alert(`Failed to generate Word document: ${err.message}`);
    } finally {
      setIsGeneratingDocument(false);
    }
  };

  const handleGenerateExcelDocument = async () => {
    if (!auditResult) return;

    setIsGeneratingDocument(true);
    try {
      await documentGenerationService.generateExcelDocument(auditResult, {
        includeTechnicalDetails: true,
        includeRecommendations: true
      });
    } catch (err) {
      console.error('Failed to generate Excel document:', err);
    } finally {
      setIsGeneratingDocument(false);
    }
  };

  const handleGeneratePrompts = async () => {
    if (!auditResult) return;

    setIsGeneratingPrompts(true);
    try {
      const generatedPrompts = await websiteAuditService.generateImprovementPrompts(auditResult);
      setPrompts(generatedPrompts);
    } catch (err) {
      console.error('Failed to generate prompts:', err);
    } finally {
      setIsGeneratingPrompts(false);
    }
  };

  const handleDownloadPrompts = async () => {
    if (!auditResult || prompts.length === 0) return;

    try {
      await documentGenerationService.generatePromptsDocument(auditResult, prompts);
    } catch (err) {
      console.error('Failed to download prompts:', err);
    }
  };


  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#f97316]" />
              <h2 className="text-xl font-bold text-gray-900">Website Audit Dashboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(95vh-80px)] p-6">
            {/* URL Input Section */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Website URL to Audit</h3>
                <div className="flex gap-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                    disabled={isAuditing}
                  />
                  <button
                    onClick={handleAudit}
                    disabled={isAuditing || !url.trim()}
                    className="px-6 py-3 coral-gradient text-white rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAuditing ? (
                      <>
                        <SandDollarLoader size="sm" />
                        Auditing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4" />
                        Start Audit
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Audit Results */}
            {auditResult && (
              <div className="space-y-8">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-[#f97316] to-[#ea580c] rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
                      <p className="text-lg opacity-90">Comprehensive website analysis</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-5xl font-black ${getScoreColor(auditResult.overallScore * 20)}`}>
                        {auditResult.overallScore.toFixed(1)}
                      </div>
                      <div className="text-lg opacity-90">/ 5.0</div>
                    </div>
                  </div>
                </div>

                {/* Category Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(auditResult.categories).map(([category, data]) => (
                    <div key={category} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(category)}
                          <h4 className="font-semibold text-gray-900 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBgColor(data.score * 20)} ${getScoreColor(data.score * 20)}`}>
                          {data.score.toFixed(1)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 mb-2">
                          {getCategoryDescription(category)}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Grade:</span>
                          <span className={`font-semibold ${getScoreColor(data.score * 20)}`}>{data.grade}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Issues:</span>
                          <span className="font-semibold text-gray-900">{data.issues.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Critical Issues */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Critical Issues
                  </h3>
                  <div className="space-y-4">
                    {Object.values(auditResult.categories)
                      .flatMap(category => category.issues)
                      .filter(issue => issue.severity === 'critical' || issue.priority >= 8)
                      .sort((a, b) => b.priority - a.priority)
                      .slice(0, 5)
                      .map(issue => (
                        <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                              {issue.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">Impact:</span> {issue.impact}
                          </p>
                          <p className="text-gray-700 text-sm">
                            <span className="font-medium">Solution:</span> {issue.solution}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Top Recommendations
                  </h3>
                  <div className="space-y-4">
                    {auditResult.recommendations.slice(0, 3).map(rec => (
                      <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                          <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.impact === 'High' ? 'bg-red-100 text-red-600' :
                              rec.impact === 'Med' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {rec.impact} Impact
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.effort === 'High' ? 'bg-orange-100 text-orange-600' :
                              rec.effort === 'Med' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {rec.effort} Effort
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{rec.problem}</p>
                        <p className="text-gray-700 text-sm mb-2"><strong>Recommendation:</strong> {rec.recommendation}</p>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Effort:</span> {rec.effort} | 
                          <span className="font-medium ml-2">Impact:</span> {rec.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                {auditResult.contactInfo && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-500" />
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Email Addresses */}
                      {auditResult.contactInfo.emails.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            Email Addresses
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.emails.map((email, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a 
                                  href={`mailto:${email}`}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  {email}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Phone Numbers */}
                      {auditResult.contactInfo.phones.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-500" />
                            Phone Numbers
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.phones.map((phone, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a 
                                  href={`tel:${phone}`}
                                  className="text-green-600 hover:text-green-800 text-sm"
                                >
                                  {phone}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Addresses */}
                      {auditResult.contactInfo.addresses.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" />
                            Addresses
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.addresses.map((address, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <span className="text-gray-700 text-sm">{address}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Media */}
                      {auditResult.contactInfo.socialMedia.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-purple-500" />
                            Social Media
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.socialMedia.map((social, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Share2 className="w-4 h-4 text-gray-400" />
                                <div className="flex flex-col">
                                  <span className="text-gray-700 text-sm font-medium">{social.platform}</span>
                                  <a 
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-800 text-xs"
                                  >
                                    {social.url}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Business Hours */}
                      {auditResult.contactInfo.businessHours.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-500" />
                            Business Hours
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.businessHours.map((hours, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700 text-sm">{hours}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Forms */}
                      {auditResult.contactInfo.contactForms.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-500" />
                            Contact Forms
                          </h4>
                          <div className="space-y-2">
                            {auditResult.contactInfo.contactForms.map((form, index) => (
                              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                                <div className="text-gray-700 text-sm">
                                  <div className="font-medium">Form {index + 1}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Method: {form.method.toUpperCase()} | 
                                    Fields: {form.inputs.length}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                {auditResult.screenshots && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <FileImage className="w-5 h-5 text-green-500" />
                      Website Screenshots
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Full Page Screenshot */}
                      {auditResult.screenshots.fullPage && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <FileImage className="w-4 h-4 text-green-500" />
                            Full Page Screenshot
                          </h4>
                          <div className="relative border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 group" 
                               onClick={() => setSelectedScreenshot({
                                 type: 'fullPage',
                                 src: auditResult.screenshots.fullPage,
                                 alt: 'Full page screenshot'
                               })}>
                            <img 
                              src={auditResult.screenshots.fullPage}
                              alt="Full page screenshot"
                              className="w-full h-auto max-h-96 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-2">
                                <Eye className="w-6 h-6 text-gray-700" />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Complete page layout and content • Click to enlarge</p>
                        </div>
                      )}

                      {/* Viewport Screenshot */}
                      {auditResult.screenshots.viewport && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            Viewport Screenshot
                          </h4>
                          <div className="relative border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 group" 
                               onClick={() => setSelectedScreenshot({
                                 type: 'viewport',
                                 src: auditResult.screenshots.viewport,
                                 alt: 'Viewport screenshot'
                               })}>
                            <img 
                              src={auditResult.screenshots.viewport}
                              alt="Viewport screenshot"
                              className="w-full h-auto max-h-96 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-2">
                                <Eye className="w-6 h-6 text-gray-700" />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Above-the-fold content (1920x1080 viewport) • Click to enlarge</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}


                {/* Document Generation */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#f97316]" />
                    Generate Reports & Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                      onClick={handleGenerateWordDocument}
                      disabled={isGeneratingDocument}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Word Report</div>
                        <div className="text-sm text-gray-500">Comprehensive audit report</div>
                      </div>
                    </button>

                    <button
                      onClick={handleGenerateExcelDocument}
                      disabled={isGeneratingDocument}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Excel Data</div>
                        <div className="text-sm text-gray-500">Detailed metrics & data</div>
                      </div>
                    </button>

                    <button
                      onClick={handleGeneratePrompts}
                      disabled={isGeneratingPrompts}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                    >
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">AI Prompts</div>
                        <div className="text-sm text-gray-500">Generate improvement prompts</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowSalesPitch(true)}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Presentation className="w-5 h-5 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Sales Pitch</div>
                        <div className="text-sm text-gray-500">Generate presentation & email</div>
                      </div>
                    </button>

                    {prompts.length > 0 && (
                      <button
                        onClick={handleDownloadPrompts}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Download className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium text-gray-900">Download Prompts</div>
                          <div className="text-sm text-gray-500">Word document with prompts</div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Generated Prompts Preview */}
                {prompts.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      AI-Powered Improvement Prompts
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                        {prompts.join('\n')}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sales Pitch Dashboard Modal */}
      {showSalesPitch && (
        <SalesPitchDashboard
          auditResult={auditResult}
          onClose={() => setShowSalesPitch(false)}
        />
      )}

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedScreenshot(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileImage className="w-6 h-6 text-[#f97316]" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedScreenshot.type === 'fullPage' ? 'Full Page Screenshot' : 'Viewport Screenshot'}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Screenshot Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-80px)] p-6">
                <div className="text-center">
                  <img 
                    src={selectedScreenshot.src}
                    alt={selectedScreenshot.alt}
                    className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                    style={{ maxHeight: 'calc(95vh - 200px)' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <p className="mt-4 text-sm text-gray-600">
                    {selectedScreenshot.type === 'fullPage' 
                      ? 'Complete page layout and content - Click outside to close'
                      : 'Above-the-fold content (1920x1080 viewport) - Click outside to close'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'strategyPositioning':
      return <TrendingUp className="w-5 h-5 text-blue-500" />;
    case 'navigationIA':
      return <Search className="w-5 h-5 text-purple-500" />;
    case 'searchDiscovery':
      return <Search className="w-5 h-5 text-pink-500" />;
    case 'plpPdp':
      return <ShoppingCart className="w-5 h-5 text-green-500" />;
    case 'checkoutPayments':
      return <Database className="w-5 h-5 text-orange-500" />;
    case 'contentMerchandising':
      return <FileText className="w-5 h-5 text-indigo-500" />;
    case 'accessibility':
      return <Eye className="w-5 h-5 text-teal-500" />;
    case 'performanceCoreWebVitals':
      return <TrendingUp className="w-5 h-5 text-yellow-500" />;
    case 'seo':
      return <Globe className="w-5 h-5 text-green-600" />;
    case 'trustPrivacySecurity':
      return <Shield className="w-5 h-5 text-red-600" />;
    case 'analyticsExperimentation':
      return <BarChart3 className="w-5 h-5 text-blue-600" />;
    case 'postPurchaseRetention':
      return <Users className="w-5 h-5 text-purple-600" />;
    case 'opsCms':
      return <Database className="w-5 h-5 text-gray-600" />;
    default:
      return <BarChart3 className="w-5 h-5 text-gray-500" />;
  }
};

// Helper function to get category descriptions
const getCategoryDescription = (category: string) => {
  switch (category) {
    case 'strategyPositioning':
      return 'Business model clarity, value proposition, target audience alignment, and goal definition';
    case 'navigationIA':
      return 'Navigation structure, information architecture, breadcrumbs, and internal linking';
    case 'searchDiscovery':
      return 'Search functionality, filters, categories, and product discovery features';
    case 'plpPdp':
      return 'Product listing pages, product detail pages, image quality, and pricing clarity';
    case 'checkoutPayments':
      return 'Checkout flow, payment options, form validation, and order summary';
    case 'contentMerchandising':
      return 'Content quality, merchandising, call-to-actions, and content structure';
    case 'accessibility':
      return 'WCAG compliance, keyboard navigation, screen reader support, and color contrast';
    case 'performanceCoreWebVitals':
      return 'Page speed, Core Web Vitals, mobile performance, and optimization';
    case 'seo':
      return 'Meta tags, heading structure, alt text, SSL, and mobile-friendly design';
    case 'trustPrivacySecurity':
      return 'SSL certificates, privacy policies, trust signals, and security headers';
    case 'analyticsExperimentation':
      return 'Analytics tracking, A/B testing, event tracking, and conversion measurement';
    case 'postPurchaseRetention':
      return 'Order tracking, customer support, retention features, and post-purchase experience';
    case 'opsCms':
      return 'Content management, operational efficiency, and system administration';
    default:
      return 'Website audit category evaluation';
  }
};

export default WebsiteAuditDashboard;
