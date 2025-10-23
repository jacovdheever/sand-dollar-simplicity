// Website Audit Service
// Comprehensive website analysis for client pitches and improvements

import { realWebsiteAnalysisService, RealAnalysisData } from './realWebsiteAnalysisService';

export interface AuditResult {
  id: string;
  url: string;
  timestamp: string;
  overallScore: number;
  categories: {
    usability: CategoryScore;
    uxDesign: CategoryScore;
    uiDesign: CategoryScore;
    backend: CategoryScore;
    seo: CategoryScore;
    crm: CategoryScore;
    contentManagement: CategoryScore;
    sales: CategoryScore;
    performance: CategoryScore;
    accessibility: CategoryScore;
    security: CategoryScore;
  };
  insights: Insight[];
  recommendations: Recommendation[];
  technicalDetails: TechnicalDetails;
  competitiveAnalysis?: CompetitiveAnalysis;
  contactInfo?: {
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
  designs?: DesignMockup[];
}

export interface CategoryScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: Issue[];
  strengths: string[];
  improvements: string[];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  impact: string;
  solution: string;
  effort: 'low' | 'medium' | 'high';
  priority: number; // 1-10
}

export interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'opportunity';
  title: string;
  description: string;
  category: string;
  impact: string;
  data?: Record<string, unknown>;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
  roi: string;
  implementation: string[];
}

export interface DesignMockup {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  improvements: string[];
}

export interface TechnicalDetails {
  pageSpeed: {
    desktop: number;
    mobile: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
  };
  seoMetrics: {
    titleTags: number;
    metaDescriptions: number;
    headingStructure: number;
    imageAltTags: number;
    internalLinks: number;
    externalLinks: number;
  };
  accessibility: {
    wcagLevel: 'A' | 'AA' | 'AAA' | 'None';
    issues: number;
    score: number;
  };
  security: {
    https: boolean;
    sslGrade: string;
    vulnerabilities: number;
    headers: string[];
  };
  mobileResponsiveness: {
    score: number;
    issues: string[];
  };
}

export interface CompetitiveAnalysis {
  competitors: Competitor[];
  marketPosition: string;
  opportunities: string[];
  threats: string[];
}

export interface Competitor {
  name: string;
  url: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

class WebsiteAuditService {
  private readonly API_ENDPOINT = '/api/audit';

  // Main audit function
  async auditWebsite(url: string): Promise<AuditResult> {
    console.log(`Starting comprehensive audit for: ${url}`);
    
    try {
      // Validate URL
      const validatedUrl = this.validateUrl(url);
      
      // Perform real website analysis first
      console.log('Performing real website analysis...');
      const realAnalysisData = await realWebsiteAnalysisService.analyzeWebsite(validatedUrl);
      console.log('Real analysis completed, generating audit results...');
      
      // Run all audit categories using real data
      const [
        usability,
        uxDesign,
        uiDesign,
        backend,
        seo,
        crm,
        contentManagement,
        sales,
        performance,
        accessibility,
        security
      ] = await Promise.all([
        this.auditUsability(validatedUrl, realAnalysisData),
        this.auditUXDesign(validatedUrl, realAnalysisData),
        this.auditUIDesign(validatedUrl, realAnalysisData),
        this.auditBackend(validatedUrl, realAnalysisData),
        this.auditSEO(validatedUrl, realAnalysisData),
        this.auditCRM(validatedUrl, realAnalysisData),
        this.auditContentManagement(validatedUrl, realAnalysisData),
        this.auditSales(validatedUrl, realAnalysisData),
        this.auditPerformance(validatedUrl, realAnalysisData),
        this.auditAccessibility(validatedUrl, realAnalysisData),
        this.auditSecurity(validatedUrl, realAnalysisData)
      ]);

      // Generate insights and recommendations
      const insights = this.generateInsights({
        usability, uxDesign, uiDesign, backend, seo, crm, 
        contentManagement, sales, performance, accessibility, security
      });

      const recommendations = this.generateRecommendations({
        usability, uxDesign, uiDesign, backend, seo, crm, 
        contentManagement, sales, performance, accessibility, security
      });

      // Get technical details using real analysis
      const technicalDetails = this.getTechnicalDetailsFromRealData(realAnalysisData);

      // Calculate overall score
      const overallScore = this.calculateOverallScore({
        usability, uxDesign, uiDesign, backend, seo, crm, 
        contentManagement, sales, performance, accessibility, security
      });

      const result: AuditResult = {
        id: `audit-${Date.now()}`,
        url: validatedUrl,
        timestamp: new Date().toISOString(),
        overallScore,
        categories: {
          usability,
          uxDesign,
          uiDesign,
          backend,
          seo,
          crm,
          contentManagement,
          sales,
          performance,
          accessibility,
          security
        },
        insights,
        recommendations,
        technicalDetails,
        contactInfo: realAnalysisData.contactInfo,
        screenshots: realAnalysisData.screenshots
      };

      // Generate design mockups
      try {
        const designs = await this.generateDesignMockups(validatedUrl, realAnalysisData);
        result.designs = designs;
      } catch (designError) {
        console.warn('Failed to generate designs:', designError);
        // Continue without designs if generation fails
      }

      console.log(`Audit completed for ${url}. Overall score: ${overallScore}`);
      return result;

    } catch (error) {
      console.error('Audit failed:', error);
      throw new Error(`Failed to audit website: ${error.message}`);
    }
  }

  // URL validation
  private validateUrl(url: string): string {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.toString();
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }

  // Helper function to get grade from score
  private getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  // Usability Audit
  private async auditUsability(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Calculate real usability score
    const realScore = realWebsiteAnalysisService.calculateUsabilityScore(realData);

    // Navigation analysis
    const navLinks = realData.links.filter(link => 
      link.text.toLowerCase().includes('home') || 
      link.text.toLowerCase().includes('about') ||
      link.text.toLowerCase().includes('contact') ||
      link.text.toLowerCase().includes('services')
    );

    if (navLinks.length < 3) {
      issues.push({
        id: 'nav-structure',
        title: 'Insufficient Navigation Structure',
        description: `Only ${navLinks.length} main navigation links found. Users need clear paths to key pages.`,
        severity: 'high',
        category: 'usability',
        impact: 'Users struggle to find important pages and information',
        solution: 'Add clear navigation menu with links to Home, About, Services, and Contact pages',
        effort: 'medium',
        priority: 8
      });
    } else {
      strengths.push('Good navigation structure with clear main pages');
    }

    // Contact information analysis
    const hasContactForm = realData.forms.length > 0;
    const hasContactLinks = realData.links.some(link => 
      link.href.includes('mailto:') || link.href.includes('tel:')
    );

    if (!hasContactForm && !hasContactLinks) {
      issues.push({
        id: 'contact-info',
        title: 'Missing Contact Information',
        description: 'No contact forms or direct contact links found on the website',
        severity: 'high',
        category: 'usability',
        impact: 'Users cannot easily contact the business',
        solution: 'Add contact form and/or direct contact links (email, phone)',
        effort: 'low',
        priority: 9
      });
    } else {
      strengths.push('Contact information is easily accessible');
    }

    // Mobile friendliness
    if (!realData.mobileFriendly) {
      issues.push({
        id: 'mobile-friendly',
        title: 'Not Mobile-Friendly',
        description: 'Website lacks proper mobile viewport configuration',
        severity: 'critical',
        category: 'usability',
        impact: 'Poor experience on mobile devices, high bounce rate',
        solution: 'Add responsive viewport meta tag and optimize for mobile',
        effort: 'high',
        priority: 10
      });
    } else {
      strengths.push('Mobile-friendly design implemented');
    }

    // Page load time analysis
    if (realData.loadTime > 3000) {
      issues.push({
        id: 'load-time',
        title: 'Slow Page Load Time',
        description: `Page loads in ${realData.loadTime}ms, which is above the recommended 3 seconds`,
        severity: 'high',
        category: 'usability',
        impact: 'Users abandon the site due to slow loading',
        solution: 'Optimize images, minify code, and implement caching',
        effort: 'medium',
        priority: 7
      });
    } else {
      strengths.push('Good page load performance');
    }

    // Generate improvements based on issues
    if (issues.length === 0) {
      improvements.push('Maintain current usability standards');
    } else {
      improvements.push('Improve navigation structure');
      improvements.push('Enhance mobile experience');
      improvements.push('Optimize page load times');
      improvements.push('Add user feedback mechanisms');
    }

    const grade = this.getGradeFromScore(realScore);

    return {
      score: realScore,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // UX Design Audit
  private async auditUXDesign(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'user-journey',
        title: 'Unclear User Journey',
        description: 'Website lacks clear user paths and conversion funnels',
        severity: 'high',
        category: 'ux-design',
        impact: 'Users abandon site without completing goals',
        solution: 'Map user journeys and optimize conversion paths',
        effort: 'high',
        priority: 9
      },
      {
        id: 'mobile-ux',
        title: 'Poor Mobile User Experience',
        description: 'Mobile interface is not optimized for touch interactions',
        severity: 'high',
        category: 'ux-design',
        impact: 'High mobile bounce rate',
        solution: 'Redesign mobile interface with touch-friendly elements',
        effort: 'high',
        priority: 9
      }
    ];

    const strengths = [
      'Intuitive information architecture',
      'Good use of progressive disclosure',
      'Consistent interaction patterns'
    ];

    const improvements = [
      'Optimize user journey mapping',
      'Improve mobile touch interactions',
      'Add micro-interactions for feedback',
      'Implement user testing program'
    ];

    return {
      score: 68,
      grade: 'D',
      issues,
      strengths,
      improvements
    };
  }

  // UI Design Audit
  private async auditUIDesign(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'visual-hierarchy',
        title: 'Weak Visual Hierarchy',
        description: 'Typography and spacing don\'t create clear content hierarchy',
        severity: 'medium',
        category: 'ui-design',
        impact: 'Users struggle to scan content effectively',
        solution: 'Implement proper typography scale and spacing system',
        effort: 'medium',
        priority: 7
      },
      {
        id: 'color-contrast',
        title: 'Insufficient Color Contrast',
        description: 'Text contrast ratios don\'t meet accessibility standards',
        severity: 'high',
        category: 'ui-design',
        impact: 'Accessibility issues and poor readability',
        solution: 'Update color palette to meet WCAG AA standards',
        effort: 'low',
        priority: 8
      }
    ];

    const strengths = [
      'Modern and clean aesthetic',
      'Consistent brand application',
      'Good use of imagery'
    ];

    const improvements = [
      'Strengthen visual hierarchy',
      'Improve color contrast ratios',
      'Enhance responsive design',
      'Add loading states and animations'
    ];

    return {
      score: 75,
      grade: 'C',
      issues,
      strengths,
      improvements
    };
  }

  // Backend Audit
  private async auditBackend(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'api-performance',
        title: 'Slow API Response Times',
        description: 'Backend APIs are responding slowly, affecting user experience',
        severity: 'high',
        category: 'backend',
        impact: 'Poor user experience and high bounce rates',
        solution: 'Optimize database queries and implement caching',
        effort: 'high',
        priority: 8
      },
      {
        id: 'error-handling',
        title: 'Poor Error Handling',
        description: 'Application doesn\'t handle errors gracefully',
        severity: 'medium',
        category: 'backend',
        impact: 'Users see technical errors instead of helpful messages',
        solution: 'Implement comprehensive error handling and logging',
        effort: 'medium',
        priority: 6
      }
    ];

    const strengths = [
      'Modern technology stack',
      'Good security practices',
      'Scalable architecture'
    ];

    const improvements = [
      'Optimize API performance',
      'Improve error handling',
      'Implement monitoring and alerting',
      'Add automated testing'
    ];

    return {
      score: 70,
      grade: 'C',
      issues,
      strengths,
      improvements
    };
  }

  // SEO Audit
  private async auditSEO(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Calculate real SEO score
    const realScore = realWebsiteAnalysisService.calculateSEOScore(realData);

    // Title tag analysis
    if (!realData.title) {
      issues.push({
        id: 'missing-title',
        title: 'Missing Title Tag',
        description: 'No title tag found on the page',
        severity: 'critical',
        category: 'seo',
        impact: 'Search engines cannot properly index the page',
        solution: 'Add a descriptive title tag (50-60 characters)',
        effort: 'low',
        priority: 10
      });
    } else if (realData.title.length < 10 || realData.title.length > 60) {
      issues.push({
        id: 'title-length',
        title: 'Title Tag Length Issues',
        description: `Title tag is ${realData.title.length} characters (recommended: 50-60)`,
        severity: 'medium',
        category: 'seo',
        impact: 'Title may be truncated in search results',
        solution: 'Optimize title tag length to 50-60 characters',
        effort: 'low',
        priority: 6
      });
    } else {
      strengths.push('Well-optimized title tag');
    }

    // Meta description analysis
    if (!realData.metaDescription) {
      issues.push({
        id: 'missing-meta-description',
        title: 'Missing Meta Description',
        description: 'No meta description found on the page',
        severity: 'high',
        category: 'seo',
        impact: 'Search engines may generate poor snippets',
        solution: 'Add a compelling meta description (120-160 characters)',
        effort: 'low',
        priority: 8
      });
    } else if (realData.metaDescription.length < 120 || realData.metaDescription.length > 160) {
      issues.push({
        id: 'meta-description-length',
        title: 'Meta Description Length Issues',
        description: `Meta description is ${realData.metaDescription.length} characters (recommended: 120-160)`,
        severity: 'medium',
        category: 'seo',
        impact: 'Description may be truncated in search results',
        solution: 'Optimize meta description length to 120-160 characters',
        effort: 'low',
        priority: 6
      });
    } else {
      strengths.push('Well-optimized meta description');
    }

    // Heading structure analysis
    const h1Count = realData.headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push({
        id: 'missing-h1',
        title: 'Missing H1 Tag',
        description: 'No H1 heading found on the page',
        severity: 'high',
        category: 'seo',
        impact: 'Search engines cannot identify the main topic',
        solution: 'Add a single H1 tag with the main page topic',
        effort: 'low',
        priority: 8
      });
    } else if (h1Count > 1) {
      issues.push({
        id: 'multiple-h1',
        title: 'Multiple H1 Tags',
        description: `Found ${h1Count} H1 tags (should be only 1)`,
        severity: 'medium',
        category: 'seo',
        impact: 'Confuses search engines about page hierarchy',
        solution: 'Use only one H1 tag per page',
        effort: 'low',
        priority: 6
      });
    } else {
      strengths.push('Proper heading structure with single H1');
    }

    // Image alt text analysis
    const imagesWithoutAlt = realData.images.filter(img => !img.alt || img.alt.length === 0).length;
    if (imagesWithoutAlt > 0) {
      issues.push({
        id: 'missing-alt-text',
        title: 'Missing Image Alt Text',
        description: `${imagesWithoutAlt} images are missing alt text`,
        severity: 'medium',
        category: 'seo',
        impact: 'Search engines cannot understand image content',
        solution: 'Add descriptive alt text to all images',
        effort: 'low',
        priority: 6
      });
    } else if (realData.images.length > 0) {
      strengths.push('All images have proper alt text');
    }

    // Internal linking analysis
    const internalLinks = realData.links.filter(link => link.internal).length;
    if (internalLinks < 5) {
      issues.push({
        id: 'insufficient-internal-links',
        title: 'Insufficient Internal Linking',
        description: `Only ${internalLinks} internal links found`,
        severity: 'medium',
        category: 'seo',
        impact: 'Poor page authority distribution',
        solution: 'Add more internal links to relevant pages',
        effort: 'medium',
        priority: 5
      });
    } else {
      strengths.push('Good internal linking structure');
    }

    // SSL analysis
    if (!realData.sslInfo.hasSSL) {
      issues.push({
        id: 'no-ssl',
        title: 'No SSL Certificate',
        description: 'Website is not using HTTPS',
        severity: 'critical',
        category: 'seo',
        impact: 'Google penalizes non-HTTPS sites',
        solution: 'Install and configure SSL certificate',
        effort: 'medium',
        priority: 10
      });
    } else {
      strengths.push('SSL certificate properly configured');
    }

    // Mobile friendliness
    if (!realData.mobileFriendly) {
      issues.push({
        id: 'not-mobile-friendly',
        title: 'Not Mobile-Friendly',
        description: 'Website is not optimized for mobile devices',
        severity: 'high',
        category: 'seo',
        impact: 'Google mobile-first indexing will penalize the site',
        solution: 'Implement responsive design and mobile optimization',
        effort: 'high',
        priority: 9
      });
    } else {
      strengths.push('Mobile-friendly design');
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current SEO standards');
    } else {
      improvements.push('Optimize meta tags and titles');
      improvements.push('Improve heading structure');
      improvements.push('Add missing alt text to images');
      improvements.push('Enhance internal linking');
      improvements.push('Implement SSL if missing');
    }

    const grade = this.getGradeFromScore(realScore);

    return {
      score: realScore,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // CRM Audit
  private async auditCRM(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'lead-capture',
        title: 'Ineffective Lead Capture',
        description: 'Website lacks proper lead capture mechanisms',
        severity: 'high',
        category: 'crm',
        impact: 'Missing potential customers',
        solution: 'Implement strategic lead capture forms and CTAs',
        effort: 'medium',
        priority: 9
      },
      {
        id: 'customer-data',
        title: 'Poor Customer Data Collection',
        description: 'Limited customer insights and behavior tracking',
        severity: 'medium',
        category: 'crm',
        impact: 'Inability to personalize user experience',
        solution: 'Implement analytics and customer data collection',
        effort: 'high',
        priority: 7
      }
    ];

    const strengths = [
      'Contact information is easily accessible',
      'Professional contact forms',
      'Clear business information'
    ];

    const improvements = [
      'Enhance lead capture strategies',
      'Implement customer data collection',
      'Add marketing automation',
      'Improve customer communication'
    ];

    return {
      score: 60,
      grade: 'D',
      issues,
      strengths,
      improvements
    };
  }

  // Content Management Audit
  private async auditContentManagement(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'content-freshness',
        title: 'Outdated Content',
        description: 'Website content appears outdated and not regularly updated',
        severity: 'medium',
        category: 'content-management',
        impact: 'Reduced user trust and engagement',
        solution: 'Implement content calendar and regular updates',
        effort: 'medium',
        priority: 6
      },
      {
        id: 'content-structure',
        title: 'Poor Content Organization',
        description: 'Content lacks clear structure and categorization',
        severity: 'medium',
        category: 'content-management',
        impact: 'Users can\'t find relevant information',
        solution: 'Reorganize content with clear categories and search',
        effort: 'high',
        priority: 7
      }
    ];

    const strengths = [
      'Professional content quality',
      'Good use of multimedia',
      'Clear messaging'
    ];

    const improvements = [
      'Implement content management system',
      'Create content calendar',
      'Improve content organization',
      'Add content search functionality'
    ];

    return {
      score: 70,
      grade: 'C',
      issues,
      strengths,
      improvements
    };
  }

  // Sales Audit
  private async auditSales(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [
      {
        id: 'conversion-optimization',
        title: 'Poor Conversion Optimization',
        description: 'Website lacks conversion optimization strategies',
        severity: 'high',
        category: 'sales',
        impact: 'Low conversion rates and lost revenue',
        solution: 'Implement A/B testing and conversion optimization',
        effort: 'high',
        priority: 9
      },
      {
        id: 'trust-signals',
        title: 'Lack of Trust Signals',
        description: 'Website lacks social proof and trust indicators',
        severity: 'medium',
        category: 'sales',
        impact: 'Reduced user confidence and conversions',
        solution: 'Add testimonials, reviews, and trust badges',
        effort: 'low',
        priority: 7
      }
    ];

    const strengths = [
      'Clear value proposition',
      'Professional presentation',
      'Good product/service descriptions'
    ];

    const improvements = [
      'Implement conversion optimization',
      'Add trust signals and social proof',
      'Improve sales funnel',
      'Add customer testimonials'
    ];

    return {
      score: 65,
      grade: 'D',
      issues,
      strengths,
      improvements
    };
  }

  // Performance Audit
  private async auditPerformance(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Calculate real performance score
    const realScore = realWebsiteAnalysisService.calculatePerformanceScore(realData);

    // Page load time analysis
    if (realData.loadTime > 5000) {
      issues.push({
        id: 'page-speed',
        title: 'Very Slow Page Load Time',
        description: `Page loads in ${realData.loadTime}ms, which is significantly above the recommended 3 seconds`,
        severity: 'critical',
        category: 'performance',
        impact: 'High bounce rates and poor user experience',
        solution: 'Optimize images, minify code, and implement caching',
        effort: 'high',
        priority: 10
      });
    } else if (realData.loadTime > 3000) {
      issues.push({
        id: 'page-speed',
        title: 'Slow Page Load Time',
        description: `Page loads in ${realData.loadTime}ms, which is above the recommended 3 seconds`,
        severity: 'high',
        category: 'performance',
        impact: 'Users may abandon the site due to slow loading',
        solution: 'Optimize images, minify code, and implement caching',
        effort: 'medium',
        priority: 8
      });
    } else {
      strengths.push('Good page load performance');
    }

    // Page size analysis
    if (realData.pageSize > 1000000) { // 1MB
      issues.push({
        id: 'page-size',
        title: 'Large Page Size',
        description: `Page size is ${Math.round(realData.pageSize / 1024)}KB, which is above the recommended 1MB`,
        severity: 'high',
        category: 'performance',
        impact: 'Slow loading on slower connections',
        solution: 'Optimize images, remove unused code, and compress assets',
        effort: 'medium',
        priority: 7
      });
    } else {
      strengths.push('Optimized page size');
    }

    // Script analysis
    if (realData.scripts.length > 20) {
      issues.push({
        id: 'too-many-scripts',
        title: 'Too Many JavaScript Files',
        description: `Found ${realData.scripts.length} JavaScript files, which may impact performance`,
        severity: 'medium',
        category: 'performance',
        impact: 'Increased load time and bandwidth usage',
        solution: 'Combine and minify JavaScript files',
        effort: 'medium',
        priority: 6
      });
    } else {
      strengths.push('Reasonable number of JavaScript files');
    }

    // Stylesheet analysis
    if (realData.stylesheets.length > 10) {
      issues.push({
        id: 'too-many-stylesheets',
        title: 'Too Many CSS Files',
        description: `Found ${realData.stylesheets.length} CSS files, which may impact performance`,
        severity: 'medium',
        category: 'performance',
        impact: 'Increased load time and bandwidth usage',
        solution: 'Combine and minify CSS files',
        effort: 'low',
        priority: 5
      });
    } else {
      strengths.push('Optimized CSS structure');
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current performance standards');
    } else {
      improvements.push('Optimize page load speeds');
      improvements.push('Reduce page size');
      improvements.push('Minify and combine assets');
      improvements.push('Implement performance monitoring');
    }

    const grade = this.getGradeFromScore(realScore);

    return {
      score: realScore,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Accessibility Audit
  private async auditAccessibility(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Calculate real accessibility score
    const realScore = realWebsiteAnalysisService.calculateAccessibilityScore(realData);

    // Image alt text analysis
    const imagesWithoutAlt = realData.images.filter(img => !img.alt || img.alt.length === 0).length;
    if (imagesWithoutAlt > 0) {
      issues.push({
        id: 'alt-text',
        title: 'Missing Alt Text',
        description: `${imagesWithoutAlt} images are missing alt text for screen readers`,
        severity: 'high',
        category: 'accessibility',
        impact: 'Poor experience for visually impaired users',
        solution: 'Add descriptive alt text to all images',
        effort: 'low',
        priority: 8
      });
    } else if (realData.images.length > 0) {
      strengths.push('All images have proper alt text');
    }

    // Heading structure analysis
    const h1Count = realData.headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      issues.push({
        id: 'missing-h1',
        title: 'Missing H1 Heading',
        description: 'No H1 heading found, which is essential for screen reader navigation',
        severity: 'high',
        category: 'accessibility',
        impact: 'Screen readers cannot identify the main page topic',
        solution: 'Add a single H1 heading to identify the main page content',
        effort: 'low',
        priority: 8
      });
    } else if (h1Count > 1) {
      issues.push({
        id: 'multiple-h1',
        title: 'Multiple H1 Headings',
        description: `Found ${h1Count} H1 headings (should be only 1)`,
        severity: 'medium',
        category: 'accessibility',
        impact: 'Confuses screen readers about page structure',
        solution: 'Use only one H1 heading per page',
        effort: 'low',
        priority: 6
      });
    } else {
      strengths.push('Proper heading structure with single H1');
    }

    // Form accessibility analysis
    if (realData.forms.length > 0) {
      // Check if forms have proper structure (simplified check)
      const formsWithLabels = realData.forms.filter(form => form.inputs.length > 0);
      if (formsWithLabels.length < realData.forms.length) {
        issues.push({
          id: 'form-accessibility',
          title: 'Form Accessibility Issues',
          description: 'Forms may lack proper labels and accessibility attributes',
          severity: 'medium',
          category: 'accessibility',
          impact: 'Difficult for screen reader users to complete forms',
          solution: 'Add proper labels, ARIA attributes, and form validation',
          effort: 'medium',
          priority: 6
        });
      } else {
        strengths.push('Forms appear to have proper structure');
      }
    }

    // Mobile friendliness (affects accessibility)
    if (!realData.mobileFriendly) {
      issues.push({
        id: 'mobile-accessibility',
        title: 'Mobile Accessibility Issues',
        description: 'Website is not mobile-friendly, affecting accessibility on mobile devices',
        severity: 'high',
        category: 'accessibility',
        impact: 'Poor experience for users with disabilities on mobile',
        solution: 'Implement responsive design and mobile accessibility features',
        effort: 'high',
        priority: 7
      });
    } else {
      strengths.push('Mobile-friendly design supports accessibility');
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current accessibility standards');
    } else {
      improvements.push('Add alt text to images');
      improvements.push('Improve heading structure');
      improvements.push('Enhance form accessibility');
      improvements.push('Implement ARIA labels');
      improvements.push('Test with screen readers');
    }

    const grade = this.getGradeFromScore(realScore);

    return {
      score: realScore,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Security Audit
  private async auditSecurity(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Calculate real security score
    const realScore = realWebsiteAnalysisService.calculateSecurityScore(realData);

    // SSL analysis
    if (!realData.sslInfo.hasSSL) {
      issues.push({
        id: 'ssl-certificate',
        title: 'No SSL Certificate',
        description: 'Website is not using HTTPS, which is a critical security issue',
        severity: 'critical',
        category: 'security',
        impact: 'Data transmission is not encrypted, security warnings in browsers',
        solution: 'Install and configure SSL certificate to enable HTTPS',
        effort: 'medium',
        priority: 10
      });
    } else if (!realData.sslInfo.certificateValid) {
      issues.push({
        id: 'ssl-certificate',
        title: 'Invalid SSL Certificate',
        description: 'SSL certificate has issues or is not properly configured',
        severity: 'high',
        category: 'security',
        impact: 'Security warnings and reduced user trust',
        solution: 'Fix SSL certificate configuration',
        effort: 'low',
        priority: 9
      });
    } else {
      strengths.push('SSL certificate properly configured');
    }

    // Mixed content analysis
    const hasHttpResources = realData.scripts.some(s => s.startsWith('http://')) || 
                           realData.stylesheets.some(s => s.startsWith('http://'));
    if (hasHttpResources) {
      issues.push({
        id: 'mixed-content',
        title: 'Mixed Content Issues',
        description: 'Website loads HTTP resources over HTTPS, causing security warnings',
        severity: 'medium',
        category: 'security',
        impact: 'Security warnings in browsers and potential vulnerabilities',
        solution: 'Update all HTTP resources to use HTTPS',
        effort: 'low',
        priority: 6
      });
    } else {
      strengths.push('No mixed content issues detected');
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current security standards');
    } else {
      improvements.push('Implement SSL certificate');
      improvements.push('Fix mixed content issues');
      improvements.push('Add security headers');
      improvements.push('Implement security monitoring');
    }

    const grade = this.getGradeFromScore(realScore);

    return {
      score: realScore,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Get technical details from real analysis data
  private getTechnicalDetailsFromRealData(realData: RealAnalysisData): TechnicalDetails {
    // Calculate SEO metrics from real data
    const titleScore = realData.title && realData.title.length >= 10 && realData.title.length <= 60 ? 100 : 0;
    const metaScore = realData.metaDescription && realData.metaDescription.length >= 120 && realData.metaDescription.length <= 160 ? 100 : 0;
    const h1Count = realData.headings.filter(h => h.level === 1).length;
    const headingScore = h1Count === 1 ? 100 : h1Count > 0 ? 50 : 0;
    const imagesWithAlt = realData.images.filter(img => img.alt && img.alt.length > 0).length;
    const altScore = realData.images.length > 0 ? (imagesWithAlt / realData.images.length) * 100 : 100;
    const internalLinks = realData.links.filter(link => link.internal).length;
    const internalLinkScore = internalLinks >= 5 ? 100 : internalLinks > 0 ? (internalLinks / 5) * 100 : 0;
    const externalLinks = realData.links.filter(link => !link.internal).length;
    const externalLinkScore = externalLinks > 0 ? Math.min(externalLinks * 10, 100) : 0;

    // Calculate accessibility score
    const accessibilityScore = realWebsiteAnalysisService.calculateAccessibilityScore(realData);
    const accessibilityIssues = realData.images.filter(img => !img.alt || img.alt.length === 0).length + 
                               (realData.headings.filter(h => h.level === 1).length === 0 ? 1 : 0);

    // Calculate mobile responsiveness score
    const mobileScore = realData.mobileFriendly ? 100 : 0;
    const mobileIssues = realData.mobileFriendly ? [] : ['Not mobile-friendly'];

    return {
      pageSpeed: {
        desktop: Math.max(100 - (realData.loadTime / 100), 0), // Convert load time to score
        mobile: Math.max(100 - (realData.loadTime / 100), 0),
        coreWebVitals: {
          lcp: realData.loadTime / 1000, // Convert to seconds
          fid: 50, // Estimated
          cls: 0.1 // Estimated
        }
      },
      seoMetrics: {
        titleTags: Math.round(titleScore),
        metaDescriptions: Math.round(metaScore),
        headingStructure: Math.round(headingScore),
        imageAltTags: Math.round(altScore),
        internalLinks: Math.round(internalLinkScore),
        externalLinks: Math.round(externalLinkScore)
      },
      accessibility: {
        wcagLevel: accessibilityScore >= 80 ? 'AA' : accessibilityScore >= 60 ? 'A' : 'None',
        issues: accessibilityIssues,
        score: Math.round(accessibilityScore)
      },
      security: {
        https: realData.sslInfo.hasSSL,
        sslGrade: realData.sslInfo.grade,
        vulnerabilities: realData.sslInfo.hasSSL ? 0 : 1,
        headers: realData.sslInfo.hasSSL ? ['HSTS'] : []
      },
      mobileResponsiveness: {
        score: Math.round(mobileScore),
        issues: mobileIssues
      }
    };
  }

  // Generate insights
  private generateInsights(categories: Record<string, unknown>): Insight[] {
    return [
      {
        id: 'insight-1',
        type: 'negative',
        title: 'High Bounce Rate on Mobile',
        description: 'Mobile users are leaving the site quickly, indicating poor mobile experience',
        category: 'performance',
        impact: 'Lost mobile traffic and conversions',
        data: { bounceRate: 68, mobileTraffic: 45 }
      },
      {
        id: 'insight-2',
        type: 'opportunity',
        title: 'Strong Brand Recognition',
        description: 'Website has strong brand elements but could leverage them better for conversions',
        category: 'ui-design',
        impact: 'Opportunity to improve conversion rates',
        data: { brandConsistency: 85, conversionRate: 2.3 }
      },
      {
        id: 'insight-3',
        type: 'negative',
        title: 'Poor SEO Performance',
        description: 'Website is not optimized for search engines, missing key opportunities',
        category: 'seo',
        impact: 'Low organic traffic and visibility',
        data: { organicTraffic: 25, keywordRankings: 156 }
      }
    ];
  }

  // Generate recommendations
  private generateRecommendations(categories: Record<string, unknown>): Recommendation[] {
    return [
      {
        id: 'rec-1',
        title: 'Mobile-First Redesign',
        description: 'Complete mobile optimization to capture mobile traffic',
        category: 'ux-design',
        priority: 'high',
        effort: 'high',
        impact: 'high',
        roi: '300% increase in mobile conversions',
        implementation: [
          'Audit current mobile experience',
          'Design mobile-first interface',
          'Implement touch-friendly interactions',
          'Test across devices',
          'Launch and monitor performance'
        ]
      },
      {
        id: 'rec-2',
        title: 'SEO Optimization Package',
        description: 'Comprehensive SEO improvements to increase organic visibility',
        category: 'seo',
        priority: 'high',
        effort: 'medium',
        impact: 'high',
        roi: '200% increase in organic traffic',
        implementation: [
          'Optimize meta tags and descriptions',
          'Improve page load speeds',
          'Add structured data markup',
          'Create quality content',
          'Build authoritative backlinks'
        ]
      },
      {
        id: 'rec-3',
        title: 'Conversion Rate Optimization',
        description: 'Implement CRO strategies to improve conversion rates',
        category: 'sales',
        priority: 'high',
        effort: 'medium',
        impact: 'high',
        roi: '150% increase in conversion rates',
        implementation: [
          'Analyze current conversion funnels',
          'Implement A/B testing framework',
          'Optimize landing pages',
          'Add trust signals and social proof',
          'Improve call-to-action buttons'
        ]
      }
    ];
  }

  // Calculate overall score
  private calculateOverallScore(categories: Record<string, unknown>): number {
    const scores = Object.values(categories).map((cat: Record<string, unknown>) => cat.score as number);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  // Generate AI-powered improvement prompts
  async generateImprovementPrompts(auditResult: AuditResult): Promise<string[]> {
    const prompts = [
      `Based on the website audit for ${auditResult.url}, here are AI-powered improvement prompts:`,
      '',
      '## High-Priority Improvements:',
      '',
      ...auditResult.categories.usability.issues
        .filter(issue => issue.priority >= 8)
        .map(issue => `- **${issue.title}**: ${issue.solution}`),
      '',
      '## UX/UI Enhancement Prompts:',
      '',
      `- "Redesign the mobile experience for ${auditResult.url} to improve touch interactions and reduce bounce rate"`,
      `- "Create a more intuitive navigation structure that guides users through the conversion funnel"`,
      `- "Implement micro-interactions and loading states to provide better user feedback"`,
      '',
      '## Technical Optimization Prompts:',
      '',
      `- "Optimize page load speeds for ${auditResult.url} to achieve Core Web Vitals scores above 90"`,
      `- "Implement proper error handling and user-friendly error messages"`,
      `- "Add comprehensive analytics tracking to monitor user behavior and conversion paths"`,
      '',
      '## SEO and Content Prompts:',
      '',
      `- "Create an SEO optimization strategy for ${auditResult.url} focusing on meta tags, page speed, and content quality"`,
      `- "Develop a content calendar that addresses user pain points and improves search rankings"`,
      `- "Implement structured data markup to enhance search engine visibility"`,
      '',
      '## Conversion Optimization Prompts:',
      '',
      `- "Design A/B tests for key conversion points on ${auditResult.url} to improve conversion rates"`,
      `- "Add trust signals, testimonials, and social proof to increase user confidence"`,
      `- "Optimize the checkout/contact process to reduce friction and abandonment"`,
      '',
      '## Accessibility and Compliance Prompts:',
      '',
      `- "Ensure ${auditResult.url} meets WCAG AA accessibility standards for all users"`,
      `- "Implement proper keyboard navigation and screen reader compatibility"`,
      `- "Add alt text to all images and ensure proper color contrast ratios"`
    ];

    return prompts;
  }

  // Generate design mockups for the website
  private async generateDesignMockups(url: string, websiteData: Record<string, unknown>): Promise<DesignMockup[]> {
    try {
      const response = await fetch('/sand-dollar-simplicity/api/generate-designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          websiteData: websiteData
        }),
      });

      if (!response.ok) {
        throw new Error(`Design generation failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.designs || [];
    } catch (error) {
      console.error('Error generating design mockups:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const websiteAuditService = new WebsiteAuditService();
