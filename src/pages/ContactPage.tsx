import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

const calendarHref = 'https://calendly.com/sanddollardesign/intro';

const helpCards = [
  {
    title: 'UX Strategy & Research',
    body: 'Clarify customer needs, map journeys, validate ideas and reduce delivery risk.',
    links: [
      { label: 'UX strategy consulting', href: '/ux-strategy-consulting' },
      { label: 'UX research agency', href: '/ux-research-agency' },
    ],
  },
  {
    title: 'UX/UI & Product Design',
    body: 'Design websites, apps, platforms and internal tools that are easier to use and adopt.',
    links: [
      { label: 'UX/UI design services', href: '/ux-ui-design-services' },
      { label: 'Product design agency', href: '/product-design-agency' },
    ],
  },
  {
    title: 'AI Development & MVPs',
    body: 'Prototype and build AI-powered products, copilots and workflow tools for startups and innovation teams.',
    links: [{ label: 'AI development agency', href: '/ai-development-agency' }],
  },
  {
    title: 'Enterprise UX & Digital Transformation',
    body: 'Modernise complex systems, improve internal workflows and support capability building.',
    links: [{ label: 'Enterprise UX consulting', href: '/enterprise-ux-consulting' }],
  },
];

const markets = [
  { label: 'South Africa', href: '/ux-ui-design-agency-south-africa' },
  { label: 'USA', href: '/ux-ui-design-agency-usa' },
  { label: 'Florida', href: '/florida-ux-ui-design-agency' },
  { label: 'Jacksonville', href: '/jacksonville-ux-ui-design-agency' },
  { label: 'Minneapolis', href: '/minneapolis-ux-agency' },
  { label: 'UK', href: '/ux-design-agency-uk' },
  { label: 'Netherlands', href: '/product-design-agency-netherlands' },
  { label: 'Belgium', href: '/ux-agency-belgium' },
];

const industryLinks = [
  { label: 'Fintech', href: '/fintech-ux-design-agency' },
  { label: 'Banking / Financial Services', href: '/financial-services-ux-design' },
  { label: 'Healthcare', href: '/healthcare-ux-design-agency' },
  { label: 'NGOs', href: '/nonprofit-and-ngo-website-design' },
  { label: 'B2B e-commerce', href: '/b2b-ecommerce-ux-design' },
];

const faqs = [
  {
    question: 'Do you work with clients outside South Africa?',
    answer:
      'Yes. Sand Dollar Design works with clients in South Africa, the USA, the UK, the Netherlands and Belgium, using a remote-first collaboration model.',
  },
  {
    question: 'Can we book a free strategy call before deciding on a project?',
    answer:
      'Yes. You can book a free, commitment-free strategy call to discuss your website, product, platform or AI idea.',
  },
  {
    question: 'What types of projects are a good fit?',
    answer:
      'We’re a strong fit for UX strategy, UX research, UX/UI design, product design, AI MVP development, enterprise UX, website redesigns, app design and digital transformation UX.',
  },
  {
    question: 'Do you work with startups?',
    answer: 'Yes. We help startups validate ideas, design MVPs and build AI-powered products.',
  },
  {
    question: 'Do you work with enterprise teams?',
    answer:
      'Yes. We help enterprise teams improve complex workflows, internal tools, customer journeys and design capability.',
  },
  {
    question: 'Do you work with NGOs or nonprofits?',
    answer:
      'Yes. We help NGOs and nonprofits improve websites, supporter journeys, donor flows and digital service experiences.',
  },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sand Dollar Design',
  url: 'https://www.sanddollardesign.com',
  logo: 'https://www.sanddollardesign.com/Sand-Dollar_Logo.png',
  email: 'info@sanddollardesign.co.za',
  telephone: ['+27 72 824 4888', '+1 786 636 3972'],
  address: [
    {
      '@type': 'PostalAddress',
      name: 'Sand Dollar Design — South Africa',
      streetAddress: 'Pegasus Building 1, Menlyn Maine',
      addressLocality: 'Pretoria',
      postalCode: '0181',
      addressCountry: 'ZA',
    },
    {
      '@type': 'PostalAddress',
      name: 'Sand Dollar Design — United States',
      streetAddress: '74 E Glenwood Ave Unit #5901',
      addressLocality: 'Smyrna',
      addressRegion: 'DE',
      postalCode: '19977',
      addressCountry: 'US',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/sand-dollar-design/posts/?feedView=all',
    'https://www.facebook.com/sanddollarxd',
    'https://www.instagram.com/sanddollar.design/?hl=en',
    'https://x.com/sanddollarxd',
  ],
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sand Dollar Design',
  url: 'https://www.sanddollardesign.com/contact',
  email: 'info@sanddollardesign.co.za',
  telephone: '+27 72 824 4888',
  areaServed: ['South Africa', 'United States', 'United Kingdom', 'Netherlands', 'Belgium', 'Europe'],
  serviceType: ['UX Strategy', 'UX Research', 'UX/UI Design', 'Product Design', 'AI Development'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pegasus Building 1, Menlyn Maine',
    addressLocality: 'Pretoria',
    postalCode: '0181',
    addressCountry: 'ZA',
  },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    needHelpWith: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init('EdeMDiduxh2tdO30U');
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!formData.fullName || !formData.email || !formData.message) {
        setSubmitStatus('error');
        return;
      }

      await emailjs.send(
        'service_ihil4up',
        'template_ueizqz4',
        {
          from_name: formData.fullName,
          from_email: formData.email,
          reply_to: formData.email,
          company: formData.company || 'Not provided',
          need_help_with: formData.needHelpWith || 'Not provided',
          location: formData.location || 'Not provided',
          message: formData.message,
          to_name: 'Sand Dollar Design Team',
        },
        'EdeMDiduxh2tdO30U',
      );

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        company: '',
        needHelpWith: '',
        location: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Sand Dollar Design | UX/UI Design, Product Design & AI Development"
        description="Contact Sand Dollar Design for UX strategy, UX research, UX/UI design, product design and AI development. Offices in South Africa and the USA. Book a free strategy call."
        canonical="https://www.sanddollardesign.com/contact"
        type="organization"
        faq={faqs}
        extraJsonLd={[organizationJsonLd, professionalServiceJsonLd]}
      />
      <Helmet>
        <meta property="og:title" content="Contact Sand Dollar Design" />
        <meta
          property="og:description"
          content="Book a free strategy call with Sand Dollar Design to discuss UX strategy, UX research, UX/UI design, product design, AI development or digital transformation UX."
        />
      </Helmet>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[#101113] pt-36 text-white md:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.1),transparent_28%)]" />
          <div className="container-custom relative z-10 grid min-h-[580px] items-center gap-12 pb-20 lg:grid-cols-[0.66fr_0.34fr]">
            <div className="max-w-5xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#fb923c]">Contact Sand Dollar Design</p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Let’s talk about your digital product, platform or website
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
                Whether you’re improving an existing customer journey, redesigning a complex platform, validating a new product idea, or building an AI-powered MVP, we’d be happy to understand what you’re working on and suggest practical next steps.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={calendarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Book a free strategy call
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Send us a message
                </a>
              </div>
            </div>
            <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur lg:block">
              <Sparkles className="mb-10 h-8 w-8 text-[#fb923c]" strokeWidth={1.7} aria-hidden="true" />
              <p className="text-2xl font-black leading-tight">
                Senior UX, product design and AI development support for teams that need practical next steps.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]">
          <div className="container-custom">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Project fit</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">What can we help you with?</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                We work with startups, SMEs and enterprise teams across South Africa, the USA and Europe, with deep experience in fintech, banking, healthcare, NGOs, telco and B2B commerce.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {helpCards.map((card) => (
                <article key={card.title} className="flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <CheckCircle2 className="mb-5 h-7 w-7 text-[#f97315]" strokeWidth={1.8} aria-hidden="true" />
                  <h3 className="text-xl font-black text-gray-950">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{card.body}</p>
                  <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                    {card.links.map((link) => (
                      <Link key={link.href} to={link.href} className="text-sm font-bold text-[#f97315] underline-offset-4 hover:underline">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="section-padding bg-white">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Enquiry</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Send us a message</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Tell us briefly what you’re trying to improve, build or validate. We’ll respond with the most practical next step.
              </p>
              <p className="mt-5 text-base leading-relaxed text-gray-600">
                Prefer to book directly?{' '}
                <a href={calendarHref} target="_blank" rel="noopener noreferrer" className="font-bold text-[#f97315] underline-offset-4 hover:underline">
                  Book a free strategy call.
                </a>
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-[#f8f5f1] p-6 shadow-sm md:p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 rounded-2xl border border-green-300 bg-green-50 p-4 text-center text-green-800">
                  Thank you for your message. We’ll get back to you as soon as possible.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-center text-red-800">
                  Something went wrong. Please check the required fields or contact us directly.
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-bold text-gray-800">Full Name</label>
                    <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="form-input bg-white" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-800">Email</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="form-input bg-white" />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-bold text-gray-800">Company name</label>
                  <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className="form-input bg-white" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="needHelpWith" className="mb-2 block text-sm font-bold text-gray-800">What do you need help with?</label>
                    <select id="needHelpWith" name="needHelpWith" value={formData.needHelpWith} onChange={handleChange} className="form-input bg-white">
                      <option value="">Not sure yet</option>
                      <option>UX Strategy</option>
                      <option>UX Research</option>
                      <option>UX/UI Design</option>
                      <option>Product Design</option>
                      <option>AI Development</option>
                      <option>Website / App Development</option>
                      <option>Design Maturity / Capability Building</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-bold text-gray-800">Where are you based?</label>
                    <select id="location" name="location" value={formData.location} onChange={handleChange} className="form-input bg-white">
                      <option value="">Select region</option>
                      <option>South Africa</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Netherlands</option>
                      <option>Belgium</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold text-gray-800">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, timeline, and any useful context."
                    className="form-input min-h-[150px] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#101113] text-white">
          <div className="container-custom">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Locations</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">Our offices</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/65">
                We work remotely with clients across South Africa, the United States, the United Kingdom, the Netherlands and Belgium.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 md:p-8">
                <MapPin className="mb-5 h-7 w-7 text-[#fb923c]" aria-hidden="true" />
                <h3 className="text-2xl font-black">South Africa Office</h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  Sand Dollar Design — South Africa
                  <br />
                  Pegasus Building 1
                  <br />
                  Menlyn Maine
                  <br />
                  Pretoria, 0181
                  <br />
                  South Africa
                </p>
                <a href="tel:+27728244888" className="mt-5 inline-flex items-center font-bold text-white hover:text-[#fb923c]">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  +27 72 824 4888
                </a>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 md:p-8">
                <MapPin className="mb-5 h-7 w-7 text-[#fb923c]" aria-hidden="true" />
                <h3 className="text-2xl font-black">United States Office</h3>
                <p className="mt-4 leading-relaxed text-white/70">
                  Sand Dollar Design — United States
                  <br />
                  74 E Glenwood Ave Unit #5901
                  <br />
                  Smyrna, DE 19977
                  <br />
                  United States
                </p>
                <a href="tel:+17866363972" className="mt-5 inline-flex items-center font-bold text-white hover:text-[#fb923c]">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  +1 786 636 3972
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Markets</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Markets we serve</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Sand Dollar Design is a remote-first UX, product design and AI development partner serving clients in South Africa, the USA, the UK, the Netherlands and Belgium. We also support USA-based teams in Florida, Jacksonville, Minneapolis, Boston, Chicago and Texas.
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-2.5">
              {markets.map((market) => (
                <Link key={market.href} to={market.href} className="rounded-full border border-gray-200 bg-[#f8f5f1] px-4 py-2 text-sm font-bold text-gray-800 transition hover:border-[#f97315]/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97315]/35">
                  {market.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f97315]">Teams and sectors</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Who we help</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                We work with startups, SMEs and enterprise teams that need better digital products, clearer customer journeys and more usable platforms.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Industry experience: Fintech, banking, healthcare, NGOs, telco, FMCG and B2B e-commerce.
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-2.5">
              {industryLinks.map((industry) => (
                <Link key={industry.href} to={industry.href} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-800 shadow-sm transition hover:border-[#f97315]/40 hover:bg-[#fff8f3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97315]/35">
                  {industry.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="rounded-[2rem] bg-[#101113] p-8 text-white shadow-2xl md:p-12">
              <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-center">
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#fb923c]">What happens next</p>
                  <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">A practical first conversation</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {['We understand the product, audience and business goal.', 'We identify the highest-leverage next step.', 'You leave with a clearer path, whether or not we work together.'].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                      <span className="text-sm font-black text-[#fb923c]">{String(index + 1).padStart(2, '0')}</span>
                      <p className="mt-4 text-sm leading-relaxed text-white/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f8f5f1]">
          <div className="container-custom max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-black leading-tight tracking-tight text-gray-950 md:text-5xl">Contact FAQs</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="marketing-details group rounded-2xl border border-gray-200 bg-white shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-gray-950">
                    <span>{faq.question}</span>
                    <span className="text-xl leading-none text-[#f97315] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-gray-100 px-5 pb-5 pt-3 leading-relaxed text-gray-600">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ContactPage;
