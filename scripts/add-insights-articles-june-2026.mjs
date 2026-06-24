import fs from 'node:fs';
import pathFs from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = pathFs.dirname(fileURLToPath(import.meta.url));
const root = pathFs.join(__dirname, '..');
const articlesPath = pathFs.join(root, 'public/data/articles.json');

function estimateReadTime(html) {
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const newArticles = [
  {
    id: 'employee-experience-customer-experience-ai-20260605',
    title: 'Why Employee Experience May Be Your Biggest CX Opportunity',
    slug: 'employee-experience-customer-experience-ai',
    excerpt:
      'Many customer experience problems start behind the scenes. Better internal systems, employee workflows and AI-enabled tools can improve the experience customers receive.',
    metaTitle: 'Employee Experience and Customer Experience in the AI Era',
    metaDescription:
      'Many customer experience problems start inside the business. Learn why better employee experience, internal systems and AI workflows can improve CX.',
    author: 'Jaco van den Heever',
    publishDate: '2026-06-05',
    category: 'strategy',
    tags: ['Employee Experience', 'Customer Experience', 'Enterprise UX', 'AI', 'Digital Transformation'],
    featuredImage: '/images/pages/employee-experience-customer-experience-ai.png',
    imageAlt:
      'Team discussing AI-powered customer experience and employee workflows in a modern office.',
    featured: false,
    content: `<p>A lot of customer experience problems do not start with the customer. They start behind the scenes, inside the systems, processes and workflows employees use every day.</p>
<p>A staff member cannot find the right information. A system takes too many clicks. A customer history sits in one platform, while the next step sits somewhere else. A team member has to copy information into a spreadsheet because the official workflow does not support how the work actually happens.</p>
<p>The customer may never see that internal friction directly, but they feel the effect of it. They feel it when the response is slow, when they have to repeat themselves, when the person helping them sounds unsure, or when a simple request becomes a long process.</p>
<p>This is why employee experience is such an important part of customer experience.</p>
<p>At <a href="/">Sand Dollar Design</a>, we often say that internal software is part of the customer journey, even when customers never see it. The tools employees use shape the experience customers receive.</p>
<h2>The overlooked CX problem</h2>
<p>Many companies invest heavily in customer-facing apps, websites, portals and campaigns. That makes sense, because these touchpoints are visible and they often shape the first impression a customer has of the business.</p>
<p>But the internal systems behind those experiences are often neglected. Employees are expected to deliver excellent service while using fragmented workflows, outdated platforms, manual processes and tools that were never properly designed around the way people actually work.</p>
<p>That creates a hidden cost. It shows up in longer training times, more mistakes, slower handovers, duplicated effort, more support tickets and quiet workarounds that eventually become accepted as "just how things work here."</p>
<p>Over time, poor employee experience becomes poor customer experience.</p>
<h2>Where AI can help</h2>
<p>AI creates a real opportunity to improve this, but not because every internal process suddenly needs a chatbot. The bigger opportunity is helping employees get better context, faster.</p>
<p>Imagine a support agent, claims handler, healthcare administrator, sales consultant or operations team member who can quickly understand who the customer is, what has already happened, what information is missing and what the next best step should be. That kind of support can reduce the effort required from employees and improve the experience customers receive.</p>
<p>The goal is not to replace human judgement. The goal is to give people better context, clearer workflows and less unnecessary admin work, so they can focus on the part of the job where human judgement still matters.</p>
<h2>Start with the workflow, not the tool</h2>
<p>The biggest mistake is starting with the AI tool. A better starting point is the workflow.</p>
<p>Where do employees lose time? Where do they switch between systems? Where do they create workarounds? Where does the customer have to repeat information? Where does the process break down?</p>
<p>These are design questions before they are technology questions.</p>
<p>That is where <a href="/enterprise-ux-consulting">enterprise UX consulting</a> becomes valuable. Before adding AI, teams need to understand the current journey, the internal workflow and the real friction points employees face every day.</p>
<p>Only then does AI become useful.</p>
<h2>Better EX creates better CX</h2>
<p>If you want to improve customer experience, look at the tools and workflows your people use to create that experience. Customer-facing design matters, but the internal systems behind the experience matter just as much.</p>
<p>In the AI era, one of the biggest CX opportunities may be improving employee experience first. Better context for staff leads to better handovers, better decisions, faster service and more confident customer interactions.</p>
<p>At Sand Dollar Design, we help organisations improve customer and employee journeys through <a href="/ux-strategy-consulting">UX strategy</a>, enterprise UX, <a href="/ux-research-agency">UX research</a> and <a href="/ai-development-agency">AI-enabled product development</a>.</p>`,
  },
  {
    id: 'ai-customer-experience-broken-journeys-20260614',
    title: 'AI Will Not Fix a Broken Customer Journey',
    slug: 'ai-customer-experience-broken-journeys',
    excerpt:
      'AI can improve customer experience, but it will not fix a broken journey. The real work is designing the customer journey, data, handoffs and human escalation properly.',
    metaTitle: 'AI Customer Experience: Why AI Will Not Fix Broken Journeys',
    metaDescription:
      'AI can improve customer experience, but only when it is designed around real customer needs, workflows and human judgement.',
    author: 'Jaco van den Heever',
    publishDate: '2026-06-14',
    category: 'ux',
    tags: ['AI', 'Customer Experience', 'Chatbots', 'UX Strategy', 'Product Design'],
    featuredImage: '/images/pages/ai-customer-experience-broken-journeys.png',
    imageAlt:
      'CX team reviewing an AI chatbot journey and customer friction points in a modern meeting room.',
    featured: false,
    content: `<p>Many organisations are rushing to add AI to customer experience. That is understandable, because AI can answer questions, summarise information, personalise interactions, support employees and speed up service.</p>
<p>Used well, AI can reduce effort for both customers and the people serving them. But there is one important thing leaders need to remember: AI will not fix a broken customer journey.</p>
<p>In some cases, it may even make the broken parts more obvious.</p>
<h2>The chatbot problem</h2>
<p>Many customers have already experienced this. They open a chatbot expecting help, but instead they get a narrow list of options, repeated answers and no clear way to reach a person when the issue becomes more complex.</p>
<p>The frustrating part is that this often happens even though the technology available today is capable of much more natural, useful and context-aware conversations. In many large corporate environments, the experience still feels like an old decision tree with a more modern label.</p>
<p>This is especially common in complex sectors such as banking, insurance, financial services and healthcare. The promise of AI is big, but the actual customer experience often remains limited, rigid and difficult to escape.</p>
<h2>The issue is the surrounding experience</h2>
<p>A good AI experience depends on more than the model. It depends on the quality of the journey around it.</p>
<p>Can the AI access the right data? Does it understand the customer's context? Does it know what the customer is trying to achieve? Can it explain options clearly? Does it know when the issue should be escalated to a person? Has the journey been tested with real users?</p>
<p>If the answer is no, the AI will probably disappoint. It may respond quickly and sound polished, but that does not mean it is helping the customer solve the problem.</p>
<h2>Start with the customer need</h2>
<p>Before adding AI to a customer journey, leaders should ask a few simple questions. What problem are we trying to solve? Where are customers getting stuck? What information do they need? Where do they need reassurance? Where should a human still be involved?</p>
<p>These questions matter more than the tool.</p>
<p>At <a href="/">Sand Dollar Design</a>, we approach AI as part of the customer experience system, not as a layer that gets added at the end. That means looking at the journey, the internal workflow, the data, the handoffs and the customer's emotional state.</p>
<p>Only then can AI become genuinely useful.</p>
<h2>AI should reduce effort, not hide the company</h2>
<p>The best AI experiences do not make customers feel trapped. They make the journey easier, clearer and more useful.</p>
<p>Good AI can help people get answers faster, reduce repetition, explain complex information more clearly and support employees with better context. It should also know when to step back and let a person take over.</p>
<p>That is the difference between AI as automation and AI as customer experience. One tries to remove effort from the business. The other removes effort from the customer.</p>
<h2>Design still matters</h2>
<p>AI changes what is possible, but it does not remove the need for good design. In fact, it makes design more important.</p>
<p>The more powerful the technology becomes, the more carefully we need to design how it behaves, where it appears, what information it can access, what it should say and when it should hand over to a human.</p>
<p>AI can make customer experience faster. Design makes sure it is actually better.</p>
<p>Sand Dollar Design helps teams improve AI-enabled customer journeys through <a href="/ux-strategy-consulting">UX strategy</a>, <a href="/product-design-agency">product design</a> and <a href="/ai-development-agency">AI development</a>.</p>`,
  },
  {
    id: 'ai-product-discovery-ux-research-prototyping-20260622',
    title: 'From Research to Working Prototype: How AI Is Changing Product Discovery',
    slug: 'ai-product-discovery-ux-research-prototyping',
    excerpt:
      'AI is changing product discovery by helping teams move faster from research data to insights, working prototypes and better product decisions.',
    metaTitle: 'AI Product Discovery: From UX Research to Working Prototype',
    metaDescription:
      'AI is helping product teams move faster from customer research to insights, prototypes and better product decisions.',
    author: 'Jaco van den Heever',
    publishDate: '2026-06-22',
    category: 'ux',
    tags: ['Product Discovery', 'UX Research', 'Prototyping', 'AI', 'Product Design'],
    featuredImage: '/images/pages/ai-product-discovery-ux-research-prototyping.png',
    imageAlt:
      'Product team reviewing user research, prototype screens and mobile app designs during a product discovery session.',
    featured: true,
    content: `<p>Product discovery used to move in a fairly predictable sequence. Teams would do research, synthesise findings, create wireframes, move into high-fidelity design, build a clickable prototype, hand it over to development, and only then get closer to testing something that felt like the real product.</p>
<p>That process still has value. There are many projects where structured research, wireframes and prototypes remain the right way to reduce risk and align teams.</p>
<p>But AI is changing the rhythm of product discovery. The biggest shift is not that AI "does the design." The shift is that AI helps teams move faster from customer evidence to something people can actually test.</p>
<h2>Research synthesis is much faster</h2>
<p>User research creates a lot of messy data. In a typical project, there may be interview notes, transcripts, usability test observations, survey responses, stakeholder comments, journey maps and product assumptions.</p>
<p>A few years ago, analysing all of that properly was slow and manual. Teams had to transcribe, tag, cluster, compare and synthesise everything by hand before the real product decisions could happen.</p>
<p>That human thinking still matters, but AI now helps us get to the first layer of structure much faster. It can help identify recurring themes, summarise comments, group similar issues, compare user types and highlight patterns that deserve deeper attention.</p>
<p>This gives the team more time to focus on the important questions. What does this mean? Which problems matter most? What should change? What should we test next?</p>
<h2>Prototypes can become more realistic earlier</h2>
<p>AI is also changing prototyping. Traditionally, teams tested wireframes or clickable Figma prototypes before moving into development. That is still useful, especially early in a project when the main goal is to explore structure, flow and user understanding.</p>
<p>But AI-assisted development now makes it possible to create working prototypes much sooner. In some cases, teams can test something that feels much closer to the final product, with real interactions, realistic data, working logic and enough functionality for users to behave more naturally.</p>
<p>That changes the quality of feedback. People respond differently when they are using something that feels real. They are not just commenting on a screen, they are trying to complete a task.</p>
<p>That kind of testing gives product teams better evidence because users are engaging with something closer to the experience they would actually use.</p>
<h2>The goal is better decisions</h2>
<p>The real value of AI in product discovery is not speed alone. Speed is only useful when it helps the team make better decisions.</p>
<p>AI can help teams analyse research faster, explore more options, prototype sooner and test ideas earlier. But the judgement still needs to come from people who understand the customer, the business goal and the product context.</p>
<p>The risk is building faster than you are learning. The opportunity is learning faster before you build too much.</p>
<h2>Discovery is becoming more practical</h2>
<p>For startups, this can reduce wasted build effort. For enterprise teams, it can help test internal workflows, customer journeys and new product ideas before committing to a full delivery roadmap.</p>
<p>For product leaders, it creates a shorter path between insight and evidence. That is where AI becomes genuinely useful.</p>
<p>Not as a shortcut around research and design, but as a way to make research and design more practical, more testable and more closely connected to real product decisions.</p>
<p><a href="/">Sand Dollar Design</a> helps teams move from insight to implementation through <a href="/ux-research-agency">UX research</a>, <a href="/product-design-agency">product design</a>, <a href="/ux-ui-design-services">UX/UI design</a> and <a href="/ai-development-agency">AI-enabled MVP development</a>.</p>`,
  },
];

for (const article of newArticles) {
  article.readTime = estimateReadTime(article.content);
}

const existing = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const existingSlugs = new Set(existing.map((a) => a.slug || a.title));

const toAdd = newArticles.filter((a) => !existingSlugs.has(a.slug));
if (toAdd.length === 0) {
  console.log('All articles already present; nothing to add.');
  process.exit(0);
}

const merged = [...existing, ...toAdd];
fs.writeFileSync(articlesPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Added ${toAdd.length} article(s):`, toAdd.map((a) => a.slug).join(', '));
console.log('Total articles:', merged.length);
