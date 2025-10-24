import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  canonical?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
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
}

const SEO: React.FC<SEOProps> = ({
  title = 'Sand Dollar Design | UX/UI Design, AI Development & Innovation Consulting',
  description = 'Leading UX/UI design and AI development firm specializing in digital transformation, rapid prototyping, and innovation consulting. Serving clients across USA and South Africa with cutting-edge solutions.',
  keywords = 'UX design, UI design, AI development, rapid prototyping, innovation consulting, digital transformation, user experience, user interface, web development, mobile app development, South Africa, USA, design agency, technology consulting',
  image = 'https://sanddollardesign.co.za/og-image.jpg',
  url = 'https://sanddollardesign.co.za',
  type = 'website',
  author = 'Sand Dollar Design',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical,
  breadcrumbs = [],
  faq = [],
  organization
}) => {
  const fullTitle = title.includes('Sand Dollar Design') ? title : `${title} | Sand Dollar Design`;
  const fullUrl = canonical || `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullImage = image.startsWith('http') ? image : `https://sanddollardesign.co.za${image}`;
  
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
    "publisher": {
      "@type": "Organization",
      "name": "Sand Dollar Design",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sanddollardesign.co.za/Sand-Dollar-icon.png",
        "width": 512,
        "height": 512
      },
      "url": "https://sanddollardesign.co.za",
      "description": "Leading UX/UI design and AI development firm specializing in digital transformation, rapid prototyping, and innovation consulting.",
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
    "url": "https://sanddollardesign.co.za",
    "logo": "https://sanddollardesign.co.za/Sand-Dollar-icon.png",
    "description": "Leading UX/UI design and AI development firm specializing in digital transformation, rapid prototyping, and innovation consulting. Serving clients across USA and South Africa.",
    "foundingDate": "2020",
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
      "https://www.linkedin.com/company/sand-dollar-design"
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
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
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
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content="sanddollardesign.co.za" />
      
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
    </Helmet>
  );
};

export default SEO;
