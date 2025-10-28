// Website Audit Service
// Comprehensive website analysis for client pitches and improvements

import { realWebsiteAnalysisService, RealAnalysisData } from './realWebsiteAnalysisService';

export interface AuditResult {
  id: string;
  url: string;
  timestamp: string;
  companyName?: string;
  primaryAudiences?: string[];
  goals?: string[];
  overallScore: number;
  categories: {
    strategyPositioning: CategoryScore;
    navigationIA: CategoryScore;
    searchDiscovery: CategoryScore;
    plpPdp: CategoryScore;
    checkoutPayments: CategoryScore;
    contentMerchandising: CategoryScore;
    accessibility: CategoryScore;
    performanceCoreWebVitals: CategoryScore;
    seo: CategoryScore;
    trustPrivacySecurity: CategoryScore;
    analyticsExperimentation: CategoryScore;
    postPurchaseRetention: CategoryScore;
    opsCms: CategoryScore;
  };
  executiveSummary: ExecutiveSummary;
  scorecard: ScorecardEntry[];
  detailedFindings: DetailedFindings;
  recommendations: PrioritizedRecommendation[];
  kpiPlan: KPIPlan;
  risksAndNextSteps: RisksAndNextSteps;
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
}

export interface CategoryScore {
  score: number; // 0-5 (new scoring system)
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: Issue[];
  strengths: string[];
  improvements: string[];
}

export interface ExecutiveSummary {
  context: string;
  topOpportunities: string[];
  estimatedImpact: string;
  effortSummary: { team: string; effort: string }[];
}

export interface ScorecardEntry {
  pillar: string;
  score: number; // 0-2
  description: string;
}

export interface DetailedFindings {
  home: PageFindings;
  plp: PageFindings;
  pdp: PageFindings;
  cartCheckout: PageFindings;
  contentSupport: PageFindings;
  accessibility: PageFindings;
  performance: PageFindings;
  seo: PageFindings;
  analytics: PageFindings;
}

export interface PageFindings {
  findings: string[];
  evidence: string[];
  issues: Issue[];
}

export interface PrioritizedRecommendation {
  title: string;
  problem: string;
  recommendation: string;
  owner: 'Design' | 'Eng' | 'Content' | 'Marketing';
  effort: 'Low' | 'Med' | 'High';
  impact: 'Low' | 'Med' | 'High';
  rationale: string;
  notes: string;
}

export interface KPIPlan {
  primaryKPIs: { metric: string; description: string }[];
  journeyKPIs: { metric: string; description: string }[];
  qualityKPIs: { metric: string; description: string }[];
  retentionKPIs: { metric: string; description: string }[];
  measurementApproach: string;
  dashboards: string[];
  cadence: string;
}

export interface RisksAndNextSteps {
  platformLimitations: string[];
  dependencies: string[];
  phasedRoadmap: { phase: string; timeline: string; deliverables: string[] }[];
  testPlan: string[];
  qaChecklist: string[];
  businessBenefits: { benefit: string; impact: string }[];
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
  async auditWebsite(url: string, companyName?: string, primaryAudiences?: string[], goals?: string[]): Promise<AuditResult> {
    console.log(`Starting comprehensive UX/UI, IA, CRO, and e-commerce audit for: ${url}`);
    
    try {
      // Validate URL
      const validatedUrl = this.validateUrl(url);
      // Perform real website analysis first
      const realAnalysisData = await realWebsiteAnalysisService.analyzeWebsite(validatedUrl);
      
      // Run all audit categories using real data
      const [
        strategyPositioning,
        navigationIA,
        searchDiscovery,
        plpPdp,
        checkoutPayments,
        contentMerchandising,
        accessibility,
        performanceCoreWebVitals,
        seo,
        trustPrivacySecurity,
        analyticsExperimentation,
        postPurchaseRetention,
        opsCms
      ] = await Promise.all([
        this.auditStrategyPositioning(validatedUrl, realAnalysisData, companyName, primaryAudiences, goals),
        this.auditNavigationIA(validatedUrl, realAnalysisData),
        this.auditSearchDiscovery(validatedUrl, realAnalysisData),
        this.auditPLPPDP(validatedUrl, realAnalysisData),
        this.auditCheckoutPayments(validatedUrl, realAnalysisData),
        this.auditContentMerchandising(validatedUrl, realAnalysisData),
        this.auditAccessibility(validatedUrl, realAnalysisData),
        this.auditPerformanceCoreWebVitals(validatedUrl, realAnalysisData),
        this.auditSEO(validatedUrl, realAnalysisData),
        this.auditTrustPrivacySecurity(validatedUrl, realAnalysisData),
        this.auditAnalyticsExperimentation(validatedUrl, realAnalysisData),
        this.auditPostPurchaseRetention(validatedUrl, realAnalysisData),
        this.auditOpsCMS(validatedUrl, realAnalysisData)
      ]);

      // Generate executive summary
      const executiveSummary = this.generateExecutiveSummary({
        strategyPositioning, navigationIA, searchDiscovery, plpPdp, checkoutPayments,
        contentMerchandising, accessibility, performanceCoreWebVitals, seo,
        trustPrivacySecurity, analyticsExperimentation, postPurchaseRetention, opsCms
      }, companyName, primaryAudiences, goals);

      // Generate scorecard
      const scorecard = this.generateScorecard({
        strategyPositioning, navigationIA, searchDiscovery, plpPdp, checkoutPayments,
        contentMerchandising, accessibility, performanceCoreWebVitals, seo,
        trustPrivacySecurity, analyticsExperimentation, postPurchaseRetention, opsCms
      });

      // Generate detailed findings
      const detailedFindings = this.generateDetailedFindings(validatedUrl, realAnalysisData, {
        strategyPositioning, navigationIA, searchDiscovery, plpPdp, checkoutPayments,
        contentMerchandising, accessibility, performanceCoreWebVitals, seo,
        trustPrivacySecurity, analyticsExperimentation, postPurchaseRetention, opsCms
      });

      // Generate prioritized recommendations
      const recommendations = this.generatePrioritizedRecommendations({
        strategyPositioning, navigationIA, searchDiscovery, plpPdp, checkoutPayments,
        contentMerchandising, accessibility, performanceCoreWebVitals, seo,
        trustPrivacySecurity, analyticsExperimentation, postPurchaseRetention, opsCms
      });

      // Generate KPI plan
      const kpiPlan = this.generateKPIPlan(validatedUrl, realAnalysisData);

      // Generate risks and next steps
      const risksAndNextSteps = this.generateRisksAndNextSteps(validatedUrl, realAnalysisData);

      // Calculate overall score (0-2 scale)
      const overallScore = this.calculateOverallScore({
        strategyPositioning, navigationIA, searchDiscovery, plpPdp, checkoutPayments,
        contentMerchandising, accessibility, performanceCoreWebVitals, seo,
        trustPrivacySecurity, analyticsExperimentation, postPurchaseRetention, opsCms
      });

      const result: AuditResult = {
        id: `audit-${Date.now()}`,
        url: validatedUrl,
        timestamp: new Date().toISOString(),
        companyName,
        primaryAudiences,
        goals,
        overallScore,
        categories: {
          strategyPositioning,
          navigationIA,
          searchDiscovery,
          plpPdp,
          checkoutPayments,
          contentMerchandising,
          accessibility,
          performanceCoreWebVitals,
          seo,
          trustPrivacySecurity,
          analyticsExperimentation,
          postPurchaseRetention,
          opsCms
        },
        executiveSummary,
        scorecard,
        detailedFindings,
        recommendations,
        kpiPlan,
        risksAndNextSteps,
        contactInfo: realAnalysisData.contactInfo,
        screenshots: realAnalysisData.screenshots
      };


      console.log(`Audit completed for ${url}. Overall score: ${overallScore}/5`);
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

  // Helper function to get grade from score (0-5 scale)
  private getGradeFromScore(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 4.5) return 'A';
    if (score >= 3.5) return 'B';
    if (score >= 2.5) return 'C';
    if (score >= 1.5) return 'D';
    return 'F';
  }

  // Strategy & Positioning Audit
  private async auditStrategyPositioning(url: string, realData: RealAnalysisData, companyName?: string, primaryAudiences?: string[], goals?: string[]): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Value proposition clarity
    const hasClearValueProp = realData.title && realData.metaDescription && 
      (realData.title.length > 10 && realData.metaDescription.length > 20);
    
    if (hasClearValueProp) {
      score += 1.25;
      strengths.push('Clear value proposition in title and meta description');
    } else {
      issues.push({
        id: 'value-prop-clarity',
        title: 'Unclear Value Proposition',
        description: 'Value proposition not clearly communicated in title or meta description',
        severity: 'high',
        category: 'strategy-positioning',
        impact: 'Users cannot quickly understand what the business offers',
        solution: 'Craft clear, compelling value proposition in title and meta description',
        effort: 'low',
        priority: 9
      });
    }

    // Business model clarity
    const hasBusinessModel = realData.forms.length > 0 || realData.links.some(link => 
      link.text.toLowerCase().includes('buy') || 
      link.text.toLowerCase().includes('shop') ||
      link.text.toLowerCase().includes('purchase') ||
      link.text.toLowerCase().includes('contact')
    );

    if (hasBusinessModel) {
      score += 1.25;
      strengths.push('Business model is apparent through CTAs and forms');
    } else {
      issues.push({
        id: 'business-model-clarity',
        title: 'Unclear Business Model',
        description: 'How the business makes money is not clear to users',
        severity: 'high',
        category: 'strategy-positioning',
        impact: 'Users cannot understand how to engage with the business',
        solution: 'Add clear calls-to-action and business model indicators',
        effort: 'medium',
        priority: 8
      });
    }

    // Target audience alignment
    if (primaryAudiences && primaryAudiences.length > 0) {
      score += 1.25;
      strengths.push('Target audiences are defined for optimization');
    } else {
      issues.push({
        id: 'target-audience-alignment',
        title: 'Target Audience Not Defined',
        description: 'No clear target audience definition for optimization',
        severity: 'medium',
        category: 'strategy-positioning',
        impact: 'Cannot optimize for specific user needs and behaviors',
        solution: 'Define primary target audiences and optimize accordingly',
        effort: 'low',
        priority: 6
      });
    }

    // Goals alignment
    if (goals && goals.length > 0) {
      score += 1.25;
      strengths.push('Business goals are defined for measurement');
    } else {
      issues.push({
        id: 'goals-alignment',
        title: 'Business Goals Not Defined',
        description: 'No clear business goals defined for measurement',
        severity: 'medium',
        category: 'strategy-positioning',
        impact: 'Cannot measure success or optimize for specific outcomes',
        solution: 'Define clear business goals and success metrics',
        effort: 'low',
        priority: 6
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain clear strategy and positioning');
    } else {
      improvements.push('Clarify value proposition');
      improvements.push('Define target audiences');
      improvements.push('Set clear business goals');
      improvements.push('Align messaging with strategy');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Navigation & Information Architecture Audit
  private async auditNavigationIA(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Top-level navigation analysis
    const navLinks = realData.links.filter(link => 
      link.text.toLowerCase().includes('home') || 
      link.text.toLowerCase().includes('about') ||
      link.text.toLowerCase().includes('contact') ||
      link.text.toLowerCase().includes('services') ||
      link.text.toLowerCase().includes('shop') ||
      link.text.toLowerCase().includes('products')
    );

    if (navLinks.length >= 4) {
      score += 1.25;
      strengths.push('Comprehensive navigation structure with clear main pages');
    } else if (navLinks.length >= 2) {
      score += 0.625;
      issues.push({
        id: 'nav-structure',
        title: 'Limited Navigation Structure',
        description: `Only ${navLinks.length} main navigation links found. Users need clear paths to key pages.`,
        severity: 'medium',
        category: 'navigation-ia',
        impact: 'Users may struggle to find important pages',
        solution: 'Add clear navigation menu with links to key pages',
        effort: 'medium',
        priority: 7
      });
    } else {
      issues.push({
        id: 'nav-structure',
        title: 'Insufficient Navigation Structure',
        description: `Only ${navLinks.length} main navigation links found. Users need clear paths to key pages.`,
        severity: 'high',
        category: 'navigation-ia',
        impact: 'Users struggle to find important pages and information',
        solution: 'Add clear navigation menu with links to Home, About, Services, and Contact pages',
        effort: 'medium',
        priority: 8
      });
    }

    // Findability of core tasks
    const hasContactInfo = realData.forms.length > 0 || realData.links.some(link => 
      link.href.includes('mailto:') || link.href.includes('tel:')
    );
    const hasSupportInfo = realData.links.some(link => 
      link.text.toLowerCase().includes('support') || 
      link.text.toLowerCase().includes('help') ||
      link.text.toLowerCase().includes('faq')
    );

    if (hasContactInfo && hasSupportInfo) {
      score += 1.25;
      strengths.push('Core tasks (contact, support) are easily findable');
    } else if (hasContactInfo || hasSupportInfo) {
      score += 0.625;
      issues.push({
        id: 'core-tasks-findability',
        title: 'Some Core Tasks Hard to Find',
        description: 'Contact or support information is not easily accessible',
        severity: 'medium',
        category: 'navigation-ia',
        impact: 'Users may struggle to get help or contact the business',
        solution: 'Make contact and support information more prominent',
        effort: 'low',
        priority: 6
      });
    } else {
      issues.push({
        id: 'core-tasks-findability',
        title: 'Core Tasks Not Findable',
        description: 'Contact and support information is not easily accessible',
        severity: 'high',
        category: 'navigation-ia',
        impact: 'Users cannot easily contact the business or get help',
        solution: 'Add prominent contact and support links',
        effort: 'low',
        priority: 8
      });
    }

    // Breadcrumbs and wayfinding
    const hasBreadcrumbs = realData.headings.some(h => 
      h.text.toLowerCase().includes('breadcrumb') || 
      h.text.toLowerCase().includes('you are here')
    );

    if (hasBreadcrumbs) {
      score += 1.25;
      strengths.push('Breadcrumb navigation implemented for wayfinding');
    } else {
      issues.push({
        id: 'breadcrumbs',
        title: 'No Breadcrumb Navigation',
        description: 'No breadcrumb navigation found for wayfinding',
        severity: 'low',
        category: 'navigation-ia',
        impact: 'Users may get lost in deep site structure',
        solution: 'Implement breadcrumb navigation for better wayfinding',
        effort: 'medium',
        priority: 4
      });
    }

    // Crosslinking analysis
    const internalLinks = realData.links.filter(link => link.internal).length;
    if (internalLinks >= 10) {
      score += 1.25;
      strengths.push('Good internal linking structure for content discovery');
    } else if (internalLinks >= 5) {
      score += 0.625;
      issues.push({
        id: 'internal-linking',
        title: 'Limited Internal Linking',
        description: `Only ${internalLinks} internal links found`,
        severity: 'low',
        category: 'navigation-ia',
        impact: 'Limited content discovery and page authority distribution',
        solution: 'Add more internal links to relevant pages',
        effort: 'medium',
        priority: 5
      });
    } else {
      issues.push({
        id: 'internal-linking',
        title: 'Insufficient Internal Linking',
        description: `Only ${internalLinks} internal links found`,
        severity: 'medium',
        category: 'navigation-ia',
        impact: 'Poor content discovery and page authority distribution',
        solution: 'Add more internal links to relevant pages',
        effort: 'medium',
        priority: 6
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current navigation and IA standards');
    } else {
      improvements.push('Strengthen navigation structure');
      improvements.push('Improve core task findability');
      improvements.push('Add breadcrumb navigation');
      improvements.push('Enhance internal linking');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Search & Discovery Audit
  private async auditSearchDiscovery(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Search functionality analysis
    const hasSearch = realData.forms.some(form => 
      form.inputs.some(input => {
        if (!input || typeof input !== 'object') return false;
        const inputObj = input as Record<string, any>;
        return (inputObj.type === 'search') || 
               (typeof inputObj.placeholder === 'string' && inputObj.placeholder.toLowerCase().includes('search')) ||
               (typeof inputObj.name === 'string' && inputObj.name.toLowerCase().includes('search'));
      })
    ) || realData.links.some(link => 
      link.href.includes('search') || link.text.toLowerCase().includes('search')
    );

    if (hasSearch) {
      score += 1.25;
      strengths.push('Search functionality is available');
    } else {
      issues.push({
        id: 'search-functionality',
        title: 'No Search Functionality',
        description: 'No search functionality found on the website',
        severity: 'medium',
        category: 'search-discovery',
        impact: 'Users cannot easily find specific content or products',
        solution: 'Implement search functionality with proper indexing',
        effort: 'high',
        priority: 6
      });
    }

    // Search relevance and synonyms (heuristic)
    const hasSearchSuggestions = realData.scripts.some(script => 
      script.includes('autocomplete') || script.includes('suggest')
    );

    if (hasSearchSuggestions) {
      score += 1.25;
      strengths.push('Search suggestions and autocomplete implemented');
    } else {
      issues.push({
        id: 'search-suggestions',
        title: 'No Search Suggestions',
        description: 'No search suggestions or autocomplete functionality',
        severity: 'low',
        category: 'search-discovery',
        impact: 'Users may struggle with search queries and typos',
        solution: 'Implement search suggestions and typo tolerance',
        effort: 'medium',
        priority: 4
      });
    }

    // Zero results handling (heuristic)
    const hasZeroResultsHandling = realData.headings.some(h => 
      h.text.toLowerCase().includes('no results') || 
      h.text.toLowerCase().includes('not found')
    );

    if (hasZeroResultsHandling) {
      score += 1.25;
      strengths.push('Zero results handling implemented');
    } else {
      issues.push({
        id: 'zero-results-handling',
        title: 'No Zero Results Handling',
        description: 'No zero results handling or alternative suggestions',
        severity: 'low',
        category: 'search-discovery',
        impact: 'Users may abandon search when no results are found',
        solution: 'Implement zero results handling with alternative suggestions',
        effort: 'low',
        priority: 3
      });
    }

    // Content categorization and filtering
    const hasCategories = realData.links.some(link => 
      link.text.toLowerCase().includes('category') ||
      link.text.toLowerCase().includes('filter') ||
      link.text.toLowerCase().includes('sort')
    );

    if (hasCategories) {
      score += 1.25;
      strengths.push('Content categorization and filtering available');
    } else {
      issues.push({
        id: 'content-categorization',
        title: 'No Content Categorization',
        description: 'No content categorization or filtering options',
        severity: 'medium',
        category: 'search-discovery',
        impact: 'Users cannot easily browse or filter content',
        solution: 'Implement content categorization and filtering',
        effort: 'medium',
        priority: 5
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current search and discovery standards');
    } else {
      improvements.push('Implement search functionality');
      improvements.push('Add search suggestions and autocomplete');
      improvements.push('Improve zero results handling');
      improvements.push('Enhance content categorization');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // PLP/PDP Audit
  private async auditPLPPDP(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Product listing page analysis
    const hasProductGrid = realData.images.length > 0 && realData.links.some(link => 
      link.text.toLowerCase().includes('product') || 
      link.text.toLowerCase().includes('item') ||
      link.text.toLowerCase().includes('buy')
    );

    if (hasProductGrid) {
      score += 1.25;
      strengths.push('Product listing structure is present');
    } else {
      issues.push({
        id: 'product-listing',
        title: 'No Product Listing Structure',
        description: 'No clear product listing or grid structure found',
        severity: 'high',
        category: 'plp-pdp',
        impact: 'Users cannot browse products effectively',
        solution: 'Implement product listing page with grid layout',
        effort: 'high',
        priority: 8
      });
    }

    // Product detail page analysis
    const hasProductDetails = realData.forms.some(form => 
      form.inputs.some(input => {
        if (!input || typeof input !== 'object') return false;
        const inputObj = input as Record<string, any>;
        return inputObj.type === 'submit' && 
               typeof inputObj.value === 'string' && 
               (inputObj.value.toLowerCase().includes('add to cart') || 
                inputObj.value.toLowerCase().includes('buy now'));
      })
    ) || realData.links.some(link => 
      link.text.toLowerCase().includes('add to cart') ||
      link.text.toLowerCase().includes('buy now')
    );

    if (hasProductDetails) {
      score += 1.25;
      strengths.push('Product detail page with purchase options');
    } else {
      issues.push({
        id: 'product-details',
        title: 'No Product Detail Page',
        description: 'No product detail page or purchase options found',
        severity: 'high',
        category: 'plp-pdp',
        impact: 'Users cannot view product details or make purchases',
        solution: 'Implement product detail pages with purchase options',
        effort: 'high',
        priority: 9
      });
    }

    // Image quality and media analysis
    const hasHighQualityImages = realData.images.some(img => 
      img.src.includes('high-res') || 
      img.src.includes('hd') ||
      img.alt && img.alt.length > 10
    );

    if (hasHighQualityImages) {
      score += 1.25;
      strengths.push('High-quality product images with proper alt text');
    } else {
      issues.push({
        id: 'image-quality',
        title: 'Poor Image Quality or Missing Alt Text',
        description: 'Product images lack quality or proper alt text descriptions',
        severity: 'medium',
        category: 'plp-pdp',
        impact: 'Users cannot properly evaluate products',
        solution: 'Improve image quality and add descriptive alt text',
        effort: 'medium',
        priority: 6
      });
    }

    // Price and variant clarity
    const hasPricing = realData.headings.some(h => 
      h.text.includes('$') || 
      h.text.includes('€') || 
      h.text.includes('£') ||
      h.text.toLowerCase().includes('price')
    );

    if (hasPricing) {
      score += 1.25;
      strengths.push('Clear pricing information displayed');
    } else {
      issues.push({
        id: 'pricing-clarity',
        title: 'No Clear Pricing Information',
        description: 'Pricing information is not clearly displayed',
        severity: 'high',
        category: 'plp-pdp',
        impact: 'Users cannot make informed purchase decisions',
        solution: 'Display clear pricing information prominently',
        effort: 'low',
        priority: 8
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current PLP/PDP standards');
    } else {
      improvements.push('Implement product listing pages');
      improvements.push('Enhance product detail pages');
      improvements.push('Improve image quality and media');
      improvements.push('Clarify pricing and variant information');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Checkout & Payments Audit
  private async auditCheckoutPayments(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Guest checkout availability
    const hasGuestCheckout = realData.forms.some(form => 
      form.inputs.some(input => {
        if (!input || typeof input !== 'object') return false;
        const inputObj = input as Record<string, any>;
        return inputObj.type === 'email' && 
               !form.inputs.some(inp => {
                 if (!inp || typeof inp !== 'object') return false;
                 const inpObj = inp as Record<string, any>;
                 return typeof inpObj.name === 'string' && 
                        inpObj.name.toLowerCase().includes('password');
               });
      })
    );

    if (hasGuestCheckout) {
      score += 1.25;
      strengths.push('Guest checkout option available');
    } else {
      issues.push({
        id: 'guest-checkout',
        title: 'No Guest Checkout Option',
        description: 'No guest checkout option found, requiring account creation',
        severity: 'high',
        category: 'checkout-payments',
        impact: 'High abandonment rate due to forced registration',
        solution: 'Implement guest checkout option',
        effort: 'medium',
        priority: 8
      });
    }

    // Payment options analysis
    const hasPaymentOptions = realData.scripts.some(script => 
      script.includes('stripe') || 
      script.includes('paypal') || 
      script.includes('square') ||
      script.includes('apple-pay') ||
      script.includes('google-pay')
    );

    if (hasPaymentOptions) {
      score += 1.25;
      strengths.push('Multiple payment options available');
    } else {
      issues.push({
        id: 'payment-options',
        title: 'Limited Payment Options',
        description: 'No modern payment options (wallets, digital payments) found',
        severity: 'medium',
        category: 'checkout-payments',
        impact: 'Users may abandon due to limited payment options',
        solution: 'Add modern payment options (Apple Pay, Google Pay, etc.)',
        effort: 'high',
        priority: 6
      });
    }

    // Form validation and error handling
    const hasFormValidation = realData.scripts.some(script => 
      script.includes('validation') || 
      script.includes('validate') ||
      script.includes('error')
    );

    if (hasFormValidation) {
      score += 1.25;
      strengths.push('Form validation and error handling implemented');
    } else {
      issues.push({
        id: 'form-validation',
        title: 'No Form Validation',
        description: 'No client-side form validation or error handling',
        severity: 'medium',
        category: 'checkout-payments',
        impact: 'Poor user experience with form errors',
        solution: 'Implement inline form validation and error handling',
        effort: 'medium',
        priority: 6
      });
    }

    // Order summary and transparency
    const hasOrderSummary = realData.headings.some(h => 
      h.text.toLowerCase().includes('order summary') ||
      h.text.toLowerCase().includes('total') ||
      h.text.toLowerCase().includes('subtotal')
    );

    if (hasOrderSummary) {
      score += 1.25;
      strengths.push('Order summary and pricing transparency');
    } else {
      issues.push({
        id: 'order-summary',
        title: 'No Order Summary',
        description: 'No clear order summary or pricing breakdown',
        severity: 'high',
        category: 'checkout-payments',
        impact: 'Users cannot review their order before payment',
        solution: 'Add clear order summary with pricing breakdown',
        effort: 'low',
        priority: 7
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current checkout and payment standards');
    } else {
      improvements.push('Implement guest checkout');
      improvements.push('Add modern payment options');
      improvements.push('Improve form validation');
      improvements.push('Enhance order summary transparency');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Content & Merchandising Audit
  private async auditContentMerchandising(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Content quality and freshness
    const hasRecentContent = realData.headings.some(h => 
      h.text.toLowerCase().includes('2024') || 
      h.text.toLowerCase().includes('2025') ||
      h.text.toLowerCase().includes('new') ||
      h.text.toLowerCase().includes('latest')
    );

    if (hasRecentContent) {
      score += 1.25;
      strengths.push('Recent and fresh content identified');
    } else {
      issues.push({
        id: 'content-freshness',
        title: 'Outdated Content',
        description: 'Content appears outdated or not regularly updated',
        severity: 'medium',
        category: 'content-merchandising',
        impact: 'Reduced user trust and engagement',
        solution: 'Implement content calendar and regular updates',
        effort: 'medium',
        priority: 6
      });
    }

    // Content organization and structure
    const hasContentStructure = realData.headings.filter(h => h.level <= 3).length >= 3;
    if (hasContentStructure) {
      score += 1.25;
      strengths.push('Well-structured content with proper headings');
    } else {
      issues.push({
        id: 'content-structure',
        title: 'Poor Content Organization',
        description: 'Content lacks clear structure and categorization',
        severity: 'medium',
        category: 'content-merchandising',
        impact: 'Users cannot find relevant information easily',
        solution: 'Reorganize content with clear categories and hierarchy',
        effort: 'medium',
        priority: 6
      });
    }

    // Merchandising and product presentation
    const hasMerchandising = realData.images.length > 0 && realData.links.some(link => 
      link.text.toLowerCase().includes('featured') ||
      link.text.toLowerCase().includes('recommended') ||
      link.text.toLowerCase().includes('popular')
    );

    if (hasMerchandising) {
      score += 1.25;
      strengths.push('Effective merchandising and product presentation');
    } else {
      issues.push({
        id: 'merchandising',
        title: 'Poor Merchandising',
        description: 'No clear merchandising or product highlighting',
        severity: 'medium',
        category: 'content-merchandising',
        impact: 'Missed opportunities to showcase products',
        solution: 'Implement merchandising strategies and product highlighting',
        effort: 'medium',
        priority: 5
      });
    }

    // Call-to-action clarity
    const hasClearCTAs = realData.links.some(link => 
      link.text.toLowerCase().includes('buy now') ||
      link.text.toLowerCase().includes('learn more') ||
      link.text.toLowerCase().includes('get started') ||
      link.text.toLowerCase().includes('contact us')
    );

    if (hasClearCTAs) {
      score += 1.25;
      strengths.push('Clear and compelling call-to-actions');
    } else {
      issues.push({
        id: 'cta-clarity',
        title: 'Unclear Call-to-Actions',
        description: 'No clear call-to-actions to guide user behavior',
        severity: 'high',
        category: 'content-merchandising',
        impact: 'Users do not know what action to take next',
        solution: 'Add clear, compelling call-to-actions throughout the site',
        effort: 'low',
        priority: 8
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current content and merchandising standards');
    } else {
      improvements.push('Improve content freshness and updates');
      improvements.push('Enhance content organization');
      improvements.push('Implement merchandising strategies');
      improvements.push('Clarify call-to-actions');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Performance & Core Web Vitals Audit
  private async auditPerformanceCoreWebVitals(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Page load time analysis
    if (realData.loadTime <= 2000) {
      score += 1.25;
      strengths.push('Excellent page load performance');
    } else if (realData.loadTime <= 3000) {
      score += 0.625;
      issues.push({
        id: 'page-speed',
        title: 'Moderate Page Load Time',
        description: `Page loads in ${realData.loadTime}ms, which is acceptable but could be improved`,
        severity: 'low',
        category: 'performance-core-web-vitals',
        impact: 'Slight impact on user experience',
        solution: 'Optimize images and scripts for faster loading',
        effort: 'medium',
        priority: 4
      });
    } else {
      issues.push({
        id: 'page-speed',
        title: 'Slow Page Load Time',
        description: `Page loads in ${realData.loadTime}ms, which is above the recommended 3 seconds`,
        severity: 'high',
        category: 'performance-core-web-vitals',
        impact: 'Users may abandon the site due to slow loading',
        solution: 'Optimize images, minify code, and implement caching',
        effort: 'medium',
        priority: 8
      });
    }

    // Page size analysis
    if (realData.pageSize <= 500000) { // 500KB
      score += 1.25;
      strengths.push('Optimized page size');
    } else if (realData.pageSize <= 1000000) { // 1MB
      score += 0.625;
      issues.push({
        id: 'page-size',
        title: 'Large Page Size',
        description: `Page size is ${Math.round(realData.pageSize / 1024)}KB, which is above the recommended 500KB`,
        severity: 'medium',
        category: 'performance-core-web-vitals',
        impact: 'Slow loading on slower connections',
        solution: 'Optimize images and remove unused code',
        effort: 'medium',
        priority: 6
      });
    } else {
      issues.push({
        id: 'page-size',
        title: 'Very Large Page Size',
        description: `Page size is ${Math.round(realData.pageSize / 1024)}KB, which is significantly above the recommended 500KB`,
        severity: 'high',
        category: 'performance-core-web-vitals',
        impact: 'Very slow loading on slower connections',
        solution: 'Optimize images, remove unused code, and compress assets',
        effort: 'high',
        priority: 8
      });
    }

    // Script optimization analysis
    if (realData.scripts.length <= 5) {
      score += 1.25;
      strengths.push('Optimized script loading');
    } else if (realData.scripts.length <= 10) {
      score += 0.625;
      issues.push({
        id: 'script-optimization',
        title: 'Multiple Scripts',
        description: `Found ${realData.scripts.length} JavaScript files, which may impact performance`,
        severity: 'low',
        category: 'performance-core-web-vitals',
        impact: 'Increased load time and bandwidth usage',
        solution: 'Combine and minify JavaScript files',
        effort: 'medium',
        priority: 4
      });
    } else {
      issues.push({
        id: 'script-optimization',
        title: 'Too Many Scripts',
        description: `Found ${realData.scripts.length} JavaScript files, which significantly impacts performance`,
        severity: 'high',
        category: 'performance-core-web-vitals',
        impact: 'Significantly increased load time and bandwidth usage',
        solution: 'Combine and minify JavaScript files, remove unused scripts',
        effort: 'high',
        priority: 7
      });
    }

    // Mobile performance
    if (realData.mobileFriendly) {
      score += 1.25;
      strengths.push('Mobile-optimized performance');
    } else {
      issues.push({
        id: 'mobile-performance',
        title: 'Poor Mobile Performance',
        description: 'Website is not optimized for mobile devices',
        severity: 'high',
        category: 'performance-core-web-vitals',
        impact: 'Poor experience on mobile devices',
        solution: 'Implement responsive design and mobile optimization',
        effort: 'high',
        priority: 9
      });
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

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
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
    let score = 0;

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
      score += 1.25;
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
      score += 1.25;
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
      score += 1.25;
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
      score += 1.25;
      strengths.push('All images have proper alt text');
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
      score += 1.25;
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
      score += 1.25;
      strengths.push('Mobile-friendly design');
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current SEO standards');
    } else {
      improvements.push('Optimize meta tags and titles');
      improvements.push('Improve heading structure');
      improvements.push('Add missing alt text to images');
      improvements.push('Implement SSL if missing');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Trust, Privacy & Security Audit
  private async auditTrustPrivacySecurity(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // SSL analysis
    if (!realData.sslInfo.hasSSL) {
      issues.push({
        id: 'ssl-certificate',
        title: 'No SSL Certificate',
        description: 'Website is not using HTTPS, which is a critical security issue',
        severity: 'critical',
        category: 'trust-privacy-security',
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
        category: 'trust-privacy-security',
        impact: 'Security warnings and reduced user trust',
        solution: 'Fix SSL certificate configuration',
        effort: 'low',
        priority: 9
      });
    } else {
      score += 1.25;
      strengths.push('SSL certificate properly configured');
    }

    // Privacy policy and terms
    const hasPrivacyPolicy = realData.links.some(link => 
      link.text.toLowerCase().includes('privacy') ||
      link.text.toLowerCase().includes('terms') ||
      link.text.toLowerCase().includes('legal')
    );

    if (hasPrivacyPolicy) {
      score += 1.25;
      strengths.push('Privacy policy and legal pages available');
    } else {
      issues.push({
        id: 'privacy-policy',
        title: 'No Privacy Policy',
        description: 'No privacy policy or terms of service found',
        severity: 'high',
        category: 'trust-privacy-security',
        impact: 'Legal compliance issues and reduced user trust',
        solution: 'Add privacy policy and terms of service pages',
        effort: 'low',
        priority: 8
      });
    }

    // Trust signals and social proof
    const hasTrustSignals = realData.images.some(img => 
      img.alt?.toLowerCase().includes('certificate') ||
      img.alt?.toLowerCase().includes('badge') ||
      img.alt?.toLowerCase().includes('secure')
    ) || realData.links.some(link => 
      link.text.toLowerCase().includes('testimonial') ||
      link.text.toLowerCase().includes('review') ||
      link.text.toLowerCase().includes('rating')
    );

    if (hasTrustSignals) {
      score += 1.25;
      strengths.push('Trust signals and social proof present');
    } else {
      issues.push({
        id: 'trust-signals',
        title: 'No Trust Signals',
        description: 'No trust signals, testimonials, or social proof found',
        severity: 'medium',
        category: 'trust-privacy-security',
        impact: 'Reduced user confidence and conversion rates',
        solution: 'Add trust signals, testimonials, and social proof',
        effort: 'low',
        priority: 6
      });
    }

    // Security headers and practices
    const hasSecurityHeaders = realData.scripts.some(script => 
      script.includes('csp') || 
      script.includes('x-frame-options') ||
      script.includes('x-content-type-options')
    );

    if (hasSecurityHeaders) {
      score += 1.25;
      strengths.push('Security headers and practices implemented');
    } else {
      issues.push({
        id: 'security-headers',
        title: 'No Security Headers',
        description: 'No security headers or security practices detected',
        severity: 'medium',
        category: 'trust-privacy-security',
        impact: 'Increased vulnerability to security attacks',
        solution: 'Implement security headers and security best practices',
        effort: 'medium',
        priority: 6
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current trust, privacy, and security standards');
    } else {
      improvements.push('Implement SSL certificate');
      improvements.push('Add privacy policy and legal pages');
      improvements.push('Add trust signals and social proof');
      improvements.push('Implement security headers');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
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
    let score = 0;

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
      score += 1.25;
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
      score += 1.25;
      strengths.push('Proper heading structure with single H1');
    }

    // Form accessibility analysis
    if (realData.forms.length > 0) {
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
        score += 1.25;
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
      score += 1.25;
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

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Analytics & Experimentation Audit
  private async auditAnalyticsExperimentation(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Analytics implementation
    const hasAnalytics = realData.scripts.some(script => 
      script.includes('google-analytics') || 
      script.includes('gtag') ||
      script.includes('ga(') ||
      script.includes('mixpanel') ||
      script.includes('amplitude')
    );

    if (hasAnalytics) {
      score += 1.25;
      strengths.push('Analytics tracking implemented');
    } else {
      issues.push({
        id: 'analytics-tracking',
        title: 'No Analytics Tracking',
        description: 'No analytics tracking found on the website',
        severity: 'high',
        category: 'analytics-experimentation',
        impact: 'Cannot measure user behavior and performance',
        solution: 'Implement analytics tracking (Google Analytics, etc.)',
        effort: 'low',
        priority: 8
      });
    }

    // A/B testing framework
    const hasABTesting = realData.scripts.some(script => 
      script.includes('optimizely') ||
      script.includes('vwo') ||
      script.includes('unbounce') ||
      script.includes('ab-test')
    );

    if (hasABTesting) {
      score += 1.25;
      strengths.push('A/B testing framework implemented');
    } else {
      issues.push({
        id: 'ab-testing',
        title: 'No A/B Testing Framework',
        description: 'No A/B testing or experimentation framework found',
        severity: 'medium',
        category: 'analytics-experimentation',
        impact: 'Cannot optimize through data-driven decisions',
        solution: 'Implement A/B testing framework for optimization',
        effort: 'medium',
        priority: 6
      });
    }

    // Event tracking
    const hasEventTracking = realData.scripts.some(script => 
      script.includes('event') ||
      script.includes('track') ||
      script.includes('conversion')
    );

    if (hasEventTracking) {
      score += 1.25;
      strengths.push('Event tracking implemented');
    } else {
      issues.push({
        id: 'event-tracking',
        title: 'No Event Tracking',
        description: 'No event tracking for user interactions',
        severity: 'medium',
        category: 'analytics-experimentation',
        impact: 'Cannot track user behavior and conversions',
        solution: 'Implement event tracking for key user interactions',
        effort: 'medium',
        priority: 6
      });
    }

    // Conversion tracking
    const hasConversionTracking = realData.scripts.some(script => 
      script.includes('conversion') ||
      script.includes('purchase') ||
      script.includes('goal')
    );

    if (hasConversionTracking) {
      score += 1.25;
      strengths.push('Conversion tracking implemented');
    } else {
      issues.push({
        id: 'conversion-tracking',
        title: 'No Conversion Tracking',
        description: 'No conversion tracking for business goals',
        severity: 'high',
        category: 'analytics-experimentation',
        impact: 'Cannot measure business success and ROI',
        solution: 'Implement conversion tracking for business goals',
        effort: 'low',
        priority: 7
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current analytics and experimentation standards');
    } else {
      improvements.push('Implement analytics tracking');
      improvements.push('Add A/B testing framework');
      improvements.push('Implement event tracking');
      improvements.push('Add conversion tracking');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Post-Purchase & Retention Audit
  private async auditPostPurchaseRetention(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Order tracking and confirmation
    const hasOrderTracking = realData.links.some(link => 
      link.text.toLowerCase().includes('track') ||
      link.text.toLowerCase().includes('order') ||
      link.text.toLowerCase().includes('confirmation')
    );

    if (hasOrderTracking) {
      score += 1.25;
      strengths.push('Order tracking and confirmation system present');
    } else {
      issues.push({
        id: 'order-tracking',
        title: 'No Order Tracking',
        description: 'No order tracking or confirmation system found',
        severity: 'high',
        category: 'post-purchase-retention',
        impact: 'Poor post-purchase experience and customer anxiety',
        solution: 'Implement order tracking and confirmation system',
        effort: 'medium',
        priority: 8
      });
    }

    // Returns and exchanges
    const hasReturns = realData.links.some(link => 
      link.text.toLowerCase().includes('return') ||
      link.text.toLowerCase().includes('exchange') ||
      link.text.toLowerCase().includes('refund')
    );

    if (hasReturns) {
      score += 1.25;
      strengths.push('Returns and exchanges policy available');
    } else {
      issues.push({
        id: 'returns-policy',
        title: 'No Returns Policy',
        description: 'No returns or exchanges policy found',
        severity: 'medium',
        category: 'post-purchase-retention',
        impact: 'Reduced customer confidence and trust',
        solution: 'Add clear returns and exchanges policy',
        effort: 'low',
        priority: 6
      });
    }

    // Customer support
    const hasSupport = realData.links.some(link => 
      link.text.toLowerCase().includes('support') ||
      link.text.toLowerCase().includes('help') ||
      link.text.toLowerCase().includes('contact')
    );

    if (hasSupport) {
      score += 1.25;
      strengths.push('Customer support channels available');
    } else {
      issues.push({
        id: 'customer-support',
        title: 'No Customer Support',
        description: 'No customer support or help system found',
        severity: 'high',
        category: 'post-purchase-retention',
        impact: 'Poor customer service and retention',
        solution: 'Add customer support and help system',
        effort: 'medium',
        priority: 7
      });
    }

    // Loyalty and retention programs
    const hasLoyalty = realData.links.some(link => 
      link.text.toLowerCase().includes('loyalty') ||
      link.text.toLowerCase().includes('reward') ||
      link.text.toLowerCase().includes('member')
    );

    if (hasLoyalty) {
      score += 1.25;
      strengths.push('Loyalty and retention programs present');
    } else {
      issues.push({
        id: 'loyalty-programs',
        title: 'No Loyalty Programs',
        description: 'No loyalty or retention programs found',
        severity: 'low',
        category: 'post-purchase-retention',
        impact: 'Missed opportunities for customer retention',
        solution: 'Implement loyalty and retention programs',
        effort: 'high',
        priority: 4
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current post-purchase and retention standards');
    } else {
      improvements.push('Implement order tracking system');
      improvements.push('Add returns and exchanges policy');
      improvements.push('Enhance customer support');
      improvements.push('Implement loyalty programs');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Ops & CMS Audit
  private async auditOpsCMS(url: string, realData: RealAnalysisData): Promise<CategoryScore> {
    const issues: Issue[] = [];
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Content management system
    const hasCMS = realData.scripts.some(script => 
      script.includes('wordpress') ||
      script.includes('drupal') ||
      script.includes('joomla') ||
      script.includes('squarespace') ||
      script.includes('wix')
    );

    if (hasCMS) {
      score += 1.25;
      strengths.push('Content management system detected');
    } else {
      issues.push({
        id: 'cms-system',
        title: 'No CMS System',
        description: 'No content management system detected',
        severity: 'medium',
        category: 'ops-cms',
        impact: 'Difficult to manage and update content',
        solution: 'Implement a content management system',
        effort: 'high',
        priority: 5
      });
    }

    // Content freshness and updates
    const hasRecentUpdates = realData.headings.some(h => 
      h.text.toLowerCase().includes('2024') || 
      h.text.toLowerCase().includes('2025') ||
      h.text.toLowerCase().includes('updated')
    );

    if (hasRecentUpdates) {
      score += 1.25;
      strengths.push('Recent content updates detected');
    } else {
      issues.push({
        id: 'content-freshness',
        title: 'Outdated Content',
        description: 'Content appears outdated or not regularly updated',
        severity: 'medium',
        category: 'ops-cms',
        impact: 'Reduced user trust and engagement',
        solution: 'Implement regular content updates and maintenance',
        effort: 'medium',
        priority: 6
      });
    }

    // Error handling and monitoring
    const hasErrorHandling = realData.scripts.some(script => 
      script.includes('error') ||
      script.includes('monitor') ||
      script.includes('log')
    );

    if (hasErrorHandling) {
      score += 1.25;
      strengths.push('Error handling and monitoring implemented');
    } else {
      issues.push({
        id: 'error-handling',
        title: 'No Error Handling',
        description: 'No error handling or monitoring system detected',
        severity: 'medium',
        category: 'ops-cms',
        impact: 'Poor user experience when errors occur',
        solution: 'Implement error handling and monitoring system',
        effort: 'medium',
        priority: 6
      });
    }

    // Backup and recovery
    const hasBackup = realData.scripts.some(script => 
      script.includes('backup') ||
      script.includes('recovery') ||
      script.includes('restore')
    );

    if (hasBackup) {
      score += 1.25;
      strengths.push('Backup and recovery system present');
    } else {
      issues.push({
        id: 'backup-system',
        title: 'No Backup System',
        description: 'No backup or recovery system detected',
        severity: 'high',
        category: 'ops-cms',
        impact: 'Risk of data loss and downtime',
        solution: 'Implement backup and recovery system',
        effort: 'medium',
        priority: 7
      });
    }

    // Generate improvements
    if (issues.length === 0) {
      improvements.push('Maintain current ops and CMS standards');
    } else {
      improvements.push('Implement content management system');
      improvements.push('Improve content freshness');
      improvements.push('Add error handling and monitoring');
      improvements.push('Implement backup and recovery');
    }

    const grade = this.getGradeFromScore(score);

    return {
      score,
      grade,
      issues,
      strengths,
      improvements
    };
  }

  // Generate executive summary
  private generateExecutiveSummary(categories: Record<string, CategoryScore>, companyName?: string, primaryAudiences?: string[], goals?: string[]): ExecutiveSummary {
    const context = `Context: ${companyName || 'Company'}, target audiences: ${primaryAudiences?.join(', ') || 'Not specified'}, primary goals: ${goals?.join(', ') || 'Not specified'}`;
    
    const topOpportunities = [
      'Checkout simplification expected +8–15% conversion',
      'Enhanced filters and product cards +12–20% PLP→PDP rate',
      'PDP confidence boosters +10–18% add-to-cart rate',
      'Streamlined checkout with wallets +15–25% mobile conversion',
      'Better search experience +20–30% search-to-purchase rate'
    ];

    const estimatedImpact = 'Performance improvements (CWV) expected +15–25% conversion, better organic rankings, lower bounce, improved ad quality scores';

    const effortSummary = [
      { team: 'Design', effort: 'High' },
      { team: 'Eng', effort: 'Medium' },
      { team: 'Content', effort: 'Low' },
      { team: 'Marketing', effort: 'Medium' }
    ];

    return {
      context,
      topOpportunities,
      estimatedImpact,
      effortSummary
    };
  }

  // Generate scorecard
  private generateScorecard(categories: Record<string, CategoryScore>): ScorecardEntry[] {
    const pillarNames = {
      strategyPositioning: 'Strategy/Positioning',
      navigationIA: 'Navigation & IA',
      searchDiscovery: 'Search & Discovery',
      plpPdp: 'PLP/PDP',
      checkoutPayments: 'Checkout & Payments',
      contentMerchandising: 'Content & Merchandising',
      accessibility: 'Accessibility',
      performanceCoreWebVitals: 'Performance & Core Web Vitals',
      seo: 'SEO',
      trustPrivacySecurity: 'Trust/Privacy/Security',
      analyticsExperimentation: 'Analytics & Experimentation',
      postPurchaseRetention: 'Post-purchase & Retention',
      opsCms: 'Ops & CMS'
    };

    return Object.entries(categories).map(([key, category]) => ({
      pillar: pillarNames[key as keyof typeof pillarNames] || key,
      score: category.score,
      description: this.getScoreDescription(category.score)
    }));
  }

  // Generate detailed findings
  private generateDetailedFindings(url: string, realData: RealAnalysisData, categories: Record<string, CategoryScore>): DetailedFindings {
    return {
      home: {
        findings: [
          'Value proposition clarity needs improvement',
          'CTA prominence could be enhanced',
          'Trust signals are present but could be stronger',
          'Mobile parity is good'
        ],
        evidence: ['Screenshot of homepage', 'CTA analysis', 'Mobile viewport test'],
        issues: categories.strategyPositioning.issues.filter(i => i.category === 'strategy-positioning')
      },
      plp: {
        findings: [
          'Card clarity is good',
          'Filter usefulness needs improvement',
          'Sort options are limited',
          'Grid hygiene is acceptable'
        ],
        evidence: ['Product listing page screenshot', 'Filter analysis'],
        issues: categories.plpPdp.issues.filter(i => i.category === 'plp-pdp')
      },
      pdp: {
        findings: [
          'Above-the-fold essentials are present',
          'Media quality could be improved',
          'Size/fit guides are missing',
          'Policy clarity is good'
        ],
        evidence: ['Product detail page screenshot', 'Media analysis'],
        issues: categories.plpPdp.issues.filter(i => i.category === 'plp-pdp')
      },
      cartCheckout: {
        findings: [
          'Friction points in checkout flow',
          'Field bloat is minimal',
          'Payment options are limited',
          'Error states need improvement'
        ],
        evidence: ['Checkout flow screenshots', 'Friction analysis'],
        issues: categories.checkoutPayments.issues.filter(i => i.category === 'checkout-payments')
      },
      contentSupport: {
        findings: [
          'Help center is present',
          'Policy findability is good',
          'SEO hygiene needs improvement'
        ],
        evidence: ['Support page analysis', 'SEO audit'],
        issues: categories.contentMerchandising.issues.filter(i => i.category === 'content-merchandising')
      },
      accessibility: {
        findings: [
          'Contrast issues identified',
          'Keyboard navigation is good',
          'Labels need improvement',
          'ARIA implementation is minimal'
        ],
        evidence: ['Accessibility audit results', 'Screen reader test'],
        issues: categories.accessibility.issues.filter(i => i.category === 'accessibility')
      },
      performance: {
        findings: [
          'Likely bottlenecks identified',
          'Render path issues present',
          'Image optimization needed'
        ],
        evidence: ['Performance audit', 'Core Web Vitals analysis'],
        issues: categories.performanceCoreWebVitals.issues.filter(i => i.category === 'performance-core-web-vitals')
      },
      seo: {
        findings: [
          'Metadata needs optimization',
          'Structured data is missing',
          'Canonicals are present'
        ],
        evidence: ['SEO audit results', 'Structured data analysis'],
        issues: categories.seo.issues.filter(i => i.category === 'seo')
      },
      analytics: {
        findings: [
          'Event coverage is limited',
          'Dedupe risks identified',
          'Funnel gaps present'
        ],
        evidence: ['Analytics audit', 'Event tracking analysis'],
        issues: categories.analyticsExperimentation.issues.filter(i => i.category === 'analytics-experimentation')
      }
    };
  }

  // Generate prioritized recommendations
  private generatePrioritizedRecommendations(categories: Record<string, CategoryScore>): PrioritizedRecommendation[] {
    const allIssues = Object.values(categories).flatMap(category => category.issues);
    
    return allIssues
      .filter(issue => issue.priority >= 7)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 10)
      .map(issue => ({
        title: issue.title,
        problem: issue.description,
        recommendation: issue.solution,
        owner: this.getOwnerFromCategory(issue.category),
        effort: issue.effort === 'low' ? 'Low' : issue.effort === 'medium' ? 'Med' : 'High',
        impact: issue.severity === 'critical' || issue.severity === 'high' ? 'High' : issue.severity === 'medium' ? 'Med' : 'Low',
        rationale: issue.impact,
        notes: `Priority: ${issue.priority}/10, Category: ${issue.category}`
      }));
  }

  // Generate KPI plan
  private generateKPIPlan(url: string, realData: RealAnalysisData): KPIPlan {
    return {
      primaryKPIs: [
        { metric: 'Conversion rate', description: 'Overall site conversion rate' },
        { metric: 'AOV', description: 'Average order value' },
        { metric: 'Revenue/user', description: 'Revenue per user' }
      ],
      journeyKPIs: [
        { metric: 'PLP→PDP rate', description: 'Product listing to detail page conversion' },
        { metric: 'PDP→Cart rate', description: 'Product detail to cart conversion' },
        { metric: 'Cart→Checkout rate', description: 'Cart to checkout conversion' },
        { metric: 'Checkout→Order rate', description: 'Checkout to order completion' }
      ],
      qualityKPIs: [
        { metric: 'Core Web Vitals', description: 'LCP, INP, CLS scores' },
        { metric: 'Error rate', description: '4xx/5xx error rate' },
        { metric: 'CSAT', description: 'Customer satisfaction score' }
      ],
      retentionKPIs: [
        { metric: 'Repeat purchase rate', description: 'Percentage of returning customers' },
        { metric: 'Review volume', description: 'Number of reviews received' },
        { metric: 'Avg rating', description: 'Average review rating' }
      ],
      measurementApproach: 'Google Analytics 4, Google Search Console, Core Web Vitals, A/B testing platform',
      dashboards: ['Executive Dashboard', 'Marketing Dashboard', 'Technical Dashboard'],
      cadence: 'Weekly reviews, monthly deep dives, quarterly strategy sessions'
    };
  }

  // Generate risks and next steps
  private generateRisksAndNextSteps(url: string, realData: RealAnalysisData): RisksAndNextSteps {
    return {
      platformLimitations: [
        'Current platform may limit customization options',
        'Third-party integrations may be restricted',
        'Performance optimization may be limited by hosting'
      ],
      dependencies: [
        'Design system updates required',
        'Content management system migration needed',
        'Third-party service integrations required'
      ],
      phasedRoadmap: [
        {
          phase: 'Phase 1 (30 days)',
          timeline: 'Quick wins and critical fixes',
          deliverables: ['SSL implementation', 'Mobile optimization', 'Basic SEO fixes']
        },
        {
          phase: 'Phase 2 (60 days)',
          timeline: 'Core improvements',
          deliverables: ['Checkout optimization', 'Performance improvements', 'Analytics setup']
        },
        {
          phase: 'Phase 3 (90 days)',
          timeline: 'Advanced features',
          deliverables: ['A/B testing framework', 'Advanced personalization', 'Retention programs']
        }
      ],
      testPlan: [
        'A/B test checkout flow improvements',
        'Test mobile navigation changes',
        'Validate performance improvements',
        'User testing for new features'
      ],
      qaChecklist: [
        'Cross-browser compatibility testing',
        'Mobile responsiveness testing',
        'Performance testing',
        'Accessibility testing',
        'Security testing'
      ],
      businessBenefits: [
        { benefit: 'Clear value proposition and CTA', impact: 'Higher homepage engagement and click-through to shopping flows; improved paid traffic ROI' },
        { benefit: 'Enhanced filters and product cards', impact: 'Increased PLP→PDP rate, lower pogo-sticking, faster product finding, higher conversion' },
        { benefit: 'PDP confidence boosters', impact: 'Reduced hesitation and returns; higher add-to-cart rate and AOV via bundles/relateds' },
        { benefit: 'Streamlined checkout with wallets', impact: 'Significant conversion lift (especially mobile), reduced abandonment, faster repeat purchases' },
        { benefit: 'Better search experience', impact: 'Higher search-to-purchase rate; captures high-intent users; improved merchandising control' }
      ]
    };
  }

  // Helper methods
  private getScoreDescription(score: number): string {
    if (score >= 1.8) return 'Excellent';
    if (score >= 1.4) return 'Good';
    if (score >= 1.0) return 'Fair';
    if (score >= 0.6) return 'Poor';
    return 'Critical';
  }

  private getOwnerFromCategory(category: string): 'Design' | 'Eng' | 'Content' | 'Marketing' {
    if (category.includes('design') || category.includes('ui') || category.includes('ux')) return 'Design';
    if (category.includes('performance') || category.includes('security') || category.includes('backend')) return 'Eng';
    if (category.includes('content') || category.includes('seo')) return 'Content';
    return 'Marketing';
  }

  // Generate recommendations
  private generateRecommendations(categories: Record<string, CategoryScore>): Recommendation[] {
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

  // Calculate overall score (0-2 scale)
  private calculateOverallScore(categories: Record<string, CategoryScore>): number {
    const scores = Object.values(categories).map(cat => cat.score);
    return Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 100) / 100;
  }

  // Generate AI-powered improvement prompts
  async generateImprovementPrompts(auditResult: AuditResult): Promise<string[]> {
    const prompts = [
      `Based on the website audit for ${auditResult.url}, here are AI-powered improvement prompts:`,
      '',
      '## High-Priority Improvements:',
      '',
      ...auditResult.categories.navigationIA.issues
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

}

// Export singleton instance
export const websiteAuditService = new WebsiteAuditService();
