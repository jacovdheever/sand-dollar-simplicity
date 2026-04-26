import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pageImageSrc } from '@/components/marketing/pageImageSrc';
import { FEATURED_CASE_STUDIES_GRID } from '@/data/featuredCaseStudiesGrid';
import { cn } from '@/lib/utils';

const DEFAULT_EYEBROW = 'Featured case studies';
const DEFAULT_HEADING = 'In-depth case studies';
const DEFAULT_INTRO =
  'Explore three detailed case studies showing how Sand Dollar Design applies UX strategy, UX research, product design and UI design to complex digital products and platforms.';

const HOME_INTRO =
  'Explore selected case studies across fintech, banking and B2B e-commerce — from mobile app redesign to enterprise data platforms and wholesale ordering experiences.';

type FeaturedCaseStudiesGridProps = {
  /** Section id, e.g. `featured-work` (home) or `featured-case-studies` (projects) */
  id?: string;
  className?: string;
  backgroundClassName?: string;
  /** Defaults match /projects. Use `variant="home"` for homepage intro copy. */
  variant?: 'default' | 'home';
  eyebrow?: string;
  heading?: string;
  intro?: string;
};

/**
 * 3-column case study cards — same static content and layout as the `/projects` page block (not the carousel / DB-driven `FeaturedCaseStudies` component).
 */
const FeaturedCaseStudiesGrid: React.FC<FeaturedCaseStudiesGridProps> = ({
  id = 'featured-case-studies',
  className,
  backgroundClassName = 'bg-[#f8f5f1]',
  variant = 'default',
  eyebrow = DEFAULT_EYEBROW,
  heading = DEFAULT_HEADING,
  intro,
}) => {
  const introText = intro ?? (variant === 'home' ? HOME_INTRO : DEFAULT_INTRO);

  return (
    <section
      className={cn('section-padding', backgroundClassName, className)}
      id={id}
      aria-labelledby="featured-case-studies-heading"
    >
      <div className="container-custom">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">{eyebrow}</p>
        <h2 id="featured-case-studies-heading" className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{introText}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURED_CASE_STUDIES_GRID.map((item) => (
            <Link
              key={item.caseStudyUrl}
              to={item.caseStudyUrl}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f97315]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img
                  src={pageImageSrc(item.imageFile)}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97315]">{item.industry}</p>
                <p className="mt-2 text-sm font-bold text-gray-950">{item.client}</p>
                <h3 className="mt-2 text-lg font-black leading-snug text-gray-950 group-hover:text-[#f97315] group-focus-visible:text-[#f97315] md:text-xl">
                  {item.headline}
                </h3>
                <p className="mt-3 grow text-sm leading-relaxed text-gray-600">{item.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Project focus areas">
                  {item.tags.map((t) => (
                    <li key={t} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-gray-950">
                  View case study
                  <ArrowRight className="ml-1 h-4 w-4 text-[#f97315] transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudiesGrid;
