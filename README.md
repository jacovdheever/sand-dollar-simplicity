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
- No environment variables required for basic functionality
- Backend runs on port 3001
- Frontend runs on port 8080

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
**Solution**: Ensure logo path includes base path: `/sand-dollar-simplicity/Sand-Dollar-icon.png`

#### 5. Build Errors
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