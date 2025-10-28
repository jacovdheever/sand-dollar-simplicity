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
import { BetaAnalyticsDataClient } from '@google-analytics/data';

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
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

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
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Google Analytics API Endpoints
const PROPERTY_ID = '317285123'; // Your GA4 Property ID

// Initialize the Analytics Data Client
let analyticsDataClient;

try {
  analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: path.join(__dirname, 'sand-dollar-design-ec8817f0bb25.json'),
  });
} catch (error) {
  console.warn('⚠️  Google Analytics client not initialized:', error.message);
}

// Get real-time analytics data
app.get('/api/analytics/realtime', async (req, res) => {
  if (!analyticsDataClient) {
    return res.status(503).json({ error: 'Analytics service not configured' });
  }

  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      dimensions: [
        { name: 'country' },
        { name: 'deviceCategory' },
        { name: 'unifiedScreenName' },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error('Error fetching real-time analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get historical analytics data
app.post('/api/analytics/historical', async (req, res) => {
  if (!analyticsDataClient) {
    return res.status(503).json({ error: 'Analytics service not configured' });
  }

  try {
    const { dateRange } = req.body;
    
    // Use fixed, valid GA4 metrics and dimensions for historical data
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'sessionSource' },
        { name: 'deviceCategory' },
        { name: 'newVsReturning' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' }
      ]
    });

    res.json(response);
  } catch (error) {
    console.error('Error fetching historical analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get PageSpeed Insights data
app.get('/api/pagespeed', async (req, res) => {
  try {
    const url = req.query.url || 'https://sanddollardesign.co.za';
    const strategy = req.query.strategy || 'mobile'; // mobile or desktop
    
    // Use PageSpeed Insights API with service account authentication
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${process.env.PAGESPEED_API_KEY || ''}`;
    
    const response = await axios.get(apiUrl, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    
    // Extract relevant metrics
    const lighthouseResult = response.data.lighthouseResult;
    const categories = lighthouseResult.categories;
    
    const metrics = {
      performance: categories.performance?.score ? Math.round(categories.performance.score * 100) : 0,
      accessibility: categories.accessibility?.score ? Math.round(categories.accessibility.score * 100) : 0,
      bestPractices: categories['best-practices']?.score ? Math.round(categories['best-practices'].score * 100) : 0,
      seo: categories.seo?.score ? Math.round(categories.seo.score * 100) : 0,
      
      // Core Web Vitals
      lcp: lighthouseResult.audits['largest-contentful-paint']?.numericValue ? (lighthouseResult.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2) : null,
      fid: lighthouseResult.audits['max-potential-fid']?.numericValue ? Math.round(lighthouseResult.audits['max-potential-fid'].numericValue) : null,
      cls: lighthouseResult.audits['cumulative-layout-shift']?.numericValue ? lighthouseResult.audits['cumulative-layout-shift'].numericValue.toFixed(3) : null,
      
      // Additional performance metrics
      fcp: lighthouseResult.audits['first-contentful-paint']?.numericValue ? (lighthouseResult.audits['first-contentful-paint'].numericValue / 1000).toFixed(2) : null,
      si: lighthouseResult.audits['speed-index']?.numericValue ? (lighthouseResult.audits['speed-index'].numericValue / 1000).toFixed(2) : null,
      tti: lighthouseResult.audits['interactive']?.numericValue ? (lighthouseResult.audits['interactive'].numericValue / 1000).toFixed(2) : null,
      
      // Recommendations
      opportunities: lighthouseResult.audits ? Object.values(lighthouseResult.audits)
        .filter(audit => audit.details?.type === 'opportunity' && audit.score < 0.9)
        .map(audit => ({
          title: audit.title,
          description: audit.description,
          savings: audit.numericValue || 0
        }))
        .slice(0, 5) : []
    };
    
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching PageSpeed Insights:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Storage server running on http://localhost:${PORT}`);
  console.log(`📁 Data will be saved to: ${dataDir}`);
  console.log(`📊 Google Analytics API endpoints configured`);
  console.log(`⚡ PageSpeed Insights API endpoint configured`);
});