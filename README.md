# Sand Dollar Design - Professional UX/UI Design & Development

A comprehensive web platform for UX/UI design services, website auditing, and client project management. Built with modern React, TypeScript, and Node.js technologies.

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Routing**: React Router DOM 6.26
- **State Management**: React Context API + Local Storage
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Web Scraping**: Cheerio for HTML parsing, Puppeteer for screenshots
- **Image Processing**: Canvas API for image handling
- **File Storage**: JSON-based file system storage
- **CORS**: Enabled for cross-origin requests

### Development Tools
- **Linting**: ESLint with TypeScript rules
- **Type Checking**: TypeScript 5.5
- **Package Manager**: npm
- **Version Control**: Git with GitHub integration

## 🚀 Key Features

### 1. Website Auditing System
- **Comprehensive Analysis**: SEO, performance, accessibility, and UX evaluation
- **Contact Information Extraction**: Automated email and social media discovery
- **Screenshot Capture**: Full-page and viewport screenshots using Puppeteer
- **Design Recommendations**: AI-powered improvement suggestions

### 2. Project Management
- **Client Project Storage**: JSON-based project database (51MB+ of data)
- **File Upload System**: Support for images, documents, and multimedia
- **Project Categorization**: Organized by industry, type, and status
- **Search & Filter**: Advanced filtering and search capabilities

### 3. Content Management System
- **Blog Management**: Article creation, editing, and publishing
- **Rich Text Editor**: Support for formatted content and media
- **SEO Optimization**: Meta tags, structured data, and social sharing
- **Content Storage**: JSON-based article database (7MB+ of content)

### 4. Admin Dashboard
- **Authentication**: Secure admin login system
- **Content Management**: Full CRUD operations for projects and articles
- **Analytics**: Website performance and usage statistics
- **File Management**: Upload, organize, and manage assets

### 5. Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI/UX**: Clean, professional design system
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized loading and rendering

## 📁 Project Structure

```
sand-dollar-simplicity/
├── public/
│   ├── data/
│   │   ├── projects.json          # Client projects database
│   │   └── articles.json          # Blog articles database
│   ├── screenshots/               # Website audit screenshots
│   └── assets/                    # Static assets and images
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   └── [feature-components]   # Feature-specific components
│   ├── services/                  # API and business logic
│   ├── utils/                     # Utility functions
│   ├── types/                     # TypeScript type definitions
│   └── contexts/                  # React contexts
├── server.js                      # Express.js backend server
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite configuration
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/jacovdheever/sand-dollar-simplicity.git
cd sand-dollar-simplicity

# Switch to Test branch (development branch)
git checkout Test

# Install dependencies
npm install

# Start development server
npm run dev:full
# or use the quick start script
./start.sh
```

### 🔄 Git Workflow
- **Test Branch**: All development work happens here
- **Main Branch**: Production deployment only
- **Never work directly on main branch**
- **Deploy to production**: `./deploy-to-production.sh`

### Available Scripts
- `npm run dev` - Start frontend development server (port 8080)
- `npm run server` - Start backend server (port 3001)
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Vite Proxy Setup
The frontend uses Vite's proxy configuration to communicate with the backend API:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/sand-dollar-simplicity/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/sand-dollar-simplicity/, '')
    }
  }
}
```

This configuration:
- Forwards all `/sand-dollar-simplicity/api/*` requests to `http://localhost:3001/api/*`
- Handles CORS issues between frontend (port 8080) and backend (port 3001)
- Enables seamless API communication during development

### API Endpoints
All frontend API calls use relative URLs with the base path:
- `/sand-dollar-simplicity/api/load-projects` → Backend: `/api/load-projects`
- `/sand-dollar-simplicity/api/save-projects` → Backend: `/api/save-projects`
- `/sand-dollar-simplicity/api/analyze-website` → Backend: `/api/analyze-website`

### Data Loading Strategy
The system uses a multi-tier fallback approach for loading data:
1. **API Endpoints** (Development): When backend server is running
2. **Static JSON Files** (Production): Direct loading from `/data/projects.json` and `/data/articles.json`
3. **localStorage** (Fallback): Browser storage as final fallback

This ensures data is available in all environments:
- **Local Development**: Uses backend API for real-time updates
- **GitHub Pages**: Uses static JSON files for data persistence
- **Offline/Edge Cases**: Falls back to localStorage

### Environment Variables
**Required for Analytics:**
- `PAGESPEED_API_KEY` - PageSpeed Insights API key (for performance metrics)
  - Current key: `AIzaSyCphVtIQ2wybCAN5lKaGWmZv5nOOyMRYNw`
  
**Server Configuration:**
- Backend runs on port 3001
- Frontend runs on port 8080

**Starting Server with Analytics:**
```bash
PAGESPEED_API_KEY=your-key-here npm run dev:full
```

### Admin Access
- **URL**: `/sanddollar-admin`
- **Email**: `jaco@sanddollardesign.co.za`
- **Password**: `SandDollarDesign@2025!`

## 📊 Data Management

### Projects Database
- **Location**: `public/data/projects.json`
- **Size**: 51MB+ of client project data
- **Format**: JSON with structured project information
- **Features**: File uploads, categorization, search

### Articles Database
- **Location**: `public/data/articles.json`
- **Size**: 7MB+ of blog content
- **Format**: JSON with article metadata and content
- **Features**: Rich text, SEO optimization, publishing

### Generated Content
- **Screenshots**: `public/screenshots/` - Website audit captures
- **Assets**: `public/assets/` - Static files and uploads

## 🌐 Deployment

### GitHub Pages
- **Branch**: `main` (production) / `Test` (staging)
- **Build**: Automated via GitHub Actions
- **URL**: `https://jacovdheever.github.io/sand-dollar-simplicity/`

### Local Development
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3001
- **Admin**: http://localhost:8080/sanddollar-admin

## 🔒 Security Features

- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Zod schema validation
- **File Upload Security**: Type and size restrictions
- **Admin Authentication**: Secure login system
- **ReCaptcha Key: 6LdL2vgrAAAAAPonqB58BlmkIh77n0-u1MpIPdjv


## 📈 Performance Optimizations

- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Responsive images and lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Local storage for data persistence

## 🧪 Testing & Quality

- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Responsive Design**: Cross-device compatibility
- **Accessibility**: WCAG compliance

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. Projects Not Loading
**Symptoms**: Work page and admin dashboard show no projects
**Cause**: Data loading issues in different environments
**Solution**: 
- **Development**: Ensure both servers are running (`npm run dev:full`)
- **Production/GitHub Pages**: Projects should load automatically from static JSON files
- **Check Console**: Look for network errors in browser developer tools
- **Verify Data**: Ensure `public/data/projects.json` exists and contains data

#### 2. CORS Errors
**Symptoms**: Network errors in browser console
**Cause**: Cross-origin requests blocked
**Solution**: 
- Vite proxy handles CORS automatically
- Ensure all API calls use relative URLs, not absolute `http://localhost:3001`

#### 3. Port Already in Use
**Symptoms**: `EADDRINUSE: address already in use :::3001`
**Solution**:
```bash
# Kill existing processes
pkill -f "node server.js"
pkill -f "vite"

# Restart servers
npm run dev:full
```

#### 4. Missing Sand Dollar Logo in Loader
**Symptoms**: Loading indicator shows without logo
**Cause**: Incorrect image path
**Solution**: Ensure logo path uses root path: `/Sand-Dollar-icon.png` (for custom domain)

#### 5. Mobile Sections Not Visible (Blank Screen)
**Symptoms**: Services, Projects, or other sections not showing on mobile devices
**Cause**: Intersection Observer not triggering on mobile, or sections hidden with `opacity: 0`
**Solution**: 
- Check browser console for JavaScript errors
- Verify sections have `opacity: 1` in computed styles
- Sections should auto-reveal within 500ms (fallback timeout)
- Ensure Intersection Observer is working: check for `animate-fade-in` class on sections
- **Fixed in January 2025**: See "Recent Progress & Learnings" section above

#### 6. RangeError: Invalid array length
**Symptoms**: Page crashes on mobile with `RangeError: Invalid array length` in Media component
**Cause**: Invalid array length calculation for pagination dots
**Solution**: 
- Error is now prevented with validation in `Media.tsx`
- If still occurring, check that `allArticles.length` and container width are valid numbers
- **Fixed in January 2025**: See "Recent Progress & Learnings" section above

#### 7. Build Errors
**Symptoms**: Vite build fails with merge conflicts
**Solution**:
- Check for Git merge conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> branch`)
- Resolve conflicts and commit changes
- Restart development server

### Development Best Practices
- Always use relative URLs for API calls
- Test both frontend and backend after configuration changes
- Check browser console for errors
- Verify proxy configuration when adding new API endpoints

## 📝 API Endpoints

### Backend API (Port 3001)
- `POST /api/analyze-website` - Website auditing
- `GET /api/load-projects` - Load projects
- `POST /api/save-projects` - Save projects
- `GET /api/load-articles` - Load articles
- `POST /api/save-articles` - Save articles
- `GET /api/analytics/realtime` - Get real-time Google Analytics data
- `POST /api/analytics/historical` - Get historical Google Analytics data
- `GET /api/pagespeed` - Get PageSpeed Insights performance metrics

## 📊 Analytics Integration

### Google Analytics 4 (GA4)
The application includes full integration with Google Analytics 4 for real-time and historical analytics data.

**Features:**
- Real-time visitor tracking
- Historical data analysis (7, 30, 90 days)
- Page views, bounce rate, session duration
- Traffic sources and device breakdown
- Top pages analysis

**Setup:**
1. Service account JSON key configured in `server.js`
2. GA4 Property ID: `317285123`
3. Analytics endpoints available at `/api/analytics/*`

**References:**
- See `GOOGLE_ANALYTICS_SETUP.md` for detailed setup instructions
- Analytics dashboard accessible at `/sanddollar-admin` (Analytics tab)

### PageSpeed Insights API
Performance metrics are powered by Google's PageSpeed Insights API.

**Features:**
- Core Web Vitals (LCP, FID, CLS)
- First Contentful Paint (FCP)
- Page load speed metrics
- Performance recommendations

**Setup:**
1. API key required: `PAGESPEED_API_KEY` environment variable
2. Currently configured key: `AIzaSyCphVtIQ2wybCAN5lKaGWmZv5nOOyMRYNw`
3. Endpoint available at `/api/pagespeed`

**Usage:**
```bash
# Start server with PageSpeed API key
PAGESPEED_API_KEY=your-key-here npm run server
```

### Current Analytics Status ✅
- **Google Analytics 4**: Fully integrated and working
- **PageSpeed Insights**: Fully integrated and working
- **Performance Metrics**: Displaying real PageSpeed data
- **Core Web Vitals**: Showing LCP, FID, CLS from real measurements
- **Traffic Sources**: Displaying real source data (Direct, Google, etc.)
- **Device Breakdown**: Showing Desktop, Mobile, Tablet percentages
- **Top Pages**: Listing actual page paths with views and bounce rates

### Next Steps (Future Enhancements)
- **Lead Generation Tracking**: Add backend tracking for contact form submissions
- **Conversion Tracking**: Implement conversion events for form submissions
- **SEO Metrics**: Integrate third-party SEO tools for keyword rankings, backlinks, domain authority
- **Performance Issues**: Populate performance recommendations from PageSpeed data
- **SEO Issues**: Add SEO audit recommendations
- **Real-time Recommendations**: Generate actionable insights from analytics data

## 📝 Recent Progress & Learnings

### Mobile Optimization & Bug Fixes (January 2025)

**Issues Resolved:**
1. **Mobile Blank Screen Bug** - Fixed critical issue where Services and Projects sections were not visible on mobile devices
2. **RangeError Prevention** - Added comprehensive validation to prevent `RangeError: Invalid array length` crashes in Media component
3. **Base Path Configuration** - Updated Vite and API configuration to use root paths (`/`) instead of repository paths for custom domain compatibility
4. **Mobile Spacing** - Reduced excessive white space below hero section on mobile viewports

**Technical Changes:**
- **`vite.config.ts`**: Changed base path from `/sand-dollar-simplicity/` to `/` for custom domain support
- **`src/utils/apiConfig.ts`**: Updated API and static data URLs to use root paths
- **`src/components/Media.tsx`**: Added array length validation to prevent RangeError when calculating pagination dots
- **`src/components/SandDollarLoader.tsx`**: Fixed icon path to use root path
- **`src/components/Services.tsx`**: Reduced top padding from `pt-16` to `pt-8` on mobile
- **`src/pages/Index.tsx`**: Improved Intersection Observer with:
  - Immediate visibility for sections above the fold
  - Lower threshold (0.05) and rootMargin for better mobile detection
  - 500ms fallback timeout to ensure sections are visible even if observer fails

**Key Learnings:**
1. **Custom Domain Deployment**: When using a custom domain with GitHub Pages, all asset paths must use root paths (`/`) rather than repository-specific paths (`/sand-dollar-simplicity/`)
2. **Intersection Observer on Mobile**: Mobile browsers may not trigger Intersection Observer correctly for off-screen content. Always include:
   - Initial visibility check for above-the-fold content
   - Fallback timeout mechanism
   - Lower threshold values for better detection
3. **Array Validation**: Always validate array lengths before using `Array.from()` with calculated lengths, especially when calculations involve viewport dimensions
4. **Mobile Testing**: Always test production builds (`npm run build && npm run preview`) before deploying, as development and production behaviors can differ significantly

**Deployment Workflow:**
1. Develop and test on `Test` branch
2. Build production version: `npm run build`
3. Test locally: `npm run preview` (port 4173)
4. Merge `Test` → `main` branch
5. Push to GitHub (automatic deployment via GitHub Pages)
6. Verify on live site after 2-5 minute deployment delay

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Sand Dollar Design. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: jaco@sanddollardesign.co.za
- **Website**: https://sanddollardesign.co.za

---

**Built with ❤️ by Sand Dollar Design**