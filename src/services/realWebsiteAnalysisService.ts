// Real Website Analysis Service
// Performs actual analysis of websites using backend API

import axios from 'axios';
import { API_BASE_URL } from '@/utils/apiConfig';

export interface RealAnalysisData {
  url: string;
  title: string;
  metaDescription: string;
  headings: { level: number; text: string }[];
  images: { src: string; alt: string }[];
  links: { href: string; text: string; internal: boolean }[];
  forms: { action: string; method: string; inputs: string[] }[];
  scripts: string[];
  stylesheets: string[];
  pageSize: number;
  loadTime: number;
  statusCode: number;
  sslInfo: {
    hasSSL: boolean;
    certificateValid: boolean;
    grade: string;
  };
  mobileFriendly: boolean;
  socialMedia: {
    facebook: boolean;
    twitter: boolean;
    linkedin: boolean;
    instagram: boolean;
  };
  analytics: {
    googleAnalytics: boolean;
    googleTagManager: boolean;
    facebookPixel: boolean;
  };
  cms: string | null;
  technologies: string[];
  contactInfo: {
    emails: string[];
    phones: string[];
    addresses: string[];
    socialMedia: { platform: string; url: string; text: string }[];
    contactForms: { action: string; method: string; inputs: Record<string, unknown>[] }[];
    businessHours: string[];
    locations: string[];
  };
  screenshots?: {
    fullPage: string;
    viewport: string;
  };
}

class RealWebsiteAnalysisService {
  private readonly USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  async analyzeWebsite(url: string): Promise<RealAnalysisData> {
    console.log(`Starting real analysis for: ${url}`);
    
    try {
      // Use backend API to avoid CORS issues
      const response = await axios.post(`${API_BASE_URL}/analyze-website`, {
        url: url
      }, {
        timeout: 30000
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to analyze website');
      }

      const analysisData = response.data.data;

      console.log(`Real analysis completed for ${url}`);
      return analysisData;

    } catch (error) {
      console.error(`Error analyzing ${url}:`, error);
      throw new Error(`Failed to analyze website: ${error.message}`);
    }
  }


  // Calculate scores based on real data
  calculateSEOScore(data: RealAnalysisData): number {
    let score = 0;
    
    // Title tag (20 points)
    if (data.title && data.title.length > 10 && data.title.length < 60) {
      score += 20;
    } else if (data.title) {
      score += 10;
    }
    
    // Meta description (15 points)
    if (data.metaDescription && data.metaDescription.length > 120 && data.metaDescription.length < 160) {
      score += 15;
    } else if (data.metaDescription) {
      score += 8;
    }
    
    // Heading structure (15 points)
    const h1Count = data.headings.filter(h => h.level === 1).length;
    if (h1Count === 1) {
      score += 15;
    } else if (h1Count > 0) {
      score += 8;
    }
    
    // Image alt tags (15 points)
    const imagesWithAlt = data.images.filter(img => img.alt && img.alt.length > 0).length;
    const altPercentage = data.images.length > 0 ? (imagesWithAlt / data.images.length) * 100 : 100;
    score += Math.round((altPercentage / 100) * 15);
    
    // Internal linking (10 points)
    const internalLinks = data.links.filter(link => link.internal).length;
    if (internalLinks > 5) {
      score += 10;
    } else if (internalLinks > 0) {
      score += 5;
    }
    
    // SSL (10 points)
    if (data.sslInfo.hasSSL && data.sslInfo.certificateValid) {
      score += 10;
    }
    
    // Mobile friendly (10 points)
    if (data.mobileFriendly) {
      score += 10;
    }
    
    // Page speed (5 points)
    if (data.loadTime < 2000) {
      score += 5;
    } else if (data.loadTime < 4000) {
      score += 3;
    }
    
    return Math.min(score, 100);
  }

  calculatePerformanceScore(data: RealAnalysisData): number {
    let score = 100;
    
    // Page size penalty
    if (data.pageSize > 1000000) { // 1MB
      score -= 20;
    } else if (data.pageSize > 500000) { // 500KB
      score -= 10;
    }
    
    // Load time penalty
    if (data.loadTime > 5000) { // 5 seconds
      score -= 30;
    } else if (data.loadTime > 3000) { // 3 seconds
      score -= 20;
    } else if (data.loadTime > 2000) { // 2 seconds
      score -= 10;
    }
    
    // Too many scripts penalty
    if (data.scripts.length > 20) {
      score -= 15;
    } else if (data.scripts.length > 10) {
      score -= 8;
    }
    
    // Too many stylesheets penalty
    if (data.stylesheets.length > 10) {
      score -= 10;
    } else if (data.stylesheets.length > 5) {
      score -= 5;
    }
    
    return Math.max(score, 0);
  }

  calculateAccessibilityScore(data: RealAnalysisData): number {
    let score = 100;
    
    // Missing alt tags
    const imagesWithoutAlt = data.images.filter(img => !img.alt || img.alt.length === 0).length;
    if (imagesWithoutAlt > 0) {
      score -= (imagesWithoutAlt * 5);
    }
    
    // Missing heading structure
    const h1Count = data.headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      score -= 20;
    } else if (h1Count > 1) {
      score -= 10;
    }
    
    // No forms accessibility
    if (data.forms.length > 0) {
      // Check if forms have proper labels (simplified check)
      score -= 5; // Assume forms need improvement
    }
    
    return Math.max(score, 0);
  }

  calculateSecurityScore(data: RealAnalysisData): number {
    let score = 100;
    
    // SSL check
    if (!data.sslInfo.hasSSL) {
      score -= 40;
    } else if (!data.sslInfo.certificateValid) {
      score -= 20;
    }
    
    // Mixed content check (simplified)
    const hasHttpResources = data.scripts.some(s => s.startsWith('http://')) || 
                           data.stylesheets.some(s => s.startsWith('http://'));
    if (hasHttpResources) {
      score -= 15;
    }
    
    return Math.max(score, 0);
  }

  calculateUsabilityScore(data: RealAnalysisData): number {
    let score = 100;
    
    // Navigation structure
    const navLinks = data.links.filter(link => 
      link.text.toLowerCase().includes('home') || 
      link.text.toLowerCase().includes('about') ||
      link.text.toLowerCase().includes('contact') ||
      link.text.toLowerCase().includes('services')
    ).length;
    
    if (navLinks < 3) {
      score -= 20;
    }
    
    // Contact information
    const hasContactForm = data.forms.length > 0;
    const hasContactLinks = data.links.some(link => 
      link.href.includes('mailto:') || link.href.includes('tel:')
    );
    
    if (!hasContactForm && !hasContactLinks) {
      score -= 25;
    }
    
    // Mobile friendliness
    if (!data.mobileFriendly) {
      score -= 30;
    }
    
    return Math.max(score, 0);
  }
}

// Export singleton instance
export const realWebsiteAnalysisService = new RealWebsiteAnalysisService();
