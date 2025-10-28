// Sales Pitch Dashboard Component
// Generates presentation content and email templates for client outreach

import React, { useState } from 'react';
import { X, Download, Mail, Presentation, FileText, Copy, Check, User, Building, Calendar, DollarSign } from 'lucide-react';
import { AuditResult } from '@/services/websiteAuditService';
import { salesPitchGenerator, SalesPitchOptions, PresentationSlide, EmailTemplate } from '@/services/salesPitchGenerator';

interface SalesPitchDashboardProps {
  auditResult: AuditResult | null;
  onClose: () => void;
}

const SalesPitchDashboard: React.FC<SalesPitchDashboardProps> = ({ auditResult, onClose }) => {
  const [activeTab, setActiveTab] = useState<'presentation' | 'email' | 'powerpoint'>('presentation');
  const [options, setOptions] = useState<SalesPitchOptions>({
    clientName: '',
    companyName: '',
    contactEmail: 'hello@sanddollardesign.co.za',
    includeCaseStudies: true
  });
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  if (!auditResult) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Audit Data</h3>
            <p className="text-gray-600 mb-4">Please run a website audit first to generate sales pitch materials.</p>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set(prev).add(itemId));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const generatePresentationSlides = (): PresentationSlide[] => {
    return salesPitchGenerator.generatePresentationSlides(auditResult, options);
  };

  const generateEmailTemplate = (): EmailTemplate => {
    return salesPitchGenerator.generateEmailTemplate(auditResult, options);
  };

  const generatePowerPointContent = (): string => {
    return salesPitchGenerator.generatePowerPointContent(auditResult, options);
  };

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const slides = generatePresentationSlides();
  const emailTemplate = generateEmailTemplate();
  const powerpointContent = generatePowerPointContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sales Pitch Generator</h2>
            <p className="text-gray-600">Generate presentation content and email templates for client outreach</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Options Panel */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                value={options.clientName || ''}
                onChange={(e) => setOptions(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={options.companyName || ''}
                onChange={(e) => setOptions(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="ABC Company"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={options.contactEmail || ''}
                onChange={(e) => setOptions(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="hello@sanddollardesign.co.za"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('presentation')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'presentation'
                ? 'border-b-2 border-[#f97316] text-[#f97316]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Presentation className="w-4 h-4 inline mr-2" />
            Presentation Slides
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'email'
                ? 'border-b-2 border-[#f97316] text-[#f97316]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email Template
          </button>
          <button
            onClick={() => setActiveTab('powerpoint')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'powerpoint'
                ? 'border-b-2 border-[#f97316] text-[#f97316]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            PowerPoint Content
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'presentation' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Presentation Slides</h3>
                <button
                  onClick={() => downloadAsText(
                    slides.map((slide, index) => `Slide ${index + 1}: ${slide.title}\n\n${slide.content}\n\n---\n`).join('\n'),
                    `presentation-${auditResult.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
                  )}
                  className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#e8620e] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Slides
                </button>
              </div>
              
              <div className="space-y-4">
                {slides.map((slide, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{slide.title}</h4>
                      <button
                        onClick={() => handleCopy(`${slide.title}\n\n${slide.content}`, `slide-${index}`)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                      >
                        {copiedItems.has(`slide-${index}`) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        Copy
                      </button>
                    </div>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {slide.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Email Template</h3>
                <button
                  onClick={() => downloadAsText(
                    `Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`,
                    `email-template-${auditResult.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
                  )}
                  className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#e8620e] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Email
                </button>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Email Subject</h4>
                    <button
                      onClick={() => handleCopy(emailTemplate.subject, 'email-subject')}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {copiedItems.has('email-subject') ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{emailTemplate.subject}</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Email Body</h4>
                    <button
                      onClick={() => handleCopy(emailTemplate.body, 'email-body')}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {copiedItems.has('email-body') ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {emailTemplate.body}
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Call to Action</h4>
                    <button
                      onClick={() => handleCopy(emailTemplate.callToAction, 'email-cta')}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {copiedItems.has('email-cta') ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{emailTemplate.callToAction}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'powerpoint' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">PowerPoint Content</h3>
                <button
                  onClick={() => downloadAsText(
                    powerpointContent,
                    `powerpoint-content-${auditResult.url.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.md`
                  )}
                  className="flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#e8620e] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Content
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Markdown Content</h4>
                  <button
                    onClick={() => handleCopy(powerpointContent, 'powerpoint-content')}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {copiedItems.has('powerpoint-content') ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    Copy All
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {powerpointContent}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPitchDashboard;
