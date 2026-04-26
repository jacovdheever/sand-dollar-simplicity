import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteOrigin } from '@/lib/siteOrigin';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'service' | 'organization';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  /** When false, skips JSON-LD scripts (e.g. homepage already has schema in index.html). */
  includeStructuredData?: boolean;
  canonical?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  /** Merged into Organization JSON-LD sameAs (e.g. Clutch profile). */
  organizationSameAs?: string[];
  /** Shorter social share title; defaults to document title. */
  openGraphTitle?: string;
  /** Social share description; defaults to meta description. */
  openGraphDescription?: string;
  organization?: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    contactPoint?: {
      telephone: string;
      contactType: string;
      email: string;
    };
  };
  /** Additional JSON-LD objects (e.g. LocalBusiness for geo pages). */
  extraJsonLd?: Record<string, unknown>[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'UX/UI Design Agency, Product Design & AI Development | Sand Dollar Design',
  description = 'UX strategy, UX research, UX/UI and product design—plus AI development for startups. Serving fintech, healthcare, NGOs and enterprise teams in South Africa, the USA and Europe.',
  keywords = 'UX design, UI design, product design, UX strategy, UX research, AI development, startups, fintech, healthcare, NGOs, enterprise, South Africa, USA, Europe, design agency',
  image,
  url,
  type = 'website',
  author = 'Sand Dollar Design',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  includeStructuredData = true,
  canonical,
  breadcrumbs = [],
  faq = [],
  organizationSameAs = [],
  openGraphTitle,
  openGraphDescription,
  organization,
  extraJsonLd = []
}) => {
  const origin = getSiteOrigin();
  const resolvedUrl = url ?? origin;
  const resolvedImage = image ?? `${origin}/og-image.jpg`;
  const fullTitle = title.includes('Sand Dollar Design') ? title : `${title} | Sand Dollar Design`;
  const fullUrl = canonical || `${resolvedUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullImage = resolvedImage.startsWith('http') ? resolvedImage : `${origin}${resolvedImage.startsWith('/') ? resolvedImage : `/${resolvedImage}`}`;
  const ogTitleResolved = openGraphTitle ?? fullTitle;
  const ogDescriptionResolved = openGraphDescription ?? description;
  
  const serviceName = title.replace(/\s*\|.*$/, '').trim() || title;

  // Base structured data
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "Article" : type === 'service' ? "Service" : type === 'organization' ? "Organization" : "WebPage",
    "headline": title,
    "description": description,
    "image": fullImage,
    "url": fullUrl,
    "author": {
      "@type": "Organization",
      "name": author
    },
    ...(type === 'service'
      ? {
          name: serviceName,
          provider: {
            "@type": "Organization",
            name: "Sand Dollar Design",
            url: origin,
            logo: `${origin}/Sand-Dollar_Logo.png`,
          },
        }
      : {}),
    "publisher": {
      "@type": "Organization",
      "name": "Sand Dollar Design",
      "logo": {
        "@type": "ImageObject",
        "url": `${origin}/Sand-Dollar_Logo.png`,
        "width": 512,
        "height": 512
      },
      "url": origin,
      "description": "UX strategy, UX research, UX/UI and product design—plus AI development for startups. Serving fintech, healthcare, NGOs and enterprise teams in South Africa, the USA and Europe.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ZA",
        "addressRegion": "Western Cape"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "jaco@sanddollardesign.co.za"
      }
    },
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime }),
    ...(section && { "articleSection": section }),
    ...(tags.length > 0 && { "keywords": tags.join(', ') })
  };

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sand Dollar Design",
    "url": origin,
    "logo": `${origin}/Sand-Dollar_Logo.png`,
    "description": "UX strategy, UX research, UX/UI and product design—plus AI development for startups. Serving fintech, healthcare, NGOs and enterprise teams in South Africa, the USA and Europe.",
    "foundingDate": "2017",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "Western Cape"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "jaco@sanddollardesign.co.za"
    },
    "sameAs": [
      "https://www.linkedin.com/company/sand-dollar-design",
      ...organizationSameAs,
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -33.9249,
        "longitude": 18.4241
      },
      "geoRadius": "10000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Design and Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UX/UI Design",
            "description": "User experience and user interface design services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Development",
            "description": "Artificial intelligence and machine learning development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rapid Prototyping",
            "description": "Fast prototyping and MVP development services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Innovation Consulting",
            "description": "Digital transformation and innovation consulting"
          }
        }
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // FAQ structured data
  const faqStructuredData = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="generator" content="React + Vite" />
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Sand Dollar Design" />
      
      {/* Robots and Indexing */}
      {noindex && <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitleResolved} />
      <meta property="og:description" content={ogDescriptionResolved} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Sand Dollar Design" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_ZA" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sanddollardesign" />
      <meta name="twitter:creator" content="@sanddollardesign" />
      <meta name="twitter:title" content={ogTitleResolved} />
      <meta name="twitter:description" content={ogDescriptionResolved} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content={new URL(origin).hostname} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="ZA" />
      <meta name="geo.placename" content="South Africa" />
      <meta name="geo.position" content="-33.9249;18.4241" />
      <meta name="ICBM" content="-33.9249, 18.4241" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="Worldwide" />
      <meta name="classification" content="Business" />
      <meta name="category" content="Technology" />
      <meta name="subject" content="UX/UI Design, AI Development, Innovation Consulting" />
      <meta name="copyright" content="Sand Dollar Design" />
      <meta name="reply-to" content="jaco@sanddollardesign.co.za" />
      <meta name="owner" content="Sand Dollar Design" />
      <meta name="url" content={fullUrl} />
      <meta name="identifier-URL" content={fullUrl} />
      <meta name="directory" content="submission" />
      <meta name="pagename" content={title} />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {includeStructuredData && (
        <>
          {/* Structured Data - Base */}
          <script type="application/ld+json">
            {JSON.stringify(baseStructuredData)}
          </script>

          {/* Structured Data - Organization */}
          <script type="application/ld+json">
            {JSON.stringify(organizationStructuredData)}
          </script>

          {/* Structured Data - Breadcrumbs */}
          {breadcrumbStructuredData && (
            <script type="application/ld+json">
              {JSON.stringify(breadcrumbStructuredData)}
            </script>
          )}

          {/* Structured Data - FAQ */}
          {faqStructuredData && (
            <script type="application/ld+json">
              {JSON.stringify(faqStructuredData)}
            </script>
          )}

          {extraJsonLd.map((obj, i) => (
            <script key={`extra-jsonld-${i}`} type="application/ld+json">
              {JSON.stringify(obj)}
            </script>
          ))}
        </>
      )}
    </Helmet>
  );
};

export default SEO;
