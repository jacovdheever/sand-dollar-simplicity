/** Map legacy or shorthand internal paths from content docs to real routes. */
const HREF_FIXES: Record<string, string> = {
  '/ux-ui-design-agency-usa/minneapolis': '/minneapolis-ux-agency',
  '/ux-ui-design-agency-usa/florida': '/florida-ux-ui-design-agency',
  '/services': '/ux-ui-design-services',
  '/case-studies': '/projects',
  '/projects/heineken-b2b-ecommerce-ux-ui-design': '/heineken-b2b-ecommerce-ux-ui-design',
};

const READABLE_LABELS: Record<string, string> = {
  '/ux-strategy-consulting': 'UX Strategy Consulting',
  '/ux-research-agency': 'UX Research Agency',
  '/ux-ui-design-services': 'UX/UI Design Services',
  '/product-design-agency': 'Product Design Agency',
  '/ai-development-agency': 'AI Development Agency',
  '/fintech-ux-design-agency': 'Fintech UX Design Agency',
  '/healthcare-ux-design-agency': 'Healthcare UX Design Agency',
  '/b2b-ecommerce-ux-design': 'B2B E-Commerce UX Design',
  '/minneapolis-ux-agency': 'Minneapolis UX Agency',
  '/florida-ux-ui-design-agency': 'Florida UX/UI Design Agency',
  '/projects': 'View more case studies',
  '/work': 'View More Case Studies',
  '/heineken-b2b-ecommerce-ux-ui-design': 'Heineken B2B E-Commerce UX/UI Design',
  '/mukuru-mobile-app-rebrand-and-redesign': 'Mukuru Mobile App Rebrand and Redesign',
};

export function normalizeInternalHref(href: string): string {
  const [path, query] = href.split('?');
  const base = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  const fixed = HREF_FIXES[base] ?? base;
  return query ? `${fixed}?${query}` : fixed;
}

export function readableInternalLabel(originalLabel: string, normalizedHref: string): string {
  const pathOnly = normalizedHref.split('?')[0];
  const mapped = READABLE_LABELS[pathOnly];
  if (mapped) return mapped;

  const looksLikeSlug =
    originalLabel === pathOnly ||
    originalLabel.startsWith('/') ||
    originalLabel.includes('-') ||
    originalLabel === originalLabel.toLowerCase();

  if (!looksLikeSlug) return originalLabel;

  return pathOnly
    .replace(/^\//, '')
    .split('-')
    .map((part) => (part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(' ');
}
