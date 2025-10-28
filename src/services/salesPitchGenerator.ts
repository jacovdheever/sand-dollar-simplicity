// Sales Pitch Generator Service
// Generates presentation content and email templates for client outreach

import { AuditResult } from './websiteAuditService';

export interface SalesPitchOptions {
  clientName?: string;
  companyName?: string;
  contactEmail?: string;
  includeCaseStudies?: boolean;
}

export interface PresentationSlide {
  title: string;
  content: string;
  type: 'title' | 'problem' | 'solution' | 'benefits' | 'pricing' | 'timeline' | 'cta';
}

export interface EmailTemplate {
  subject: string;
  body: string;
  callToAction: string;
}

class SalesPitchGenerator {
  
  // Generate presentation slides
  generatePresentationSlides(auditResult: AuditResult, options: SalesPitchOptions = {}): PresentationSlide[] {
    const slides: PresentationSlide[] = [];
    const clientName = options.clientName || 'Valued Client';
    const companyName = options.companyName || 'Your Company';
    
    // Slide 1: Title Slide
    slides.push({
      title: `Website Audit & Optimization Proposal`,
      content: `Presented to: ${clientName}\nCompany: ${companyName}\nWebsite: ${auditResult.url}\nDate: ${new Date().toLocaleDateString()}`,
      type: 'title'
    });

    // Slide 2: Current State
    slides.push({
      title: `Current Website Performance`,
      content: `Overall Score: ${auditResult.overallScore.toFixed(1)}/5.0\n\n${this.getScoreInterpretation(auditResult.overallScore)}\n\nKey Issues Identified:\n${this.getTopIssues(auditResult).slice(0, 3).map(issue => `• ${issue}`).join('\n')}`,
      type: 'problem'
    });

    // Slide 3: Category Breakdown
    slides.push({
      title: `Performance Analysis by Category`,
      content: this.getCategoryBreakdown(auditResult),
      type: 'problem'
    });

    // Slide 4: Critical Issues
    slides.push({
      title: `Critical Issues Impacting Your Business`,
      content: this.getCriticalIssuesContent(auditResult),
      type: 'problem'
    });

    // Slide 5: Our Solution
    slides.push({
      title: `How We Can Transform Your Website`,
      content: `Our comprehensive optimization approach includes:\n\n• UX/UI Design Improvements\n• Performance Optimization\n• SEO Enhancement\n• Mobile Responsiveness\n• Security Hardening\n• Analytics Implementation\n• Conversion Rate Optimization\n\nExpected Results: 40-60% improvement in overall performance`,
      type: 'solution'
    });

    // Slide 6: Benefits
    slides.push({
      title: `Business Impact & ROI`,
      content: this.getBenefitsContent(auditResult),
      type: 'benefits'
    });

    // Slide 7: Our Process
    slides.push({
      title: `Our Proven 4-Phase Process`,
      content: `Phase 1: Discovery & Strategy (Week 1-2)\n• Deep dive analysis\n• Competitive research\n• Strategy development\n\nPhase 2: Design & Development (Week 3-6)\n• UX/UI improvements\n• Performance optimization\n• Mobile optimization\n\nPhase 3: Testing & Refinement (Week 7-8)\n• Quality assurance\n• User testing\n• Performance testing\n\nPhase 4: Launch & Optimization (Week 9-12)\n• Go-live support\n• Analytics setup\n• Ongoing optimization`,
      type: 'solution'
    });

    if (options.includeCaseStudies) {
      // Slide 8: Case Studies
      slides.push({
        title: `Proven Results`,
        content: this.getCaseStudiesContent(),
        type: 'benefits'
      });
    }

    // Final Slide: Call to Action
    slides.push({
      title: `Ready to Transform Your Website?`,
      content: `Let's discuss how we can help you achieve:\n\n• Higher conversion rates\n• Better user experience\n• Improved search rankings\n• Increased revenue\n\nNext Steps:\n1. Schedule a strategy call\n2. Review detailed proposal\n3. Begin optimization journey\n\nContact: ${options.contactEmail || 'hello@sanddollardesign.co.za'}`,
      type: 'cta'
    });

    return slides;
  }

  // Generate email template
  generateEmailTemplate(auditResult: AuditResult, options: SalesPitchOptions = {}): EmailTemplate {
    const clientName = options.clientName || 'Valued Client';
    const companyName = options.companyName || 'Your Company';
    const yourName = options.clientName || 'Jaco';
    const phone = options.contactEmail || '+27 82 123 4567';
    const email = options.contactEmail || 'jaco@sanddollardesign.co.za';
    const website = 'https://sanddollardesign.co.za';
    
    const subject = `Quick wins to lift revenue on ${companyName}'s site`;
    
    const auditSummary = this.generateAuditSummary(auditResult);
    
    const body = `Hi ${clientName},

I'm ${yourName} from Sand Dollar Design. We specialize in designing and optimizing high‑performing websites and e‑commerce experiences.

${auditSummary}

We've developed a focused Website & E‑commerce Audit that pinpoints exactly where your site is creating friction—and how to turn those moments into revenue. Our audit covers:

UX/UI and conversion: home, PLP/PDP, cart and checkout
Navigation, search, and product discovery
Content and merchandising
Accessibility and performance (Core Web Vitals)
SEO and structured data
Analytics, experimentation, and post‑purchase retention

What you get:

An executive summary with the top 5 opportunities
A prioritized, effort/impact roadmap with owner by team
Page‑level findings with clear design and development guidance
KPI plan to measure improvements (conversion, AOV, repeat rate)

Typical outcomes include:

Faster paths to product and clearer PDPs → higher add-to-cart
Streamlined checkout and wallet pay → lower abandonment
Image/JS optimizations → improved speed and conversion
Stronger SEO and structured data → more qualified organic traffic

If you'd like, we can run a quick no‑obligation pre‑audit on ${auditResult.url} and share the top 3 opportunities we see.

Would you be open to a 20‑minute call this week to discuss?

Best regards,
${yourName}
Sand Dollar Design
${phone} | ${email} | ${website}`;

    const callToAction = `Schedule Your Free Strategy Call: ${email}`;

    return {
      subject,
      body,
      callToAction
    };
  }

  // Generate PowerPoint-compatible content
  generatePowerPointContent(auditResult: AuditResult, options: SalesPitchOptions = {}): string {
    const slides = this.generatePresentationSlides(auditResult, options);
    
    let content = `# Website Audit & Optimization Proposal\n\n`;
    content += `**Client:** ${options.clientName || 'Valued Client'}\n`;
    content += `**Company:** ${options.companyName || 'Your Company'}\n`;
    content += `**Website:** ${auditResult.url}\n`;
    content += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
    content += `---\n\n`;

    slides.forEach((slide, index) => {
      content += `## Slide ${index + 1}: ${slide.title}\n\n`;
      content += `${slide.content}\n\n`;
      content += `---\n\n`;
    });

    return content;
  }

  // Generate brief audit summary
  private generateAuditSummary(auditResult: AuditResult): string {
    const overallScore = auditResult.overallScore;
    const scoreOutOf = 5.0; // Updated to 5.0 scale
    
    // Get top 3 issues
    const topIssues = this.getTopIssues(auditResult).slice(0, 3);
    
    // Get score interpretation
    let performanceLevel = '';
    if (overallScore >= 4.0) {
      performanceLevel = 'strong foundation with optimization opportunities';
    } else if (overallScore >= 3.0) {
      performanceLevel = 'decent performance with significant improvement potential';
    } else if (overallScore >= 2.0) {
      performanceLevel = 'below-average performance requiring immediate attention';
    } else {
      performanceLevel = 'poor performance with critical issues affecting business growth';
    }
    
    // Get top performing and underperforming categories
    const categories = Object.entries(auditResult.categories || {});
    const sortedCategories = categories.sort((a, b) => (b[1]?.score || 0) - (a[1]?.score || 0));
    
    const topCategory = sortedCategories[0];
    const bottomCategory = sortedCategories[sortedCategories.length - 1];
    
    return `After analyzing ${auditResult.url}, I found your website has a ${overallScore.toFixed(1)}/${scoreOutOf} overall performance score, indicating ${performanceLevel}. 

Your strongest area is ${this.formatCategoryName(topCategory?.[0] || 'general performance')} (${topCategory?.[1]?.score?.toFixed(1) || 'N/A'}/5), while ${this.formatCategoryName(bottomCategory?.[0] || 'overall optimization')} (${bottomCategory?.[1]?.score?.toFixed(1) || 'N/A'}/5) presents the biggest opportunity for improvement.`;
  }

  // Helper methods
  private getScoreInterpretation(score: number): string {
    if (score >= 4.0) return "Excellent performance with minor optimization opportunities.";
    if (score >= 3.0) return "Good foundation with significant improvement potential.";
    if (score >= 2.0) return "Below average performance requiring immediate attention.";
    return "Poor performance with critical issues affecting business growth.";
  }

  private getTopIssues(auditResult: AuditResult): string[] {
    const issues = Object.values(auditResult.categories || {})
      .flatMap(category => category?.issues || [])
      .filter(issue => issue?.severity === 'high')
      .map(issue => issue?.title || 'Unknown Issue')
      .slice(0, 10);
    
    return issues.length > 0 ? issues : [
      'Mobile responsiveness issues',
      'Slow page load times',
      'Poor SEO optimization',
      'Inadequate user experience',
      'Security vulnerabilities'
    ];
  }

  private getCategoryBreakdown(auditResult: AuditResult): string {
    const categories = Object.entries(auditResult.categories || {});
    if (categories.length === 0) {
      return "Detailed analysis in progress...";
    }
    
    return categories.map(([category, data]) => 
      `${this.formatCategoryName(category)}: ${data?.score?.toFixed(1) || 0}/5.0`
    ).join('\n');
  }

  private getCriticalIssuesContent(auditResult: AuditResult): string {
    const issues = this.getTopIssues(auditResult);
    return issues.slice(0, 5).map(issue => `• ${issue}`).join('\n') + 
           '\n\nThese issues are directly impacting your:\n• Search engine rankings\n• User experience\n• Conversion rates\n• Brand credibility';
  }

  private getBenefitsContent(auditResult: AuditResult): string {
    return `Immediate Benefits:\n• Faster page load times (2-3x improvement)\n• Better mobile experience\n• Improved search rankings\n• Higher conversion rates\n\nLong-term ROI:\n• 25-45% increase in leads\n• 30-50% improvement in organic traffic\n• Enhanced brand reputation\n• Reduced bounce rates\n• Better customer satisfaction\n\nInvestment Recovery: Typically 3-6 months`;
  }

  private getBusinessImpactContent(auditResult: AuditResult): string {
    const score = auditResult.overallScore;
    if (score < 2.0) {
      return "Your website is likely losing potential customers due to poor performance, slow loading times, and poor user experience. This directly impacts your revenue and brand reputation.";
    } else if (score < 3.0) {
      return "While your website has a decent foundation, there are significant opportunities to improve user experience and conversion rates that could substantially increase your business growth.";
    } else if (score < 4.0) {
      return "Your website performs well but has room for optimization that could unlock additional growth potential and competitive advantages.";
    } else {
      return "Your website performs well, but even small optimizations can yield significant returns on investment in today's competitive digital landscape.";
    }
  }

  private getCaseStudiesContent(): string {
    return `Case Study 1: E-commerce Platform\n• 65% increase in conversion rate\n• 40% improvement in page load speed\n• 3x increase in mobile traffic\n\nCase Study 2: Service Business\n• 50% increase in lead generation\n• 35% improvement in search rankings\n• 2x increase in organic traffic\n\nCase Study 3: SaaS Company\n• 45% reduction in bounce rate\n• 30% increase in user engagement\n• 25% improvement in trial-to-paid conversion`;
  }

  private getPricingContent(auditResult: AuditResult): string {
    const score = auditResult.overallScore;
    let basePrice = 5000;
    
    if (score < 2.0) {
      basePrice = 8000; // More work needed
    } else if (score < 3.0) {
      basePrice = 6000; // Moderate work needed
    }

    return `**Package Options:**

**Essential Package - $${basePrice}**
• UX/UI improvements
• Performance optimization
• Mobile responsiveness
• Basic SEO optimization
• 30-day support

**Professional Package - $${basePrice + 2000}**
• Everything in Essential
• Advanced SEO optimization
• Security enhancements
• Analytics implementation
• 60-day support
• Monthly optimization

**Enterprise Package - $${basePrice + 4000}**
• Everything in Professional
• Custom development
• Advanced integrations
• 90-day support
• Quarterly optimization
• Priority support

*All packages include detailed reporting and performance tracking*`;
  }

  private getTimelineContent(): string {
    return `**Project Timeline: 8-12 Weeks**

**Week 1-2: Discovery & Strategy**
• Detailed analysis
• Competitive research
• Strategy development
• Project planning

**Week 3-6: Design & Development**
• UX/UI improvements
• Performance optimization
• Mobile optimization
• Content optimization

**Week 7-8: Testing & Refinement**
• Quality assurance
• User testing
• Performance testing
• Bug fixes

**Week 9-12: Launch & Optimization**
• Go-live support
• Analytics setup
• Performance monitoring
• Ongoing optimization

*Timeline may vary based on project complexity*`;
  }

  private formatCategoryName(category: string): string {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}

// Export singleton instance
export const salesPitchGenerator = new SalesPitchGenerator();
