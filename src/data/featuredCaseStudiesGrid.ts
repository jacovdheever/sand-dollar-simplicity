/**
 * Curated case studies for the 3-column grid (homepage + /projects).
 * Static content — not loaded from the projects database.
 */
export const FEATURED_CASE_STUDIES_GRID = [
  {
    caseStudyUrl: '/tradition-capital-bank-data-analytics-platform-redesign',
    client: 'Tradition Capital Bank',
    industry: 'Banking / Enterprise UX',
    headline: 'Employee Experience Redesign on Data Analytics Platform',
    description:
      'Sand Dollar Design helped Tradition Capital Bank modernise a WebFocus data warehousing platform through improved navigation, modern UI design, and better employee user journeys.',
    tags: ['UX Strategy', 'UX Research', 'Product Design', 'UI Design', 'User Testing', 'Data Analytics'],
    imageFile: 'tradition bank case study AFTER.png',
    imageAlt: 'Tradition Capital Bank data analytics platform redesign image',
  },
  {
    caseStudyUrl: '/mukuru-mobile-app-rebrand-and-redesign',
    client: 'Mukuru',
    industry: 'Fintech',
    headline: 'Mobile App Rebrand and Redesign',
    description:
      'Sand Dollar Design redesigned Mukuru’s mobile application in line with a new brand identity, while improving critical UX journeys to create a clearer, more modern customer experience.',
    tags: ['Branding', 'UX Strategy', 'UX Research', 'Product Design', 'UI Design', 'User Testing'],
    imageFile: 'mukuru mobile app rebrand.png',
    imageAlt: 'Mukuru mobile app redesign project image',
  },
  {
    caseStudyUrl: '/heineken-b2b-ecommerce-ux-ui-design',
    client: 'Heineken',
    industry: 'FMCG / B2B E-commerce',
    headline: 'B2B E-Commerce UX/UI Design',
    description:
      'Sand Dollar Design created a custom headless UI for a SAP e-commerce platform for Heineken, reimagining the B2B e-commerce experience for wholesale customers.',
    tags: ['UX Strategy', 'UX Research', 'Product Design', 'UI Design', 'User Testing', 'B2B E-commerce'],
    imageFile: 'heineken desktop landing.png',
    imageAlt: 'Heineken B2B e-commerce UX/UI design project image',
  },
] as const;

export type FeaturedCaseStudyGridItem = (typeof FEATURED_CASE_STUDIES_GRID)[number];
