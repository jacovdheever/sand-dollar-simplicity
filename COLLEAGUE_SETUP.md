# 🚀 Sand Dollar Design - Colleague Setup Guide

This guide will help you set up the Sand Dollar Design website locally and understand how it works.

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Git**: For version control

## 🔧 Quick Setup (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/jacovdheever/sand-dollar-simplicity.git
cd sand-dollar-simplicity
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Environment
```bash
npm run dev:full
```

This command will:
- Start the backend server on port 3001
- Start the frontend development server on port 8080
- Enable hot reloading for development

### 4. Access the Website
- **Main Website**: http://localhost:8080
- **Admin Dashboard**: http://localhost:8080/sanddollar-admin

## 🔐 Admin Access

**Admin Credentials:**
- Username: `jaco@sanddollardesign.co.za`
- Password: `SandDollarDesign@2025!`

## 🏗️ How It Works

### Local Development Mode
- **Frontend**: React app served by Vite on port 8080
- **Backend**: Node.js/Express server on port 3001
- **Data Storage**: JSON files in `public/data/` + localStorage fallback
- **API Calls**: Proxied through Vite to backend server

### Production Mode (GitHub Pages)
- **Frontend**: Static React build served by GitHub Pages
- **Backend**: Not available (static hosting)
- **Data Storage**: Static JSON files in `public/data/`
- **API Calls**: Fallback to static JSON files

## 📁 Project Structure

```
sand-dollar-simplicity/
├── src/                    # React frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
│   ├── data/              # JSON data files
│   ├── designs/           # Generated design mockups
│   └── screenshots/       # Website audit screenshots
├── server.js              # Backend server
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start frontend only (port 8080)
- `npm run server` - Start backend only (port 3001)
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 Data Management

### Projects
- **Location**: `public/data/projects.json`
- **Admin Access**: Upload/edit via admin dashboard
- **Fallback**: localStorage if files unavailable

### Blog Articles
- **Location**: `public/data/articles.json`
- **Admin Access**: Upload/edit via admin dashboard
- **Fallback**: localStorage if files unavailable

### Website Audits
- **Screenshots**: Saved to `public/screenshots/`
- **Designs**: Generated in `public/designs/`
- **Backend Required**: Only works with running backend server

## 🌐 Deployment

### GitHub Pages (Automatic)
- Pushes to `main` branch trigger automatic deployment
- Custom domain: `sanddollardesign.co.za`
- Static hosting (no backend server)

### Local Production Build
```bash
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3001 and 8080
lsof -ti:3001 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### Missing Data
- Check if `public/data/projects.json` and `articles.json` exist
- Data will fallback to localStorage if files are missing
- Use admin dashboard to upload new content

### API Errors
- Ensure backend server is running (`npm run server`)
- Check browser console for detailed error messages
- Website audit requires backend server

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For technical issues or questions:
- **Email**: jaco@sanddollardesign.co.za
- **Repository**: https://github.com/jacovdheever/sand-dollar-simplicity

## 🎯 Key Features

- **Project Management**: Upload and manage client projects
- **Blog System**: Create and edit blog articles
- **Website Auditing**: Analyze websites with screenshots
- **Admin Dashboard**: Full content management system
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Built for search engines

---

**Happy coding! 🚀**