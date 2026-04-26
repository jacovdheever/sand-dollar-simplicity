import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import PageShell from '@/components/marketing/PageShell';
import MarketingHero from '@/components/marketing/MarketingHero';
import MarketingSections from '@/components/marketing/MarketingSections';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingCTAs from '@/components/marketing/MarketingCTAs';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import NotFound from '@/pages/NotFound';
import PremiumMarketingPage from '@/pages/PremiumMarketingPage';
import { renderCoreServicePremiumPage } from '@/pages/premium/CoreServicePremiumPages';
import { renderIndustryPremiumPage } from '@/pages/premium/IndustryPremiumPages';
import { renderGeoPremiumPage } from '@/pages/premium/GeoPremiumPages';
import { renderInsightCaseStudyPremiumPage } from '@/pages/premium/InsightCaseStudyPremiumPages';
import { loadMarketingPage } from '@/data/marketingPages/loadMarketingPage';
import type { MarketingPageContent } from '@/types/marketing';
import { absoluteUrl, getSiteOrigin } from '@/lib/siteOrigin';

function seoHelmetType(page: MarketingPageContent): 'website' | 'article' | 'service' {
  if (page.template === 'insight' || page.template === 'caseStudy') return 'article';
  if (page.template === 'geo') return 'website';
  return 'service';
}

function buildLocalBusinessLd(page: MarketingPageContent): Record<string, unknown> {
  const origin = getSiteOrigin();
  const served =
    page.areaServed && page.areaServed.length > 0
      ? page.areaServed.map((name) => ({ '@type': 'City', name }))
      : [{ '@type': 'Country', name: 'United States' }];
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sand Dollar Design',
    url: origin,
    description: page.metaDescription,
    areaServed: served,
    sameAs: ['https://www.linkedin.com/company/sand-dollar-design'],
  };
}

const MarketingSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? loadMarketingPage(slug) : null;

  if (!data) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(`/${data.slug}`);
  const helmetType = seoHelmetType(data);
  const extraJsonLd =
    data.template === 'geo' ? [buildLocalBusinessLd(data)] : [];
  const isPremiumFirstThree = [
    'ux-strategy-consulting',
    'heineken-b2b-ecommerce-ux-ui-design',
    'ux-ui-design-agency-usa',
  ].includes(data.slug);
  const premiumPage =
    renderCoreServicePremiumPage(data) ||
    renderIndustryPremiumPage(data) ||
    renderGeoPremiumPage(data) ||
    renderInsightCaseStudyPremiumPage(data);

  const isProjects = data.slug === 'projects';
  const projectsTitle = 'UX Design Case Studies & Projects | Sand Dollar Design';
  const projectsDescription =
    'Explore UX strategy, UX research, UX/UI design and product design case studies from Sand Dollar Design, including fintech, banking and B2B e-commerce work.';
  const projectsOgDescription =
    'Explore featured UX/UI design, product design and digital product case studies from Sand Dollar Design.';

  return (
    <>
      <SEO
        title={isProjects ? projectsTitle : data.seoTitle}
        description={isProjects ? projectsDescription : data.metaDescription}
        openGraphTitle={isProjects ? projectsTitle : undefined}
        openGraphDescription={isProjects ? projectsOgDescription : undefined}
        canonical={canonical}
        type={helmetType}
        faq={data.faqs}
        publishedTime={data.publishedTime}
        modifiedTime={data.modifiedTime}
        tags={data.tags}
        extraJsonLd={extraJsonLd}
      />
      {isPremiumFirstThree ? (
        <PremiumMarketingPage data={data} />
      ) : premiumPage ? (
        premiumPage
      ) : (
        <PageShell>
          <MarketingHero
            title={data.h1}
            subtitle={data.heroSubtitle || undefined}
            imageFile={data.heroImage}
            imageAlt={data.heroImageAlt}
          />
          <MarketingSections sections={data.sections} gallery={data.gallery} />
          <MarketingFAQ items={data.faqs} />
          <MarketingCTAs primary={data.primaryCta} secondary={data.secondaryCta} />
          <MarketingInternalLinks links={data.internalLinks} />
        </PageShell>
      )}
    </>
  );
};

export default MarketingSlugPage;
