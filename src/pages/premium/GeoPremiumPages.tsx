import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  HeartPulse,
  Landmark,
  Layers,
  MapPin,
  MonitorSmartphone,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import PageShell from '@/components/marketing/PageShell';
import MarketingFAQ from '@/components/marketing/MarketingFAQ';
import MarketingInternalLinks from '@/components/marketing/MarketingInternalLinks';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import type { MarketingImageSpec, MarketingPageContent } from '@/types/marketing';

const geoPremiumSlugTuple = [
  'ux-ui-design-agency-south-africa',
  'ux-design-agency-uk',
  'product-design-agency-netherlands',
  'ux-agency-belgium',
  'minneapolis-ux-agency',
  'florida-ux-ui-design-agency',
  'jacksonville-ux-ui-design-agency',
  'chicago-ux-design-agency',
  'boston-product-design-agency',
  'texas-ai-development-company',
] as const;

type GeoPremiumSlug = (typeof geoPremiumSlugTuple)[number];
type MediaPresentation = 'auto' | 'photo' | 'ui';

type ServiceLink = {
  label: string;
  href: string;
  body: string;
};

type GeoCard = {
  title: string;
  body: string;
  Icon?: LucideIcon;
};

type GeoConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  chips: string[];
  focal?: string;
  positioningTitle: string;
  positioningBody: string;
  localTitle: string;
  localBody: string;
  sectorsTitle: string;
  sectors: GeoCard[];
  capabilitiesTitle: string;
  capabilities: GeoCard[];
  collaborationTitle: string;
  collaborationBody: string;
  coverageTitle: string;
  coverage: string[];
  ctaTitle: string;
  ctaBody: string;
  serviceLinks: ServiceLink[];
  relatedLinks: MarketingPageContent['internalLinks'];
};

export const GEO_PREMIUM_SLUGS: string[] = [...geoPremiumSlugTuple];

const fallbackCta = 'https://calendly.com/sanddollardesign/intro';

const serviceLinks = {
  uxUi: {
    label: 'UX/UI design services',
    href: '/ux-ui-design-services',
    body: 'Product interfaces, prototypes and responsive digital experiences.',
  },
  product: {
    label: 'Product design agency',
    href: '/product-design-agency',
    body: 'End-to-end product strategy, UX, UI and delivery support.',
  },
  strategy: {
    label: 'UX strategy consulting',
    href: '/ux-strategy-consulting',
    body: 'Discovery, product direction, journey mapping and research-led decisions.',
  },
  systems: {
    label: 'Design system consulting',
    href: '/design-system-consulting',
    body: 'Reusable components, tokens and standards for scaling product teams.',
  },
  ai: {
    label: 'AI development agency',
    href: '/ai-development-agency',
    body: 'Design-led AI products, dashboards and intelligent workflow prototypes.',
  },
};

const geoConfigs: Record<GeoPremiumSlug, GeoConfig> = {
  'ux-ui-design-agency-south-africa': {
    eyebrow: 'UX/UI design in South Africa',
    title: 'Premium product design for South African teams',
    intro:
      'Senior UX/UI, product design and digital strategy for companies in Cape Town, Johannesburg, Durban and across the South African market.',
    chips: ['Cape Town based', 'Fintech and healthcare', 'Senior UX/UI', 'African market insight'],
    focal: 'center 42%',
    positioningTitle: 'Local context with international product standards.',
    positioningBody:
      'South African teams need digital products that feel credible locally and can compete globally. We bring senior product thinking, sharp UI craft and practical delivery experience to complex local markets.',
    localTitle: 'Designed for South African scale and complexity',
    localBody:
      'From fintech and healthcare to enterprise platforms, South African products often need to support diverse users, mixed device contexts and high-trust transactions. The work has to be clear, resilient and commercially useful.',
    sectorsTitle: 'Where South African teams use us',
    sectors: [
      { Icon: Landmark, title: 'Fintech and payments', body: 'Wallets, remittance flows, dashboards and financial services products that balance trust with speed.' },
      { Icon: HeartPulse, title: 'Healthcare', body: 'Patient apps, provider tools and service journeys for high-stakes health interactions.' },
      { Icon: Building2, title: 'Enterprise software', body: 'Operational tools, portals and workflow products for growing teams and established businesses.' },
      { Icon: Network, title: 'African expansion', body: 'Design systems and UX patterns that support multi-market rollout across the continent.' },
    ],
    capabilitiesTitle: 'What we bring to South African products',
    capabilities: [
      { Icon: Compass, title: 'UX strategy', body: 'Frame the product problem before teams spend on design or development.' },
      { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'High-fidelity interfaces for web, mobile and internal tools.' },
      { Icon: Layers, title: 'Design systems', body: 'Reusable foundations that help product teams move with consistency.' },
      { Icon: ShieldCheck, title: 'Usability and trust', body: 'Clear flows for regulated, transactional and service-heavy products.' },
    ],
    collaborationTitle: 'A senior local partner without agency bloat',
    collaborationBody:
      'You work directly with experienced designers. We keep meetings focused, document decisions clearly and use Figma-based collaboration so product, leadership and engineering stay aligned.',
    coverageTitle: 'South African coverage',
    coverage: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Stellenbosch', 'Remote across SA'],
    ctaTitle: 'Build a stronger South African digital product',
    ctaBody:
      'Bring us the product, workflow or conversion problem. We will help shape a focused path from insight to interface.',
    serviceLinks: [serviceLinks.uxUi, serviceLinks.product, serviceLinks.strategy, serviceLinks.systems],
    relatedLinks: [
      { label: 'UX/UI design services', href: '/ux-ui-design-services' },
      { label: 'Product design agency', href: '/product-design-agency' },
      { label: 'UX design agency for UK clients', href: '/ux-design-agency-uk' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
    ],
  },
  'ux-design-agency-uk': {
    eyebrow: 'UX design for UK clients',
    title: 'Senior UX design for UK product teams',
    intro:
      'Remote-first UX strategy, product design and interface design for UK businesses that need sharper digital experiences without local hiring drag.',
    chips: ['UK business-hour overlap', 'Financial services', 'Healthcare UX', 'Enterprise SaaS'],
    focal: 'center 40%',
    positioningTitle: 'UK-market design thinking without the London overhead.',
    positioningBody:
      'We help UK teams move from unclear product requirements to confident digital experiences. The model is senior, collaborative and structured around practical product outcomes.',
    localTitle: 'Built for regulated and service-heavy UK markets',
    localBody:
      'UK products often carry complex compliance, procurement and accessibility requirements. We design interfaces and journeys that make that complexity easier for users and easier for teams to build.',
    sectorsTitle: 'UK sectors we support',
    sectors: [
      { Icon: Landmark, title: 'Financial services', body: 'Banking, trading, insurance and wealth products where clarity and trust drive adoption.' },
      { Icon: HeartPulse, title: 'Healthcare and healthtech', body: 'Patient, practitioner and operational products designed around safety and comprehension.' },
      { Icon: Building2, title: 'Enterprise SaaS', body: 'B2B platforms, dashboards and internal systems for sophisticated users.' },
      { Icon: ShieldCheck, title: 'Public and regulated services', body: 'Accessible journeys, complex forms and decision-heavy workflows.' },
    ],
    capabilitiesTitle: 'What UK teams bring us in to do',
    capabilities: [
      { Icon: Compass, title: 'Discovery and UX strategy', body: 'Research, audits and product direction before committing to build.' },
      { Icon: MonitorSmartphone, title: 'Product UI design', body: 'Responsive web, mobile and desktop interface design.' },
      { Icon: Layers, title: 'Design systems', body: 'Consistent UI foundations for growing product teams.' },
      { Icon: CheckCircle2, title: 'Handoff', body: 'Implementation-ready design specs and clear engineering collaboration.' },
    ],
    collaborationTitle: 'Remote collaboration that feels close',
    collaborationBody:
      'We align with UK working hours for key reviews, use async walkthroughs for momentum and keep design rationale visible so decisions do not get lost between meetings.',
    coverageTitle: 'UK coverage',
    coverage: ['London', 'Manchester', 'Bristol', 'Edinburgh', 'Leeds', 'Remote UK teams'],
    ctaTitle: 'Let us improve the experience your UK users rely on',
    ctaBody:
      'Whether you are modernising a platform or launching a new product, we can help turn complexity into a clearer digital experience.',
    serviceLinks: [serviceLinks.strategy, serviceLinks.uxUi, serviceLinks.product, serviceLinks.systems],
    relatedLinks: [
      { label: 'UX strategy consulting', href: '/ux-strategy-consulting' },
      { label: 'Product design agency Netherlands', href: '/product-design-agency-netherlands' },
      { label: 'UX agency Belgium', href: '/ux-agency-belgium' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
    ],
  },
  'product-design-agency-netherlands': {
    eyebrow: 'Product design for the Netherlands',
    title: 'Product design for Dutch innovation teams',
    intro:
      'UX strategy, product design and design systems for Dutch companies in Amsterdam, Rotterdam, Eindhoven, Utrecht and remote-first European teams.',
    chips: ['Amsterdam to Eindhoven', 'Direct collaboration', 'Fintech and medtech', 'Systems thinking'],
    focal: 'center 45%',
    positioningTitle: 'Clear, pragmatic design for Dutch product cultures.',
    positioningBody:
      'Dutch teams value clarity, directness and systems thinking. We mirror that in the way we work: senior conversations, practical decisions and interfaces that support real product outcomes.',
    localTitle: 'Designed around Dutch industry strengths',
    localBody:
      'The Netherlands combines fintech, logistics, healthcare, FMCG and deep tech. We design products that handle operational complexity while still feeling simple to use.',
    sectorsTitle: 'Dutch sectors we design for',
    sectors: [
      { Icon: Landmark, title: 'Fintech', body: 'Authentication, portfolio tools, payment flows and financial dashboards.' },
      { Icon: HeartPulse, title: 'Healthcare and medtech', body: 'Clinical workflows, patient platforms and practitioner tools.' },
      { Icon: Building2, title: 'Logistics and enterprise', body: 'Role-based systems, supply chain tools and operational dashboards.' },
      { Icon: Sparkles, title: 'FMCG and brand platforms', body: 'B2B ordering, customer touchpoints and commerce experiences.' },
    ],
    capabilitiesTitle: 'Product design capability for Dutch teams',
    capabilities: [
      { Icon: Compass, title: 'Discovery', body: 'Map users, market context and product constraints.' },
      { Icon: MonitorSmartphone, title: 'Product design', body: 'Wireframes, high-fidelity UI and testable prototypes.' },
      { Icon: Layers, title: 'Design systems', body: 'Component libraries that help teams scale consistently.' },
      { Icon: BrainCircuit, title: 'AI and advanced features', body: 'Design intelligent workflows users can understand and trust.' },
    ],
    collaborationTitle: 'Senior partnership across European time zones',
    collaborationBody:
      'We work directly with your product and engineering teams through discovery, design sprints and handoff. Documentation stays clear, feedback loops stay short and the output stays buildable.',
    coverageTitle: 'Netherlands coverage',
    coverage: ['Amsterdam', 'Rotterdam', 'Eindhoven', 'Utrecht', 'The Hague', 'Benelux teams'],
    ctaTitle: 'Design a Dutch product with more confidence',
    ctaBody:
      'If you need sharper product direction, better UX or a scalable interface system, we can help you get there.',
    serviceLinks: [serviceLinks.product, serviceLinks.strategy, serviceLinks.systems, serviceLinks.ai],
    relatedLinks: [
      { label: 'UX agency Belgium', href: '/ux-agency-belgium' },
      { label: 'UX design agency for UK clients', href: '/ux-design-agency-uk' },
      { label: 'Product design agency', href: '/product-design-agency' },
      { label: 'Design system consulting', href: '/design-system-consulting' },
    ],
  },
  'ux-agency-belgium': {
    eyebrow: 'UX design for Belgium',
    title: 'UX design for Belgian and Benelux businesses',
    intro:
      'Multilingual, regulation-aware UX and product design for teams in Brussels, Antwerp, Ghent and across Belgium.',
    chips: ['Brussels to Antwerp', 'Multilingual UX', 'Financial services', 'Pharma and enterprise'],
    focal: 'center 45%',
    positioningTitle: 'Design clarity for a market that crosses languages and systems.',
    positioningBody:
      'Belgian products often sit between local nuance, European regulation and international scale. We design journeys that stay clear across languages, roles and compliance needs.',
    localTitle: "Built for Belgium's cross-market complexity",
    localBody:
      'From Brussels regulatory contexts to Antwerp logistics and Ghent digital teams, we help turn operational complexity into products people can understand and use confidently.',
    sectorsTitle: 'Belgian sectors we support',
    sectors: [
      { Icon: Landmark, title: 'Banking and financial services', body: 'Regulated digital journeys, portals and transaction-heavy products.' },
      { Icon: HeartPulse, title: 'Pharma and healthcare', body: 'Clinical, patient and operations products where precision matters.' },
      { Icon: Building2, title: 'Logistics and enterprise', body: 'Dashboards and workflows for complex B2B environments.' },
      { Icon: Network, title: 'Multilingual products', body: 'Product structures and UI patterns that work across language contexts.' },
    ],
    capabilitiesTitle: 'What Belgian teams bring us in to solve',
    capabilities: [
      { Icon: Compass, title: 'UX strategy', body: 'Clarify product direction, audience needs and journey structure.' },
      { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'Modern interfaces for web apps, platforms and customer portals.' },
      { Icon: Layers, title: 'Design systems', body: 'Reusable patterns for multilingual and multi-market products.' },
      { Icon: ShieldCheck, title: 'Regulated UX', body: 'Clear flows for compliance-heavy products and services.' },
    ],
    collaborationTitle: 'Direct senior collaboration for Benelux teams',
    collaborationBody:
      'We keep workshops structured, design decisions visible and handoff practical. Your team gets senior thinking without having to build a full design department first.',
    coverageTitle: 'Belgium coverage',
    coverage: ['Brussels', 'Antwerp', 'Ghent', 'Leuven', 'Liege', 'Benelux teams'],
    ctaTitle: 'Make a complex Belgian product easier to use',
    ctaBody:
      'Tell us where users are getting stuck. We will help you find the clearest route from product complexity to usable experience.',
    serviceLinks: [serviceLinks.uxUi, serviceLinks.strategy, serviceLinks.product, serviceLinks.systems],
    relatedLinks: [
      { label: 'Product design agency Netherlands', href: '/product-design-agency-netherlands' },
      { label: 'UX design agency for UK clients', href: '/ux-design-agency-uk' },
      { label: 'UX/UI design services', href: '/ux-ui-design-services' },
      { label: 'UX strategy consulting', href: '/ux-strategy-consulting' },
    ],
  },
  'minneapolis-ux-agency': {
    eyebrow: 'UX design for Minneapolis',
    title: 'Senior UX design for Minneapolis and Minnesota teams',
    intro:
      'UX/UI and product design for healthcare, fintech, retail technology and enterprise software teams across Minneapolis, St. Paul and Minnesota.',
    chips: ['Healthcare depth', 'Fintech and enterprise', 'Minnesota business hours', 'Remote senior team'],
    focal: 'center 38%',
    positioningTitle: "Disciplined UX for Minnesota's sophisticated product teams.",
    positioningBody:
      'Minnesota teams are pragmatic, outcome-focused and often working in serious industries. We bring the same discipline to product strategy, UX and interface design.',
    localTitle: 'Designed for healthcare, finance and enterprise scale',
    localBody:
      'The Twin Cities market is built around high-trust products. We design healthcare, fintech, retail and enterprise experiences that support adoption, comprehension and long-term product credibility.',
    sectorsTitle: 'Minnesota sectors we support',
    sectors: [
      { Icon: HeartPulse, title: 'Healthcare and life sciences', body: 'Patient apps, provider tools, clinical dashboards and operations software.' },
      { Icon: Landmark, title: 'Fintech and banking', body: 'Financial workflows, customer portals and decision-heavy platforms.' },
      { Icon: Sparkles, title: 'Retail technology', body: 'Commerce, loyalty, internal tools and customer-facing product experiences.' },
      { Icon: Building2, title: 'Enterprise software', body: 'Workflow systems and dashboards for established teams and power users.' },
    ],
    capabilitiesTitle: 'What Minneapolis teams ask us to do',
    capabilities: [
      { Icon: Compass, title: 'Research and strategy', body: 'Understand users, constraints and the design decisions worth making.' },
      { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'Clear, modern product interfaces for web and mobile.' },
      { Icon: Layers, title: 'Design systems', body: 'Pattern libraries for teams that need consistency at scale.' },
      { Icon: CheckCircle2, title: 'Usability validation', body: 'Prototype testing and practical refinement before build.' },
    ],
    collaborationTitle: 'Remote work with real overlap',
    collaborationBody:
      'We structure reviews around your working day, use Figma and Loom to reduce meeting load and keep product rationale documented for stakeholders and engineers.',
    coverageTitle: 'Minnesota coverage',
    coverage: ['Minneapolis', 'St. Paul', 'Rochester', 'Bloomington', 'Twin Cities startups', 'Remote Minnesota teams'],
    ctaTitle: 'Give your Minnesota product a clearer experience',
    ctaBody:
      'We can help you refine strategy, improve usability or design the interface your next product phase needs.',
    serviceLinks: [serviceLinks.uxUi, serviceLinks.product, serviceLinks.strategy, serviceLinks.systems],
    relatedLinks: [
      { label: 'Boston product design agency', href: '/boston-product-design-agency' },
      { label: 'Chicago UX design agency', href: '/chicago-ux-design-agency' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
      { label: 'Healthcare UX design agency', href: '/healthcare-ux-design-agency' },
    ],
  },
  'florida-ux-ui-design-agency': {
    eyebrow: 'UX/UI design for Florida',
    title: "UX/UI design for Florida's growing digital economy",
    intro:
      'Senior UX/UI and product design for businesses in Miami, Orlando, Tampa, Jacksonville and across Florida.',
    chips: ['Miami to Jacksonville', 'EST overlap', 'Mobile-first UX', 'Fintech and healthcare'],
    focal: 'center 45%',
    positioningTitle: 'World-class product design without a local-office search.',
    positioningBody:
      'Florida teams need fast, senior design support for products that span fintech, healthcare, hospitality and startup markets. We bring the capability without the hiring delay.',
    localTitle: 'Built for mobile, growth and trust',
    localBody:
      'Florida users and businesses expect polished, responsive digital experiences. We design products that work well on phones, scale to desktop and support high-intent user journeys.',
    sectorsTitle: 'Florida sectors we support',
    sectors: [
      { Icon: Landmark, title: 'Miami fintech', body: 'Payment, banking, investment and compliance experiences with clear trust cues.' },
      { Icon: HeartPulse, title: 'Healthcare', body: 'Patient journeys, provider tools and operational healthcare platforms.' },
      { Icon: Sparkles, title: 'Hospitality and travel tech', body: 'Booking, guest and service experiences designed for conversion and ease.' },
      { Icon: Rocket, title: 'Venture-backed startups', body: 'MVPs, product redesigns and design systems for growth-stage teams.' },
    ],
    capabilitiesTitle: 'What Florida teams bring us in to do',
    capabilities: [
      { Icon: MonitorSmartphone, title: 'Mobile-first UX/UI', body: 'Interfaces designed for real device behavior and responsive scale.' },
      { Icon: Compass, title: 'Product strategy', body: 'Shape the product direction before spending heavily on build.' },
      { Icon: Layers, title: 'Design systems', body: 'Reusable UI foundations for faster shipping.' },
      { Icon: ShieldCheck, title: 'Accessibility', body: 'Inclusive UX and WCAG-aware patterns built into the product experience.' },
    ],
    collaborationTitle: 'Structured EST-friendly remote delivery',
    collaborationBody:
      'Weekly check-ins, async walkthroughs and Figma collaboration keep momentum high. Your team sees every major decision and your developers get practical handoff documentation.',
    coverageTitle: 'Florida coverage',
    coverage: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Naples', 'Remote Florida teams'],
    ctaTitle: 'Build a better Florida digital product',
    ctaBody:
      'Whether you are a Miami fintech, Tampa healthcare company or Jacksonville startup, we can help clarify the product and design the experience.',
    serviceLinks: [serviceLinks.uxUi, serviceLinks.product, serviceLinks.strategy, serviceLinks.systems],
    relatedLinks: [
      { label: 'Jacksonville UX/UI design agency', href: '/jacksonville-ux-ui-design-agency' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
      { label: 'Product design agency', href: '/product-design-agency' },
      { label: 'UX strategy consulting', href: '/ux-strategy-consulting' },
    ],
  },
  'jacksonville-ux-ui-design-agency': {
    eyebrow: 'UX/UI design for Jacksonville',
    title: 'UX/UI design for Jacksonville and Northeast Florida',
    intro:
      'Senior UX/UI design for Jacksonville businesses in fintech, healthcare, logistics and enterprise software.',
    chips: ['Northeast Florida', 'Fintech and logistics', 'Healthcare UX', 'Remote senior design'],
    focal: 'center 45%',
    positioningTitle: "Product design for Jacksonville's high-trust industries.",
    positioningBody:
      'Jacksonville companies work in sectors where users need clarity and confidence. We design digital products that make complex workflows easier to understand and act on.',
    localTitle: 'Designed for finance, health and logistics',
    localBody:
      'From banking platforms to port-adjacent logistics and healthcare tools, Jacksonville products often need to simplify complex data and regulated interactions.',
    sectorsTitle: 'Jacksonville sectors we support',
    sectors: [
      { Icon: Landmark, title: 'Financial services', body: 'Banking, investment and payments workflows for high-trust products.' },
      { Icon: HeartPulse, title: 'Healthcare', body: 'Patient and provider experiences that make healthcare interactions clearer.' },
      { Icon: Network, title: 'Logistics', body: 'Tracking, control and operations dashboards for supply-chain teams.' },
      { Icon: Building2, title: 'Enterprise software', body: 'Internal systems and B2B tools that power complex organizations.' },
    ],
    capabilitiesTitle: 'What Jacksonville teams bring us in to do',
    capabilities: [
      { Icon: Compass, title: 'UX strategy and audits', body: 'Find the friction points and map a clearer product path.' },
      { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'Wireframes, prototypes and polished interface design.' },
      { Icon: BrainCircuit, title: 'AI product design', body: 'AI-enabled workflows users can interpret and trust.' },
      { Icon: CheckCircle2, title: 'Handoff', body: 'Clear specs, components and implementation guidance.' },
    ],
    collaborationTitle: 'Remote collaboration without the black box',
    collaborationBody:
      'Kickoffs, design reviews, Figma comments and video walkthroughs give your team full visibility. We keep decisions transparent and delivery practical.',
    coverageTitle: 'Northeast Florida coverage',
    coverage: ['Jacksonville', 'Northeast Florida', 'St. Augustine', 'Ponte Vedra', 'Florida startups', 'Remote US teams'],
    ctaTitle: 'Improve the experience behind your Jacksonville product',
    ctaBody:
      'Bring us the workflow, platform or customer journey that needs to work harder. We will help make it clearer.',
    serviceLinks: [serviceLinks.uxUi, serviceLinks.product, serviceLinks.strategy, serviceLinks.ai],
    relatedLinks: [
      { label: 'Florida UX/UI design agency', href: '/florida-ux-ui-design-agency' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
      { label: 'Texas AI development company', href: '/texas-ai-development-company' },
      { label: 'UX/UI design services', href: '/ux-ui-design-services' },
    ],
  },
  'chicago-ux-design-agency': {
    eyebrow: 'UX design for Chicago',
    title: 'UX design for Chicago fintech, insurance and enterprise teams',
    intro:
      'Senior UX strategy and product design for Chicago businesses that need sophisticated digital products for demanding users.',
    chips: ['Chicago and Midwest', 'Fintech', 'Insurance UX', 'Enterprise platforms'],
    focal: 'center 40%',
    positioningTitle: "Sophisticated UX for Chicago's complex business markets.",
    positioningBody:
      'Chicago products often combine financial data, insurance rules, healthcare workflows and enterprise adoption challenges. We make those systems easier to understand and use.',
    localTitle: 'Designed for power users and regulated workflows',
    localBody:
      'Whether the product supports trading, policy management, care operations or internal teams, we bring structure, hierarchy and usability to complex digital environments.',
    sectorsTitle: 'Chicago sectors we support',
    sectors: [
      { Icon: Landmark, title: 'Financial services', body: 'Trading, payments, investment and analytics interfaces with high information density.' },
      { Icon: ShieldCheck, title: 'Insurance', body: 'Policy, claims and customer journeys where clarity builds trust.' },
      { Icon: HeartPulse, title: 'Healthcare', body: 'Clinical, patient and operations products for healthcare organizations.' },
      { Icon: Building2, title: 'Enterprise SaaS', body: 'Workflow tools, dashboards and platforms for large teams.' },
    ],
    capabilitiesTitle: 'What Chicago teams bring us in to do',
    capabilities: [
      { Icon: Compass, title: 'UX audit and strategy', body: 'Diagnose product friction and define the highest-value changes.' },
      { Icon: MonitorSmartphone, title: 'UX/UI design', body: 'Interface design for web apps, portals and data-heavy platforms.' },
      { Icon: Layers, title: 'Design systems', body: 'Patterns and components that improve consistency across products.' },
      { Icon: CheckCircle2, title: 'Product redesigns', body: 'Modernize mature products without losing what already works.' },
    ],
    collaborationTitle: 'Clear remote design for Midwest teams',
    collaborationBody:
      'We combine live strategy sessions, async design reviews and well-documented handoff so your team can move without waiting for a local hire.',
    coverageTitle: 'Chicago coverage',
    coverage: ['Chicago', 'Midwest fintech', 'Insurance teams', 'Healthcare systems', 'Enterprise SaaS', 'Remote US teams'],
    ctaTitle: 'Make your Chicago product easier to adopt',
    ctaBody:
      'If your product is powerful but hard to use, we can help make the experience clearer, more modern and easier to sell.',
    serviceLinks: [serviceLinks.strategy, serviceLinks.uxUi, serviceLinks.product, serviceLinks.systems],
    relatedLinks: [
      { label: 'Boston product design agency', href: '/boston-product-design-agency' },
      { label: 'Minneapolis UX agency', href: '/minneapolis-ux-agency' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
      { label: 'Financial services UX design', href: '/financial-services-ux-design' },
    ],
  },
  'boston-product-design-agency': {
    eyebrow: 'Product design for Boston',
    title: "Product design for Boston's healthcare, biotech and fintech teams",
    intro:
      'Senior product design, UX research and interface design for Boston companies building serious digital products.',
    chips: ['Digital health', 'Biotech', 'Fintech', 'Enterprise software'],
    focal: 'center 40%',
    positioningTitle: "Design rigor for Boston's innovation economy.",
    positioningBody:
      'Boston teams build products where science, software and user trust intersect. We bring senior design thinking that matches the rigor of your engineering and domain expertise.',
    localTitle: 'Designed for high-stakes product categories',
    localBody:
      'Healthcare, biotech, fintech and enterprise software need more than polished screens. They need product structure, research-led decisions and interfaces that make complex systems usable.',
    sectorsTitle: 'Boston sectors we support',
    sectors: [
      { Icon: HeartPulse, title: 'Digital health', body: 'Patient apps, provider platforms and clinical tools designed around trust and safety.' },
      { Icon: BrainCircuit, title: 'Biotech and life sciences', body: 'Research, trial and data workflows that make scientific complexity easier to use.' },
      { Icon: Landmark, title: 'Fintech', body: 'Investment, payment and financial platforms with clear hierarchy and compliance-aware flows.' },
      { Icon: Building2, title: 'Enterprise software', body: 'Dashboards, cloud platforms and workflows for serious B2B users.' },
    ],
    capabilitiesTitle: 'What Boston teams bring us in to do',
    capabilities: [
      { Icon: Compass, title: 'Strategic product design', body: 'Define the right product problem before design execution starts.' },
      { Icon: MonitorSmartphone, title: 'End-to-end design', body: 'Wireframes, prototypes, high-fidelity UI and implementation support.' },
      { Icon: CheckCircle2, title: 'Research and validation', body: 'User insight and usability testing to reduce product risk.' },
      { Icon: BrainCircuit, title: 'AI product design', body: 'AI workflows that explain capability, uncertainty and next actions clearly.' },
    ],
    collaborationTitle: 'Senior product design without Boston hiring overhead',
    collaborationBody:
      'You get strategic design partnership, transparent collaboration and practical handoff without spending months searching for the right local senior designer.',
    coverageTitle: 'Boston coverage',
    coverage: ['Boston', 'Cambridge', 'Seaport', 'Kendall Square', 'Massachusetts startups', 'Remote US teams'],
    ctaTitle: 'Design a Boston product users can trust',
    ctaBody:
      'If you are building in healthcare, biotech, fintech or enterprise software, we can help turn complex product ambition into a usable interface.',
    serviceLinks: [serviceLinks.product, serviceLinks.strategy, serviceLinks.uxUi, serviceLinks.ai],
    relatedLinks: [
      { label: 'Chicago UX design agency', href: '/chicago-ux-design-agency' },
      { label: 'Minneapolis UX agency', href: '/minneapolis-ux-agency' },
      { label: 'Healthcare UX design agency', href: '/healthcare-ux-design-agency' },
      { label: 'AI development agency', href: '/ai-development-agency' },
    ],
  },
  'texas-ai-development-company': {
    eyebrow: 'AI product design for Texas',
    title: 'AI development and product design for Texas teams',
    intro:
      'Design-led AI product development for startups and enterprise teams in Austin, Houston, Dallas, San Antonio and across Texas.',
    chips: ['AI product strategy', 'Austin startups', 'Houston energy tech', 'Dallas enterprise'],
    focal: 'center 45%',
    positioningTitle: 'AI products need more than models. They need usable experiences.',
    positioningBody:
      'Texas companies are racing to add AI capability. We help turn that capability into interfaces, workflows and product experiences people can understand, trust and adopt.',
    localTitle: 'Designed for Texas scale and sector diversity',
    localBody:
      'AI use cases look different in Austin startups, Houston energy, Dallas enterprise and San Antonio defense or fintech. We design around the users, decisions and risk in each context.',
    sectorsTitle: 'Texas AI sectors we support',
    sectors: [
      { Icon: Rocket, title: 'Austin startups', body: 'AI MVPs, prototypes and product workflows for venture-backed teams.' },
      { Icon: Network, title: 'Energy technology', body: 'Forecasting, optimization and operational AI interfaces for energy teams.' },
      { Icon: Building2, title: 'Enterprise software', body: 'AI features inside CRM, ERP, analytics and workflow products.' },
      { Icon: HeartPulse, title: 'Healthcare and fintech', body: 'Decision-support products where trust, transparency and usability matter.' },
    ],
    capabilitiesTitle: 'What Texas teams bring us in to do',
    capabilities: [
      { Icon: BrainCircuit, title: 'AI product design', body: 'Shape AI features around real user tasks and trust needs.' },
      { Icon: Compass, title: 'AI + UX strategy', body: 'Define where AI should fit in the roadmap and where it should not.' },
      { Icon: MonitorSmartphone, title: 'Dashboard and workflow UI', body: 'Interfaces for model outputs, analytics and next-best actions.' },
      { Icon: CheckCircle2, title: 'Prototype to handoff', body: 'Testable flows, design specs and developer-ready product guidance.' },
    ],
    collaborationTitle: 'Remote AI collaboration with product discipline',
    collaborationBody:
      'We work across Texas time zones with structured reviews, async walkthroughs and clear documentation so founders, product leaders and engineers stay aligned.',
    coverageTitle: 'Texas coverage',
    coverage: ['Austin', 'Houston', 'Dallas', 'San Antonio', 'Texas startups', 'Enterprise teams'],
    ctaTitle: 'Turn your AI idea into a usable product',
    ctaBody:
      'Bring us the model, data workflow or product idea. We will help shape the experience around it so users know what to do next.',
    serviceLinks: [serviceLinks.ai, serviceLinks.product, serviceLinks.strategy, serviceLinks.uxUi],
    relatedLinks: [
      { label: 'AI development agency', href: '/ai-development-agency' },
      { label: 'Jacksonville UX/UI design agency', href: '/jacksonville-ux-ui-design-agency' },
      { label: 'Boston product design agency', href: '/boston-product-design-agency' },
      { label: 'UX/UI design agency for USA clients', href: '/ux-ui-design-agency-usa' },
    ],
  },
};

function isGeoPremiumSlug(slug: string): slug is GeoPremiumSlug {
  return geoPremiumSlugTuple.includes(slug as GeoPremiumSlug);
}

function getBodyImage(data: MarketingPageContent, match: string): MarketingImageSpec | undefined {
  return data.gallery?.find((image) => image.placement.toLowerCase().includes(match.toLowerCase()));
}

function getPrimaryImage(data: MarketingPageContent): MarketingImageSpec | undefined {
  return data.gallery?.[0];
}

function getProofImage(data: MarketingPageContent): MarketingImageSpec | undefined {
  return (
    getBodyImage(data, 'featured') ||
    data.gallery?.find((image) => image.file.toLowerCase().includes('case study')) ||
    data.gallery?.[1]
  );
}

function isPhotoAsset(image: MarketingImageSpec): boolean {
  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'team',
    'workshop',
    'collaborating',
    'collaboration',
    'studio',
    'office',
    'environment',
    'facilitating',
    'session',
    'whiteboard',
    'server room',
    'tech hub',
  ].some((term) => text.includes(term));
}

function isUiShowcase(image: MarketingImageSpec): boolean {
  if (isPhotoAsset(image)) return false;

  const text = `${image.file} ${image.placement} ${image.alt}`.toLowerCase();
  return [
    'ui',
    'interface',
    'dashboard',
    'screen',
    'screens',
    'wireframe',
    'prototype',
    'component',
    'design system',
    'style guide',
    'persona',
    'platform',
    'portal',
    'mobile app',
    'mockup',
    'product design',
  ].some((term) => text.includes(term));
}

const PremiumHero: React.FC<{
  config: GeoConfig;
  imageFile?: string;
  imageAlt?: string;
}> = ({ config, imageFile, imageAlt }) => (
  <section className="relative min-h-[640px] overflow-hidden bg-[#0c0d10] text-white">
    {imageFile ? (
      <img
        src={pageImageSrc(imageFile)}
        alt={imageAlt || ''}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        style={{ objectPosition: config.focal || 'center center' }}
      />
    ) : null}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(249,115,21,0.2),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.66)_52%,rgba(0,0,0,0.28))]" />
    <div className="relative z-10 container-custom flex min-h-[640px] items-end pb-14 pt-36 md:pt-40">
      <div className="max-w-4xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/70">{config.eyebrow}</p>
        <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {config.title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{config.intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={fallbackCta}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
          >
            Book a free strategy call
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View our work
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {config.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ShowcaseImage: React.FC<{
  image: MarketingImageSpec;
  aspect?: string;
  className?: string;
  presentation?: MediaPresentation;
}> = ({ image, aspect = 'aspect-[4/3]', className = '', presentation = 'auto' }) => {
  const ui = presentation === 'ui' || (presentation === 'auto' && isUiShowcase(image));

  if (ui) {
    return (
      <figure className={`relative ${className}`}>
        <img
          src={pageImageSrc(image.file)}
          alt={image.alt}
          className={`${aspect} w-full object-contain drop-shadow-[0_18px_38px_rgba(15,23,42,0.16)]`}
        />
      </figure>
    );
  }

  return (
    <figure className={`overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-100 shadow-2xl ${className}`}>
      <img src={pageImageSrc(image.file)} alt={image.alt} className={`${aspect} h-full w-full object-cover`} />
    </figure>
  );
};

const ValueCards: React.FC<{ cards: GeoCard[]; dark?: boolean }> = ({ cards, dark = false }) => (
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
    {cards.map(({ title, body, Icon = CheckCircle2 }) => (
      <article
        key={title}
        className={`rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-xl ${
          dark ? 'border-white/10 bg-white/[0.06] text-white' : 'border-gray-100 bg-white text-gray-950 shadow-sm'
        }`}
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl coral-gradient text-white">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-gray-600'}`}>{body}</p>
      </article>
    ))}
  </div>
);

const PositioningStrip: React.FC<{ config: GeoConfig }> = ({ config }) => (
  <section className="section-padding bg-white">
    <div className="container-custom grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Our value proposition</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
          {config.positioningTitle}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{config.positioningBody}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { Icon: Clock, title: 'Timezone fit', body: 'Useful business-hour overlap for reviews, decisions and momentum.' },
          { Icon: ShieldCheck, title: 'Senior team', body: 'Direct access to experienced product designers, not a junior-heavy bench.' },
          { Icon: Compass, title: 'Outcome led', body: 'Strategy, UX and UI decisions stay tied to product and business goals.' },
        ].map(({ Icon, title, body }) => (
          <article key={title} className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
            <Icon className="h-6 w-6 text-[#f97315]" />
            <h3 className="mt-5 text-lg font-black text-gray-950">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const LocalRelevanceSection: React.FC<{ config: GeoConfig; image?: MarketingImageSpec }> = ({ config, image }) => (
  <section className="section-padding bg-[#f8f5f1]">
    <div className={`container-custom grid items-center gap-10 ${image ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Local relevance</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.localTitle}</h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{config.localBody}</p>
      </div>
      {image ? <ShowcaseImage image={image} presentation="auto" /> : null}
    </div>
  </section>
);

const CapabilitiesSection: React.FC<{ config: GeoConfig }> = ({ config }) => (
  <section className="section-padding bg-[#101113] text-white">
    <div className="container-custom">
      <div className="mb-10 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Capabilities</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{config.capabilitiesTitle}</h2>
      </div>
      <ValueCards dark cards={config.capabilities} />
    </div>
  </section>
);

const SectorSection: React.FC<{ config: GeoConfig; image?: MarketingImageSpec }> = ({ config, image }) => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Sectors</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.sectorsTitle}</h2>
        </div>
        {image ? <ShowcaseImage image={image} aspect="aspect-[16/10]" presentation="auto" /> : null}
      </div>
      <ValueCards cards={config.sectors} />
    </div>
  </section>
);

const ServiceLinksSection: React.FC<{ links: ServiceLink[] }> = ({ links }) => (
  <section className="section-padding bg-[#f8f5f1]">
    <div className="container-custom">
      <div className="mb-10 max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Services</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
          Services that support location-led growth
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-xl font-black text-gray-950">{link.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{link.body}</p>
            <span className="mt-5 inline-flex items-center text-sm font-bold text-[#f97315]">
              Explore service
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const CollaborationSection: React.FC<{ config: GeoConfig }> = ({ config }) => (
  <section className="section-padding bg-white">
    <div className="container-custom grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Remote model</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">{config.collaborationTitle}</h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">{config.collaborationBody}</p>
      </div>
      <div className="rounded-[2rem] bg-gray-950 p-8 text-white shadow-2xl">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ['Figma', 'Live collaboration, comments, prototypes and developer-ready handoff.'],
            ['Loom', 'Async walkthroughs that keep decisions moving between meetings.'],
            ['Slack / email', 'Clear updates, decision trails and focused follow-through.'],
            ['Weekly reviews', 'Structured checkpoints aligned to your working day.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <h3 className="font-black">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CoverageSection: React.FC<{ config: GeoConfig }> = ({ config }) => (
  <section className="section-padding bg-[#101113] text-white">
    <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Coverage</p>
        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{config.coverageTitle}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {config.coverage.map((location) => (
          <div key={location} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
            <MapPin className="h-5 w-5 text-[#f97315]" />
            <span className="font-semibold">{location}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IntegratedCta: React.FC<{ config: GeoConfig; href: string }> = ({ config, href }) => (
  <section className="bg-white py-8">
    <div className="container-custom">
      <div className="overflow-hidden rounded-[2rem] bg-[#101113] p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_auto]">
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">{config.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-white/70">{config.ctaBody}</p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
          >
            Book a free strategy call
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const GeoPremiumPage: React.FC<{ data: MarketingPageContent; config: GeoConfig }> = ({ data, config }) => {
  const primaryImage = getPrimaryImage(data);
  const proofImage = getProofImage(data);
  const ctaHref = data.primaryCta?.href || fallbackCta;

  return (
    <PageShell showContact={false}>
      <PremiumHero config={config} imageFile={data.heroImage} imageAlt={data.heroImageAlt} />
      <PositioningStrip config={config} />
      <LocalRelevanceSection config={config} image={primaryImage} />
      <CapabilitiesSection config={config} />
      <SectorSection config={config} image={proofImage} />
      <ServiceLinksSection links={config.serviceLinks} />
      <CollaborationSection config={config} />
      <CoverageSection config={config} />
      <IntegratedCta config={config} href={ctaHref} />
      <MarketingFAQ items={data.faqs} />
      <MarketingInternalLinks links={config.relatedLinks} />
    </PageShell>
  );
};

export function renderGeoPremiumPage(data: MarketingPageContent): React.ReactNode | null {
  if (data.category !== 'geo' || !isGeoPremiumSlug(data.slug)) return null;
  return <GeoPremiumPage data={data} config={geoConfigs[data.slug]} />;
}
