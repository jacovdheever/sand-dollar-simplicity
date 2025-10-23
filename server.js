import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import puppeteer from 'puppeteer';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for large content
app.use(express.static('public'));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'public', 'data');
const designsDir = path.join(__dirname, 'public', 'designs');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);
fs.mkdir(designsDir, { recursive: true }).catch(console.error);

// Routes
app.post('/api/save-articles', async (req, res) => {
  try {
    const articles = req.body;
    const filePath = path.join(dataDir, 'articles.json');
    await fs.writeFile(filePath, JSON.stringify(articles, null, 2));
    res.json({ success: true, message: 'Articles saved successfully' });
  } catch (error) {
    console.error('Error saving articles:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/load-articles', async (req, res) => {
  try {
    const filePath = path.join(dataDir, 'articles.json');
    const data = await fs.readFile(filePath, 'utf8');
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json([]); // Return empty array if file doesn't exist
    } else {
      console.error('Error loading articles:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

app.post('/api/save-projects', async (req, res) => {
  try {
    const projects = req.body;
    const filePath = path.join(dataDir, 'projects.json');
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
    res.json({ success: true, message: 'Projects saved successfully' });
  } catch (error) {
    console.error('Error saving projects:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/load-projects', async (req, res) => {
  try {
    const filePath = path.join(dataDir, 'projects.json');
    const data = await fs.readFile(filePath, 'utf8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json([]); // Return empty array if file doesn't exist
    } else {
      console.error('Error loading projects:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

// Contact Information Extraction Function
function extractContactInfo($, url) {
  const contactInfo = {
    emails: [],
    phones: [],
    addresses: [],
    socialMedia: [],
    contactForms: [],
    businessHours: [],
    locations: []
  };

  // Get all text content
  const pageText = $.text();
  const pageHtml = $.html();
  
  console.log(`Extracting contact info from ${url}`);
  console.log(`Page text length: ${pageText.length}`);

  // Extract emails - comprehensive approach
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  
  // Method 1: Standard regex on all text
  const emailMatches = pageText.match(emailRegex);
  if (emailMatches) {
    contactInfo.emails = [...new Set(emailMatches)]; // Remove duplicates
    console.log(`Found emails in text: ${contactInfo.emails.length}`);
  }
  
  // Method 2: Look for any text containing "@" symbol (more aggressive)
  const linesWithAt = pageText.split('\n').filter(line => line.includes('@'));
  linesWithAt.forEach(line => {
    const matches = line.match(emailRegex);
    if (matches) {
      contactInfo.emails.push(...matches);
    }
  });
  
  // Method 3: Check HTML attributes and elements
  $('*[href*="mailto:"], *[data-email], *[class*="email"], *[id*="email"], *[class*="contact"], *[id*="contact"]').each((_, element) => {
    const href = $(element).attr('href');
    const dataEmail = $(element).attr('data-email');
    const text = $(element).text().trim();
    
    if (href && href.includes('mailto:')) {
      const email = href.replace('mailto:', '').split('?')[0].trim();
      if (email && emailRegex.test(email)) {
        contactInfo.emails.push(email);
      }
    }
    if (dataEmail && emailRegex.test(dataEmail)) {
      contactInfo.emails.push(dataEmail);
    }
    if (text && emailRegex.test(text)) {
      contactInfo.emails.push(text);
    }
  });
  
  // Method 4: Look for any element containing "@" symbol
  $('*').each((_, element) => {
    const text = $(element).text().trim();
    if (text.includes('@')) {
      const matches = text.match(emailRegex);
      if (matches) {
        contactInfo.emails.push(...matches);
      }
    }
  });
  
  // Method 5: Check all attributes for email patterns
  $('*').each((_, element) => {
    const $el = $(element);
    // Check common attributes that might contain emails
    const attributes = ['href', 'data-email', 'data-contact', 'title', 'alt', 'value'];
    attributes.forEach(attr => {
      const value = $el.attr(attr);
      if (value && value.includes('@')) {
        const matches = value.match(emailRegex);
        if (matches) {
          contactInfo.emails.push(...matches);
        }
      }
    });
  });
  
  // Remove duplicates and clean up
  contactInfo.emails = [...new Set(contactInfo.emails)].filter(email => {
    // Basic validation - be more permissive
    if (!email || email.length < 3) return false;
    if (!email.includes('@')) return false;
    if (!email.includes('.')) return false;
    // Remove obvious non-emails
    if (email.includes(' ') || email.includes('\n') || email.includes('\t')) return false;
    return true;
  });
  
  console.log(`Total emails found: ${contactInfo.emails.length}`);

  // Phone number extraction removed - too many false positives

  // Additional method: Look for contact-related text patterns
  const contactKeywords = ['contact', 'email', 'reach', 'get in touch'];
  $('*').each((_, element) => {
    const text = $(element).text().toLowerCase();
    if (contactKeywords.some(keyword => text.includes(keyword))) {
      // Look for emails in this element
      const emailMatches = $(element).text().match(emailRegex);
      if (emailMatches) {
        contactInfo.emails.push(...emailMatches);
      }
    }
  });

  // Final cleanup - only include .com and .co.za emails
  contactInfo.emails = [...new Set(contactInfo.emails)].filter(email => {
    if (!email || email.length < 3) return false;
    if (!email.includes('@')) return false;
    if (!email.includes('.')) return false;
    if (email.includes(' ') || email.includes('\n') || email.includes('\t')) return false;
    
    // Only include emails ending with .com or .co.za
    const lowerEmail = email.toLowerCase();
    if (!lowerEmail.endsWith('.com') && !lowerEmail.endsWith('.co.za')) return false;
    
    return true;
  });

  console.log(`Final emails found: ${contactInfo.emails.length}`);

  // Also extract emails from explicit links
  $('a[href]').each((_, element) => {
    const href = ($(element).attr('href') || '').trim();
    // mailto links
    if (href.toLowerCase().startsWith('mailto:')) {
      const raw = href.substring(7); // after 'mailto:'
      const email = raw.split('?')[0].trim();
      if (email && /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email)) {
        contactInfo.emails.push(email);
      }
    }
  });

  // Address extraction removed - keeping only email and social media

  // Extract social media links
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || '';
    const text = $(element).text().trim();
    
    if (href.includes('facebook.com') || href.includes('fb.com')) {
      contactInfo.socialMedia.push({ platform: 'Facebook', url: href, text });
    } else if (href.includes('twitter.com') || href.includes('x.com')) {
      contactInfo.socialMedia.push({ platform: 'Twitter/X', url: href, text });
    } else if (href.includes('linkedin.com')) {
      contactInfo.socialMedia.push({ platform: 'LinkedIn', url: href, text });
    } else if (href.includes('instagram.com')) {
      contactInfo.socialMedia.push({ platform: 'Instagram', url: href, text });
    } else if (href.includes('youtube.com')) {
      contactInfo.socialMedia.push({ platform: 'YouTube', url: href, text });
    } else if (href.includes('tiktok.com')) {
      contactInfo.socialMedia.push({ platform: 'TikTok', url: href, text });
    }
  });

  // Contact forms extraction removed - keeping only email and social media

  // Business hours extraction removed - keeping only email and social media

  // Location and structured data extraction removed - keeping only email and social media

  // Look for structured data (JSON-LD) - only for emails
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const jsonData = JSON.parse($(element).html());
      if (jsonData['@type'] === 'Organization' || jsonData['@type'] === 'LocalBusiness') {
        if (jsonData.email) {
          contactInfo.emails.push(jsonData.email);
        }
      }
    } catch (e) {
      // Ignore JSON parsing errors
    }
  });

  // Clean up and deduplicate
  contactInfo.emails = [...new Set(contactInfo.emails)];

  return contactInfo;
}

// Screenshot Function
async function takeScreenshot(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the URL
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
    await fs.mkdir(screenshotsDir, { recursive: true });
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const domain = new URL(url).hostname.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${domain}-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);
    
    // Take full page screenshot
    await page.screenshot({
      path: filepath,
      fullPage: true,
      type: 'png'
    });
    
    // Also take a viewport screenshot
    const viewportFilename = `${domain}-viewport-${timestamp}.png`;
    const viewportFilepath = path.join(screenshotsDir, viewportFilename);
    
    await page.screenshot({
      path: viewportFilepath,
      fullPage: false,
      type: 'png'
    });
    
    return {
      fullPage: `/screenshots/${filename}`,
      viewport: `/screenshots/${viewportFilename}`
    };
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Website Analysis Endpoint
app.post('/api/analyze-website', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    console.log(`Analyzing website: ${url}`);
    
    const startTime = Date.now();
    
    // Fetch the website with better error handling
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      timeout: 30000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
      // Handle SSL certificate issues
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    const loadTime = Date.now() - startTime;
    const $ = cheerio.load(response.data);

    // Extract basic information
    const title = $('title').text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Extract headings
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const level = parseInt(element.tagName.substring(1));
      const text = $(element).text().trim();
      if (text) {
        headings.push({ level, text });
      }
    });

    // Extract images
    const images = [];
    $('img').each((_, element) => {
      const src = $(element).attr('src') || '';
      const alt = $(element).attr('alt') || '';
      if (src) {
        images.push({ src, alt });
      }
    });

    // Extract links
    const links = [];
    const baseUrl = new URL(url);
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href') || '';
      const text = $(element).text().trim();
      if (href && text) {
        try {
          const linkUrl = new URL(href, url);
          const isInternal = linkUrl.hostname === baseUrl.hostname;
          links.push({ href, text, internal: isInternal });
        } catch {
          // Invalid URL, skip
        }
      }
    });

          // Extract forms
          const forms = [];
          $('form').each((_, element) => {
            const action = $(element).attr('action') || '';
            const method = $(element).attr('method') || 'get';
            const inputs = [];
            $(element).find('input, textarea, select').each((_, input) => {
              const type = $(input).attr('type') || 'text';
              const name = $(input).attr('name') || '';
              if (name) {
                inputs.push(`${type}:${name}`);
              }
            });
            forms.push({ action, method, inputs });
          });

          // Extract contact information
          const contactInfo = extractContactInfo($, url);

    // Extract scripts
    const scripts = [];
    $('script[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        scripts.push(src);
      }
    });

    // Extract stylesheets
    const stylesheets = [];
    $('link[rel="stylesheet"]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        stylesheets.push(href);
      }
    });

    // Check SSL
    const sslInfo = {
      hasSSL: url.startsWith('https://'),
      certificateValid: url.startsWith('https://'),
      grade: url.startsWith('https://') ? 'A' : 'F'
    };

    // Check mobile friendliness
    const viewport = $('meta[name="viewport"]').attr('content');
    const mobileFriendly = viewport && (viewport.includes('width=device-width') || viewport.includes('initial-scale=1'));

    // Check social media presence
    const html = $.html().toLowerCase();
    const socialMedia = {
      facebook: html.includes('facebook.com') || html.includes('fb.com') || $('meta[property="og:"]').length > 0,
      twitter: html.includes('twitter.com') || $('meta[name="twitter:"]').length > 0,
      linkedin: html.includes('linkedin.com'),
      instagram: html.includes('instagram.com')
    };

    // Check analytics
    const analytics = {
      googleAnalytics: html.includes('google-analytics.com') || html.includes('gtag(') || html.includes('ga('),
      googleTagManager: html.includes('googletagmanager.com') || html.includes('gtm.js'),
      facebookPixel: html.includes('facebook.com/tr') || html.includes('fbq(')
    };

    // Detect CMS
    let cms = null;
    if (html.includes('wp-content') || html.includes('wp-includes') || html.includes('wordpress')) {
      cms = 'WordPress';
    } else if (html.includes('shopify') || html.includes('cdn.shopify.com')) {
      cms = 'Shopify';
    } else if (html.includes('drupal') || html.includes('sites/default')) {
      cms = 'Drupal';
    } else if (html.includes('joomla') || html.includes('media/jui')) {
      cms = 'Joomla';
    } else if (html.includes('squarespace') || html.includes('sqs-cdn')) {
      cms = 'Squarespace';
    } else if (html.includes('wix.com') || html.includes('wixstatic')) {
      cms = 'Wix';
    }

    // Detect technologies
    const technologies = [];
    if (html.includes('react') || scripts.some(s => s.includes('react'))) {
      technologies.push('React');
    }
    if (html.includes('vue') || scripts.some(s => s.includes('vue'))) {
      technologies.push('Vue.js');
    }
    if (html.includes('angular') || scripts.some(s => s.includes('angular'))) {
      technologies.push('Angular');
    }
    if (html.includes('jquery') || scripts.some(s => s.includes('jquery'))) {
      technologies.push('jQuery');
    }
    if (html.includes('bootstrap') || stylesheets.some(s => s.includes('bootstrap'))) {
      technologies.push('Bootstrap');
    }
    if (html.includes('tailwind') || stylesheets.some(s => s.includes('tailwind'))) {
      technologies.push('Tailwind CSS');
    }
    if (html.includes('google-analytics')) {
      technologies.push('Google Analytics');
    }
    if (html.includes('cloudflare')) {
      technologies.push('Cloudflare');
    }
    if (html.includes('amazonaws.com')) {
      technologies.push('AWS');
    }

          const analysisData = {
            url,
            title,
            metaDescription,
            headings,
            images,
            links,
            forms,
            scripts,
            stylesheets,
            pageSize: response.data.length,
            loadTime,
            statusCode: response.status,
            sslInfo,
            mobileFriendly,
            socialMedia,
            analytics,
            cms,
            technologies,
            contactInfo
          };

    // Take screenshots
    console.log(`Taking screenshots for ${url}...`);
    const screenshots = await takeScreenshot(url);
    
    // Add screenshots to analysis data
    analysisData.screenshots = screenshots;

    // Generate design mockups
    console.log(`Generating design mockups for ${url}...`);
    try {
      const designs = await generateWebsiteDesigns(url, analysisData);
      analysisData.designs = designs;
    } catch (designError) {
      console.warn('Failed to generate designs:', designError);
      // Continue without designs if generation fails
    }

    console.log(`Analysis completed for ${url}`);
    res.json({ success: true, data: analysisData });

  } catch (error) {
    console.error('Error analyzing website:', error);
    
    let errorMessage = 'Failed to analyze website';
    
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Website not found. Please check the URL and try again.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. The website may be down or blocking requests.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. The website is taking too long to respond.';
    } else if (error.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
      errorMessage = 'SSL certificate issue. The website has an invalid SSL certificate.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
});

// Health check
// Design generation endpoint
app.post('/api/generate-designs', async (req, res) => {
  try {
    const { url, websiteData } = req.body;
    
    console.log(`Generating designs for ${url}...`);
    
    const designs = await generateWebsiteDesigns(url, websiteData);
    
    res.json({
      success: true,
      designs: designs
    });
  } catch (error) {
    console.error('Error generating designs:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Function to generate improved website designs
async function generateWebsiteDesigns(url, websiteData) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const domain = url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9.-]/g, '-');
  
  const designs = [];
  
  // Extract content from the actual website
  const extractedContent = extractWebsiteContent(websiteData);
  
  // Download and process website images
  console.log(`Downloading images for ${url}...`);
  const downloadedImages = await downloadWebsiteImages(extractedContent.images, url);
  
  // Update content with downloaded images
  if (downloadedImages.length > 0) {
    extractedContent.heroImage = downloadedImages.find(img => 
      img.alt && (
        img.alt.toLowerCase().includes('hero') ||
        img.alt.toLowerCase().includes('main') ||
        img.alt.toLowerCase().includes('banner')
      )
    ) || downloadedImages[0];
    
    extractedContent.logoImage = downloadedImages.find(img => 
      img.alt && (
        img.alt.toLowerCase().includes('logo') ||
        img.alt.toLowerCase().includes('brand')
      )
    );
    
    extractedContent.serviceImages = downloadedImages.filter(img => 
      img.alt && (
        img.alt.toLowerCase().includes('service') ||
        img.alt.toLowerCase().includes('product') ||
        img.alt.toLowerCase().includes('portfolio')
      )
    ).slice(0, 6);
  }
  
  // Design 1: Modern Homepage Redesign
  const homepageDesign = await createHTMLHomepageDesign(domain, timestamp, extractedContent, url);
  designs.push(homepageDesign);
  
  // Design 2: Services/Products Page Redesign
  const servicesDesign = await createHTMLServicesDesign(domain, timestamp, extractedContent, url);
  designs.push(servicesDesign);
  
  // Design 3: Contact/About Page Redesign
  const contactDesign = await createHTMLContactDesign(domain, timestamp, extractedContent, url);
  designs.push(contactDesign);
  
  // Clean up temporary image files
  for (const image of downloadedImages) {
    try {
      if (image.localPath && await fs.access(image.localPath).then(() => true).catch(() => false)) {
        await fs.unlink(image.localPath);
      }
    } catch (error) {
      console.warn(`Failed to clean up image ${image.localPath}:`, error.message);
    }
  }
  
  return designs;
}

// Extract relevant content from website data
function extractWebsiteContent(websiteData) {
  const content = {
    title: websiteData.title || 'Your Business',
    description: websiteData.metaDescription || 'Professional services and solutions',
    headings: websiteData.headings || [],
    images: websiteData.images || [],
    contactInfo: websiteData.contactInfo || {},
    services: [],
    about: '',
    features: [],
    heroImage: null,
    serviceImages: [],
    logoImage: null,
    allImages: [],
    contentImages: [],
    backgroundImages: []
  };

  // Extract services from headings and content
  if (content.headings.length > 0) {
    content.services = content.headings
      .filter(h => h.level <= 3)
      .slice(0, 6)
      .map(h => h.text);
  }

  // Extract about content
  if (content.headings.length > 0) {
    const aboutHeading = content.headings.find(h => 
      h.text.toLowerCase().includes('about') || 
      h.text.toLowerCase().includes('company') ||
      h.text.toLowerCase().includes('story')
    );
    if (aboutHeading) {
      content.about = aboutHeading.text;
    }
  }

  // Extract and categorize images with enhanced logic
  if (content.images.length > 0) {
    content.allImages = content.images;
    
    // Find hero/main image (prioritize by size and keywords)
    content.heroImage = content.images.find(img => 
      img.alt && (
        img.alt.toLowerCase().includes('hero') ||
        img.alt.toLowerCase().includes('main') ||
        img.alt.toLowerCase().includes('banner') ||
        img.alt.toLowerCase().includes('header') ||
        img.alt.toLowerCase().includes('background') ||
        img.alt.toLowerCase().includes('cover')
      )
    ) || content.images.find(img => img.width > 800 || img.height > 400) || content.images[0];

    // Find logo (look for small images with logo-related keywords)
    content.logoImage = content.images.find(img => 
      img.alt && (
        img.alt.toLowerCase().includes('logo') ||
        img.alt.toLowerCase().includes('brand') ||
        img.alt.toLowerCase().includes('company')
      ) && (img.width < 200 || img.height < 200)
    ) || content.images.find(img => img.width < 150 && img.height < 150);

    // Find service/product images
    content.serviceImages = content.images.filter(img => 
      img.alt && (
        img.alt.toLowerCase().includes('service') ||
        img.alt.toLowerCase().includes('product') ||
        img.alt.toLowerCase().includes('portfolio') ||
        img.alt.toLowerCase().includes('work') ||
        img.alt.toLowerCase().includes('project') ||
        img.alt.toLowerCase().includes('solution')
      )
    ).slice(0, 6);

    // Find content images (medium-sized images for content sections)
    content.contentImages = content.images.filter(img => 
      img.width > 200 && img.width < 800 && 
      img.height > 150 && img.height < 600 &&
      !img.alt?.toLowerCase().includes('logo') &&
      !img.alt?.toLowerCase().includes('icon')
    ).slice(0, 8);

    // Find background images (large images suitable for backgrounds)
    content.backgroundImages = content.images.filter(img => 
      img.width > 600 || img.height > 400
    ).slice(0, 4);
  }

  // Extract features
  content.features = [
    'Professional Design',
    'Mobile Responsive',
    'Fast Loading',
    'SEO Optimized',
    'User Friendly',
    'Modern Technology'
  ];

  return content;
}

// Download and process website images
async function downloadWebsiteImages(images, baseUrl) {
  const processedImages = [];
  
  for (const image of images.slice(0, 10)) { // Increased limit to 10 images
    try {
      let imageUrl = image.src;
      
      // Convert relative URLs to absolute
      if (imageUrl.startsWith('/')) {
        const url = new URL(baseUrl);
        imageUrl = `${url.protocol}//${url.host}${imageUrl}`;
      } else if (imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
      } else if (!imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}/${imageUrl}`;
      }
      
      // Skip very small images (likely icons)
      if (image.width && image.width < 50 && image.height && image.height < 50) {
        continue;
      }
      
      // Skip data URLs and SVG files
      if (imageUrl.startsWith('data:') || imageUrl.includes('.svg')) {
        continue;
      }
      
      // Download image
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Check if response is actually an image
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        continue;
      }
      
      // Save to temporary file with proper extension
      const extension = contentType.includes('png') ? 'png' : 
                       contentType.includes('gif') ? 'gif' : 
                       contentType.includes('webp') ? 'webp' : 'jpg';
      const filename = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${extension}`;
      const filepath = path.join(designsDir, filename);
      
      await fs.writeFile(filepath, response.data);
      
      processedImages.push({
        ...image,
        localPath: filepath,
        url: imageUrl,
        contentType: contentType,
        size: response.data.length
      });
      
    } catch (error) {
      console.warn(`Failed to download image ${image.src}:`, error.message);
    }
  }
  
  return processedImages;
}

// Create modern homepage design as HTML
async function createHTMLHomepageDesign(domain, timestamp, content, baseUrl) {
  const filename = `${domain}-homepage-redesign-${timestamp}.html`;
  const filepath = path.join(designsDir, filename);
  
  // Get image URLs from downloaded images
  const heroImageUrl = content.heroImage ? content.heroImage.url : '';
  const logoImageUrl = content.logoImage ? content.logoImage.url : '';
  const contentImageUrls = content.contentImages ? content.contentImages.map(img => img.url).filter(Boolean) : [];
  const backgroundImageUrls = content.backgroundImages ? content.backgroundImages.map(img => img.url).filter(Boolean) : [];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - Modern Homepage Redesign</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        .header {
            background: #1a1a1a;
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #f97315;
        }
        
        .logo img {
            width: 40px;
            height: 40px;
            border-radius: 8px;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #f97315;
        }
        
        .cta-button {
            background: #f97315;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            background: #ea580c;
            transform: translateY(-2px);
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: ${heroImageUrl ? `url('${heroImageUrl}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            background-size: cover;
            background-position: center;
            position: relative;
            margin-top: 80px;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: white;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn-primary {
            background: #f97315;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background: #ea580c;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(249, 115, 21, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: white;
            padding: 1rem 2rem;
            border: 2px solid white;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: white;
            color: #1a1a1a;
            transform: translateY(-3px);
        }
        
        /* Features Section */
        .features {
            padding: 5rem 0;
            background: #f8fafc;
        }
        
        .features h2 {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 3rem;
            color: #1a1a1a;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .feature-card p {
            color: #6b7280;
            line-height: 1.6;
        }
        
        /* CTA Section */
        .cta-section {
            background: #1a1a1a;
            color: white;
            padding: 5rem 0;
            text-align: center;
        }
        
        .cta-section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .cta-section p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        /* Footer */
        .footer {
            background: #111;
            color: white;
            padding: 2rem 0;
            text-align: center;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-content {
            animation: fadeInUp 1s ease-out;
        }
        
        .feature-card {
            animation: fadeInUp 0.6s ease-out;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${logoImageUrl ? `<img src="${logoImageUrl}" alt="${content.title} Logo">` : '<div style="width: 40px; height: 40px; background: #f97315; border-radius: 8px;"></div>'}
                    <span>${content.title}</span>
                </div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a href="#contact" class="cta-button">Get Quote</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content">
                <h1>${content.title}</h1>
                <p>${content.description}</p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn-primary">Get Started</a>
                    <a href="#services" class="btn-secondary">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="services">
        <div class="container">
            <h2>Why Choose Us?</h2>
            <div class="features-grid">
                ${content.features.slice(0, 3).map((feature, index) => {
                  const imageUrl = contentImageUrls[index] || '';
                  return `
                <div class="feature-card">
                    ${imageUrl ? `<div class="feature-image"><img src="${imageUrl}" alt="${feature}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;"></div>` : '<div class="feature-icon">✨</div>'}
                    <h3>${feature}</h3>
                    <p>Professional service with modern approach and proven results that exceed expectations.</p>
                </div>
                `;
                }).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="contact">
        <div class="container">
            <h2>Ready to Transform Your Business?</h2>
            <p>Contact us today for a free consultation and see how we can help you achieve your goals.</p>
            <a href="#contact" class="btn-primary">Contact Us</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${content.title}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                header.style.background = '#1a1a1a';
            }
        });
    </script>
</body>
</html>`;

  await fs.writeFile(filepath, html);
  
  return {
    id: 'homepage-redesign',
    title: 'Modern Homepage Redesign',
    description: `Interactive homepage redesign for ${content.title} with modern design, smooth animations, and responsive layout`,
    imageUrl: `/designs/${filename}`,
    improvements: [
      'Modern gradient hero section with real imagery',
      'Smooth animations and transitions',
      'Fully responsive design',
      'Interactive navigation with smooth scrolling',
      'Professional typography and spacing',
      'Mobile-first approach'
    ]
  };
}

// Create services page design as HTML
async function createHTMLServicesDesign(domain, timestamp, content, baseUrl) {
  const filename = `${domain}-services-redesign-${timestamp}.html`;
  const filepath = path.join(designsDir, filename);
  
  const logoImageUrl = content.logoImage ? content.logoImage.url : '';
  const serviceImageUrls = content.serviceImages ? content.serviceImages.map(img => img.url).filter(Boolean) : [];
  const contentImageUrls = content.contentImages ? content.contentImages.map(img => img.url).filter(Boolean) : [];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #1a1a1a; color: white; padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; font-weight: bold; color: #f97315; }
        .logo img { width: 40px; height: 40px; border-radius: 8px; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: white; text-decoration: none; transition: color 0.3s ease; }
        .nav-links a:hover { color: #f97315; }
        .cta-button { background: #f97315; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
        .cta-button:hover { background: #ea580c; transform: translateY(-2px); }
        .page-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8rem 0 4rem; text-align: center; margin-top: 80px; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
        .page-header p { font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }
        .services { padding: 5rem 0; background: #f8fafc; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .service-card { background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); }
        .service-icon { width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1.5rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .service-card h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a; }
        .service-card p { color: #6b7280; margin-bottom: 1.5rem; line-height: 1.6; }
        .service-features { list-style: none; margin-bottom: 2rem; }
        .service-features li { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #374151; }
        .service-features li::before { content: '✓'; color: #10b981; font-weight: bold; }
        .service-button { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.75rem 1.5rem; border-radius: 12px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; display: inline-block; width: 100%; text-align: center; }
        .service-button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3); }
        .testimonials { background: #1a1a1a; color: white; padding: 5rem 0; text-align: center; }
        .testimonials h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; }
        .testimonial { max-width: 800px; margin: 0 auto; font-size: 1.25rem; line-height: 1.8; font-style: italic; margin-bottom: 2rem; }
        .testimonial-author { font-size: 1rem; opacity: 0.8; }
        .cta-section { background: #f97315; color: white; padding: 5rem 0; text-align: center; }
        .cta-section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .btn-primary { background: white; color: #f97315; padding: 1rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: all 0.3s ease; display: inline-block; }
        .btn-primary:hover { background: #f8fafc; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
        .footer { background: #111; color: white; padding: 2rem 0; text-align: center; }
        @media (max-width: 768px) { .nav-links { display: none; } .page-header h1 { font-size: 2.5rem; } .services-grid { grid-template-columns: 1fr; } .service-card { padding: 1.5rem; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .service-card { animation: fadeInUp 0.6s ease-out; }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${logoImageUrl ? `<img src="${logoImageUrl}" alt="${content.title} Logo">` : '<div style="width: 40px; height: 40px; background: #f97315; border-radius: 8px;"></div>'}
                    <span>${content.title}</span>
                </div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a href="#contact" class="cta-button">Get Quote</a>
            </nav>
        </div>
    </header>
    <section class="page-header">
        <div class="container">
            <h1>Our Services</h1>
            <p>Professional solutions tailored to your business needs. We deliver exceptional results with modern technology and proven methodologies.</p>
        </div>
    </section>
    <section class="services" id="services">
        <div class="container">
            <div class="services-grid">
                ${content.services.slice(0, 6).map((service, index) => {
                  const imageUrl = serviceImageUrls[index] || contentImageUrls[index] || '';
                  return `
                <div class="service-card">
                    ${imageUrl ? `<div class="service-image"><img src="${imageUrl}" alt="${service}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;"></div>` : `<div class="service-icon">${['🎨', '💻', '📱', '🚀', '🔧', '📊'][index]}</div>`}
                    <h3>${service}</h3>
                    <p>Professional ${service.toLowerCase()} service with modern approach and proven results that exceed expectations.</p>
                    <ul class="service-features">
                        <li>Expert Team</li>
                        <li>Fast Delivery</li>
                        <li>24/7 Support</li>
                        <li>Quality Guarantee</li>
                    </ul>
                    <a href="#contact" class="service-button">Learn More</a>
                </div>
                `;
                }).join('')}
            </div>
        </div>
    </section>
    <section class="testimonials">
        <div class="container">
            <h2>What Our Clients Say</h2>
            <div class="testimonial">"Professional service that exceeded our expectations. The team delivered exactly what we needed and more. Highly recommended!"</div>
            <div class="testimonial-author">- Client Name, Company</div>
        </div>
    </section>
    <section class="cta-section" id="contact">
        <div class="container">
            <h2>Ready to Get Started?</h2>
            <p>Contact us today for a free consultation and see how we can help you achieve your goals.</p>
            <a href="#contact" class="btn-primary">Contact Us</a>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${content.title}. All rights reserved.</p>
        </div>
    </footer>
    <script>
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>`;

  await fs.writeFile(filepath, html);
  
  return {
    id: 'services-redesign',
    title: 'Services Page Redesign',
    description: `Interactive services page for ${content.title} showcasing offerings with modern card layout and professional design`,
    imageUrl: `/designs/${filename}`,
    improvements: [
      'Modern service card layout with gradients',
      'Interactive hover effects and animations',
      'Professional typography and spacing',
      'Client testimonials section',
      'Strong call-to-action buttons',
      'Fully responsive design'
    ]
  };
}

// Create contact page design as HTML
async function createHTMLContactDesign(domain, timestamp, content, baseUrl) {
  const filename = `${domain}-contact-redesign-${timestamp}.html`;
  const filepath = path.join(designsDir, filename);
  
  const logoImageUrl = content.logoImage ? content.logoImage.url : '';
  const email = content.contactInfo?.emails?.[0] || 'info@company.com';
  const backgroundImageUrls = content.backgroundImages ? content.backgroundImages.map(img => img.url).filter(Boolean) : [];
  const contentImageUrls = content.contentImages ? content.contentImages.map(img => img.url).filter(Boolean) : [];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - Contact</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #1a1a1a; color: white; padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; font-weight: bold; color: #f97315; }
        .logo img { width: 40px; height: 40px; border-radius: 8px; }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: white; text-decoration: none; transition: color 0.3s ease; }
        .nav-links a:hover { color: #f97315; }
        .cta-button { background: #f97315; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
        .cta-button:hover { background: #ea580c; transform: translateY(-2px); }
        .page-header { background: ${backgroundImageUrls[0] ? `url('${backgroundImageUrls[0]}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; background-size: cover; background-position: center; color: white; padding: 8rem 0 4rem; text-align: center; margin-top: 80px; position: relative; }
        .page-header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.4); z-index: 1; }
        .page-header .container { position: relative; z-index: 2; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
        .page-header p { font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }
        .contact { padding: 5rem 0; background: #f8fafc; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .contact-form { background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        .contact-form h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #1a1a1a; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 12px; font-size: 1rem; transition: border-color 0.3s ease; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #f97315; }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .submit-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem 2rem; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; width: 100%; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3); }
        .contact-info { background: #1a1a1a; color: white; padding: 2rem; border-radius: 20px; }
        .contact-info h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #f97315; }
        .contact-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 12px; transition: all 0.3s ease; }
        .contact-item:hover { background: rgba(255, 255, 255, 0.1); transform: translateX(5px); }
        .contact-icon { width: 50px; height: 50px; background: #f97315; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
        .contact-details h4 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.25rem; }
        .contact-details p { opacity: 0.8; }
        .social-media { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
        .social-media h4 { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; }
        .social-links { display: flex; gap: 1rem; }
        .social-link { width: 50px; height: 50px; background: #f97315; border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; font-size: 1.25rem; transition: all 0.3s ease; }
        .social-link:hover { background: #ea580c; transform: translateY(-3px); }
        .map-section { background: #e5e7eb; padding: 3rem 0; text-align: center; }
        .map-section h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a; }
        .map-placeholder { background: #9ca3af; height: 300px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem; margin-top: 1rem; }
        .cta-section { background: #f97315; color: white; padding: 5rem 0; text-align: center; }
        .cta-section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
        .cta-section p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .btn-primary { background: white; color: #f97315; padding: 1rem 2rem; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: all 0.3s ease; display: inline-block; }
        .btn-primary:hover { background: #f8fafc; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
        .footer { background: #111; color: white; padding: 2rem 0; text-align: center; }
        @media (max-width: 768px) { .nav-links { display: none; } .page-header h1 { font-size: 2.5rem; } .contact-grid { grid-template-columns: 1fr; gap: 2rem; } .contact-form, .contact-info { padding: 1.5rem; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .contact-form, .contact-info { animation: fadeInUp 0.6s ease-out; }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${logoImageUrl ? `<img src="${logoImageUrl}" alt="${content.title} Logo">` : '<div style="width: 40px; height: 40px; background: #f97315; border-radius: 8px;"></div>'}
                    <span>${content.title}</span>
                </div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <a href="#contact" class="cta-button">Get Quote</a>
            </nav>
        </div>
    </header>
    <section class="page-header">
        <div class="container">
            <h1>Get In Touch</h1>
            <p>Ready to start your project? We'd love to hear from you. Contact us today for a free consultation.</p>
        </div>
    </section>
    <section class="contact" id="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-form">
                    <h3>Send us a Message</h3>
                    <form>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="company">Company</label>
                            <input type="text" id="company" name="company">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                </div>
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div class="contact-details">
                            <h4>Email</h4>
                            <p>${email}</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📱</div>
                        <div class="contact-details">
                            <h4>Phone</h4>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div class="contact-details">
                            <h4>Address</h4>
                            <p>123 Business Street<br>City, State 12345</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">🕒</div>
                        <div class="contact-details">
                            <h4>Business Hours</h4>
                            <p>Mon - Fri: 9:00 AM - 6:00 PM<br>Sat: 10:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                    <div class="social-media">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            <a href="#" class="social-link">📘</a>
                            <a href="#" class="social-link">📷</a>
                            <a href="#" class="social-link">💼</a>
                            <a href="#" class="social-link">🐦</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="map-section">
        <div class="container">
            <h3>📍 Find Us</h3>
            <p>Visit our office or get directions to our location</p>
            <div class="map-placeholder">Interactive Map Placeholder</div>
        </div>
    </section>
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Get Started?</h2>
            <p>Don't wait - contact us today and let's discuss your project.</p>
            <a href="#contact" class="btn-primary">Contact Us Now</a>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${content.title}. All rights reserved.</p>
        </div>
    </footer>
    <script>
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    </script>
</body>
</html>`;

  await fs.writeFile(filepath, html);
  
  return {
    id: 'contact-redesign',
    title: 'Contact Page Redesign',
    description: `Interactive contact page for ${content.title} with modern contact form, clear contact information, and professional layout`,
    imageUrl: `/designs/${filename}`,
    improvements: [
      'Modern contact form with validation',
      'Interactive contact information cards',
      'Social media integration',
      'Professional layout and typography',
      'Map placeholder for location',
      'Fully responsive design'
    ]
  };
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Storage server running on http://localhost:${PORT}`);
  console.log(`📁 Data will be saved to: ${dataDir}`);
  console.log(`🎨 Designs will be saved to: ${designsDir}`);
});
