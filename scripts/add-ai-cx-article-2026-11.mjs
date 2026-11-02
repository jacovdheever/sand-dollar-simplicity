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

const article = {
  id: 'ai-in-customer-experience-ux-strategy-20261102',
  title: 'AI in Customer Experience: Why Better UX Matters More Than Another Chatbot',
  slug: 'ai-in-customer-experience-ux-strategy',
  excerpt:
    'AI is changing how companies design, build and deliver customer experiences. The biggest opportunities often have less to do with the technology itself and more to do with understanding where customers struggle.',
  metaTitle: 'AI in Customer Experience: Why UX Matters',
  metaDescription:
    'AI in customer experience works when it reduces friction. Explore UX research, journey design and practical AI development for better customer experiences.',
  openGraphTitle: "AI Won't Fix a Broken Customer Journey | Sand Dollar Design",
  openGraphDescription:
    'Better AI customer experiences begin with better UX. Explore onboarding, research, chatbots, employee workflows and practical implementation.',
  author: 'Jaco van den Heever',
  authorRole: 'Founder & CEO, Sand Dollar Design',
  publishDate: '2026-11-02',
  category: 'strategy',
  tags: [
    'AI in customer experience',
    'UX strategy',
    'UX research',
    'AI development',
    'Employee experience',
    'Customer journey',
  ],
  featuredImage: '/images/pages/ai-in-customer-experience-ux-strategy.jpg',
  imageAlt:
    'Minimalist poster reading AI heart CX, with an orange heart between the letters AI and CX.',
  featured: true,
  content: `<p><em>AI is changing how companies design, build and deliver customer experiences. The biggest opportunities often have less to do with the technology itself and more to do with understanding where customers struggle.</em></p>
<p>A company can invest heavily in AI, launch an intelligent chatbot, automate parts of its customer journey and still deliver a frustrating experience.</p>
<p>I've seen versions of this problem throughout my career in digital product design and customer experience. Technology improves, interfaces become more sophisticated, but many of the underlying problems remain.</p>
<p>Customers still struggle to find information. Onboarding still demands unnecessary effort. Employees still navigate disconnected systems. And support chatbots still struggle with questions that fall outside their predefined options.</p>
<p>AI creates an enormous opportunity to improve these experiences. But it also creates the temptation to automate an existing problem rather than solve it.</p>
<p>I recently spoke with <a href="https://thecxlead.com/customer-experience-management/jaco-van-den-heever/" target="_blank" rel="noopener noreferrer">The CX Lead about AI and the future of customer experience</a>. A central theme was something I feel strongly about: <strong>the real value of AI in customer experience comes from making journeys easier, reducing friction and helping people get things done.</strong></p>
<p>That requires more than technology. It requires <a href="/ux-strategy-consulting">UX strategy</a>, customer research, thoughtful product design and a clear understanding of the problem being solved.</p>
<h2>Why AI in customer experience needs to start with the customer journey</h2>
<p>Many organisations approach AI by asking where the technology could be introduced.</p>
<p>Could we add a chatbot? Automate a support interaction? Generate personalised recommendations? Introduce an AI assistant into an application?</p>
<p>These are reasonable questions, but they assume that the existing customer journey is the right starting point.</p>
<p>A better approach is to understand how customers experience the product or service today. Where do they abandon a process? Which tasks take too much effort? Where do people become confused, repeat information or need help?</p>
<p>These are the opportunities that <a href="/ux-research-agency">UX research and usability testing</a> can help uncover.</p>
<p>For example, if customers abandon a financial services application because onboarding is complicated, adding a chatbot may achieve very little. Redesigning the flow so that customers can complete it with less effort could have a far greater impact.</p>
<p>AI might support that redesign by helping interpret information, prepopulate fields, explain requirements or guide users through complex decisions. The difference is that the technology now has a clear purpose.</p>
<p><strong>The customer problem should determine the AI application, rather than the AI application determining the experience.</strong></p>
<h2>Four practical ways AI can improve customer experience</h2>
<h3>1. Reduce friction during customer onboarding</h3>
<p>Onboarding is one of the clearest opportunities to apply AI to customer experience.</p>
<p>Many digital products expect people to do substantial work before they receive any value. Users have to complete forms, understand unfamiliar terminology, create profiles or configure settings.</p>
<p>One example comes from a B2B SaaS marketplace I co-founded for experienced professionals. Senior professionals often have decades of valuable experience, but translating that experience into a compelling, structured professional profile takes effort.</p>
<p>The traditional approach asks people to start with a blank form and write everything themselves. Instead, we designed an AI-assisted profile creation experience that can work from CV content, LinkedIn profile information or conversational input to help users create their profiles.</p>
<p>The user remains involved in reviewing and refining the result. The objective is to reduce the effort needed to reach the useful part of the product.</p>
<p>That is the point of <a href="/ai-development-agency">UX-led AI development</a>: start with a real task, design a better way to complete it and use AI where it improves the experience.</p>
<p><strong>How much work are you asking customers to do that your product could reasonably help them with?</strong></p>
<h3>2. Use AI to accelerate UX research and identify friction</h3>
<p>UX research helps teams understand what customers actually experience instead of relying entirely on internal assumptions.</p>
<p>A research project can produce substantial information from interviews, surveys, usability tests, support interactions and customer feedback. Making sense of it takes time.</p>
<p>AI can help researchers organise transcripts, identify recurring topics, compare feedback across user groups and explore patterns worth investigating further. That can leave more time for interpreting the findings and deciding what should change.</p>
<p>But organising evidence and understanding what it means are two different activities. AI-generated summaries can miss context, overlook contradictory evidence or make weak observations sound conclusive.</p>
<p><a href="https://www.nngroup.com/articles/research-with-ai/" target="_blank" rel="noopener noreferrer">Nielsen Norman Group's guidance on AI-assisted research</a> makes a similar distinction: AI can support research tasks, particularly planning and analysis, but its output needs expert review.</p>
<p>At Sand Dollar Design, the goal is to use AI to assist researchers while keeping research interpretation, validation and strategic recommendations grounded in human expertise.</p>
<h3>3. Test realistic customer experiences before committing to full development</h3>
<p>One of the biggest changes AI is bringing to product development is the speed at which teams can move from an idea to a working prototype.</p>
<p>Historically, designers often moved from wireframes to visual mockups and clickable prototypes before handing the work over to development. Those methods are still useful, but AI-assisted development allows teams to create more functional prototypes much earlier.</p>
<p>Instead of showing someone only a sequence of screens, we can sometimes test real interactions, realistic data, working forms and elements of the underlying application logic.</p>
<p>For startups, this can mean testing assumptions before investing heavily in a full build. For enterprise innovation teams, it creates a practical way to explore new digital services, internal tools and customer-facing applications with smaller initial commitments.</p>
<p>There is still a difference between a working prototype and production-ready software. Security, accessibility, performance, integrations, data protection and quality assurance all require proper attention.</p>
<p>Good <a href="/product-design-agency">product design and prototyping</a> help teams learn sooner without confusing a convincing demonstration with a validated product.</p>
<p><strong>The opportunity is to shorten the distance between understanding a problem and putting a credible solution in front of real users.</strong></p>
<h3>4. Improve employee experience to improve customer experience</h3>
<p>Some of the most expensive customer experience problems are hidden inside internal business systems.</p>
<p>A customer contacts a support team with a straightforward question. The employee must search multiple platforms, retrieve information from different sources and piece together the customer's history before responding.</p>
<p>The customer experiences slow service. The employee experiences a fragmented, frustrating process.</p>
<p>This is why employee experience (EX) deserves much more attention in discussions about AI and customer experience (CX).</p>
<p>AI can help employees retrieve relevant information, summarise histories, navigate complex systems and prepare recommended next steps. Combined with <a href="/enterprise-ux-consulting">enterprise UX consulting</a>, these capabilities can make everyday workflows clearer and help employees serve customers more effectively.</p>
<p>Before investing in another customer-facing AI application, examine the tools and workflows used by the people who deliver the service.</p>
<p>Improving employee experience can be one of the most practical ways to improve customer experience.</p>
<h2>Why so many corporate AI chatbots still disappoint</h2>
<p>Despite the progress in AI, many customer-facing chatbots still feel remarkably similar to the decision-tree systems of a decade ago.</p>
<p>A customer asks a question. The bot offers predefined options. The customer selects the closest match, but the system fails to understand the actual problem. Eventually, the customer asks for a human.</p>
<p>The problem is often bigger than the language model.</p>
<p>A useful AI assistant needs relevant information, appropriate integrations, clear business rules, customer context and reliable escalation options. It also needs to be designed around the tasks customers are trying to complete.</p>
<p>Consider someone querying an unexpected bank transaction. A useful assistant might help the customer understand what they are seeing, explain available options and guide them to the right next step.</p>
<p>If the situation requires an investigation, involves sensitive details or suggests fraud, the system should support an effective handover to an authorised employee. That handover should preserve the necessary context so the customer does not have to explain everything again.</p>
<p>This is a <a href="/ux-ui-design-services">UX and interaction design</a> challenge as much as it is an AI development challenge.</p>
<p>The goal is not merely a more convincing conversation. It is a more useful customer experience.</p>
<h2>Where AI should assist and where humans should remain accountable</h2>
<p>AI can be useful for information retrieval, summarisation, drafting, identifying patterns and reducing repetitive administration. But some decisions require more than information processing.</p>
<p>Customer complaints, financial disputes, medical situations and complex service recovery can involve emotional, ethical, legal or commercial considerations. AI can help prepare information and surface options, but human professionals should remain accountable for sensitive decisions.</p>
<p>The <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer">NIST AI Risk Management Framework</a> provides a useful reference for thinking about AI trustworthiness, risk and appropriate governance.</p>
<p>For organisations adopting AI, a better question than 'How much human involvement can we remove?' is: <strong>Which activities benefit from automation, where is oversight necessary, and how do we design the complete experience to serve people better?</strong></p>
<h2>A practical framework for introducing AI into customer journeys</h2>
<p>Organisations do not need to begin with a large AI transformation programme. A focused pilot can provide valuable evidence before a larger investment.</p>
<h3>Step 1. Identify one customer or employee journey</h3>
<p>Choose a journey where users experience measurable difficulty, unnecessary effort or frequent support needs. Avoid starting with a vague ambition to introduce AI across the business.</p>
<h3>Step 2. Investigate the underlying friction</h3>
<p>Use user interviews, journey mapping, analytics and stakeholder research to understand why the problem exists. Is it a confusing interface, inefficient process, missing information or a genuine opportunity for intelligent assistance?</p>
<h3>Step 3. Define what better looks like</h3>
<p>Set an outcome before developing anything. That might be lower onboarding abandonment, shorter task time, reduced customer effort or more consistent support responses.</p>
<h3>Step 4. Prototype and test with real users</h3>
<p>Create a focused working concept. Use realistic tasks and appropriate data to evaluate usability, AI output quality, transparency and human handover before a broader rollout.</p>
<h3>Step 5. Measure, improve and expand</h3>
<p>Evaluate the solution against the original customer and business outcomes. Review reliability, accessibility, security and operating risks. Expand only when there is evidence that the approach works.</p>
<p>This is where UX research, strategy, design and AI development belong together. The technology helps teams explore and build. The research and design process helps them build something useful.</p>
<h2>Frequently asked questions about AI in customer experience</h2>
<h3>How can AI improve customer experience?</h3>
<p>AI can reduce repetitive tasks, simplify onboarding, help customers find relevant information, support personalised interactions and improve access to assistance. The best opportunities usually start with a known source of friction in the customer journey.</p>
<h3>Is AI replacing UX research and design?</h3>
<p>AI is changing how teams work, particularly in research preparation, synthesis support, prototyping and development. Understanding users, interpreting evidence, making product decisions and designing trustworthy interactions still need human expertise.</p>
<h3>Do businesses need an AI chatbot to improve customer experience?</h3>
<p>No. AI can be applied to onboarding, internal workflows, information retrieval, customer support, product discovery and other activities. A chatbot is worth building only when conversation is a genuinely useful way to complete the task.</p>
<h3>How should companies begin implementing AI in customer experience?</h3>
<p>Start with one well-understood customer problem. Research the experience, define an outcome, prototype an improvement, test it with representative users and measure the result before expanding.</p>
<h2>Building better customer experiences with UX-led AI development</h2>
<p>AI is changing what businesses can build and how quickly they can build it. That creates opportunities for startups and enterprises, but it also makes it easier to invest in features customers do not need.</p>
<p>At Sand Dollar Design, we bring together <a href="/ux-strategy-consulting">UX strategy</a>, <a href="/ux-research-agency">UX research</a>, <a href="/product-design-agency">product design</a> and <a href="/ai-development-agency">AI development</a> to help organisations understand problems, validate ideas and create better digital products.</p>
<p>Our work includes improving existing customer journeys, modernising complex platforms and developing AI-enabled applications. The starting point remains the same: understand the people who will use the product and the problems that matter to them.</p>
<p>Faster development only matters when it helps create something worth building.</p>
<p><strong>Have a customer journey, internal workflow or product idea that AI could help improve?</strong></p>
<p><a href="https://calendly.com/sanddollardesign/intro" target="_blank" rel="noopener noreferrer">Book a free strategy conversation with Sand Dollar Design</a> to explore where better UX and practical AI development could make a difference.</p>
<p><em>This original article expands on themes discussed in Jaco van den Heever's <a href="https://thecxlead.com/customer-experience-management/jaco-van-den-heever/" target="_blank" rel="noopener noreferrer">interview with Sugandha Mahajan for The CX Lead</a>, published 26 August 2026.</em></p>`,
};

article.readTime = estimateReadTime(article.content);

const existing = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const already = existing.find((a) => a.slug === article.slug);

if (already) {
  Object.assign(already, article);
  fs.writeFileSync(articlesPath, JSON.stringify(existing, null, 2), 'utf8');
  console.log('Updated existing article:', article.slug);
} else {
  existing.push(article);
  fs.writeFileSync(articlesPath, JSON.stringify(existing, null, 2), 'utf8');
  console.log('Added article:', article.slug);
}

console.log('Total articles:', existing.length);
console.log('Read time:', article.readTime, 'min');
