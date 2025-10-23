# 🚀 Sand Dollar Design - Colleague Setup Guide

## Quick Start

Your colleague can now access the complete Sand Dollar Design website with all projects, blog posts, and backend functionality.

### 📋 What's Included

✅ **All Projects**: 51MB of uploaded projects in `public/data/projects.json`  
✅ **All Blog Posts**: 7MB of articles in `public/data/articles.json`  
✅ **Generated Designs**: Interactive HTML design mockups in `public/designs/`  
✅ **Audit Screenshots**: Website audit screenshots in `public/screenshots/`  
✅ **Complete Backend**: Full server functionality with website auditing  
✅ **Admin Dashboard**: Complete admin system for content management  

### 🛠️ Setup Instructions

1. **Clone the Test Branch**
   ```bash
   git clone https://github.com/jacovdheever/sand-dollar-simplicity.git
   cd sand-dollar-simplicity
   git checkout Test
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev:full
   ```
   This starts both the frontend (port 8080) and backend (port 3001)

4. **Access the Website**
   - **Frontend**: http://localhost:8080
   - **Admin Dashboard**: http://localhost:8080/sanddollar-admin
   - **Backend API**: http://localhost:3001

### 🔐 Admin Access

**Admin Credentials:**
- Email: `jaco@sanddollardesign.co.za`
- Password: `SandDollarDesign@2025!`

### 📁 Key Directories

- `public/data/` - All projects and articles data
- `public/designs/` - Generated website design mockups
- `public/screenshots/` - Website audit screenshots
- `src/components/` - React components
- `server.js` - Backend server with website auditing

### 🎯 Features Available

1. **Website Auditing**: Analyze any website and generate improvement recommendations
2. **Design Generation**: Create interactive HTML mockups of improved designs
3. **Project Management**: View and manage all uploaded projects
4. **Blog Management**: View and manage all blog posts
5. **Admin Dashboard**: Complete content management system

### 🔧 Troubleshooting

If you encounter any issues:

1. **Port Conflicts**: Make sure ports 8080 and 3001 are available
2. **Dependencies**: Run `npm install` to ensure all packages are installed
3. **Data Loading**: The system automatically loads from `public/data/` files
4. **Backend Issues**: Check that `server.js` is running on port 3001

### 📞 Support

All functionality is identical to the local development environment. The colleague will have access to:
- Complete website with all uploaded content
- Full backend functionality
- Admin dashboard
- Website auditing capabilities
- Design generation features

---

**Note**: This is the complete Test branch deployment with all local saves, projects, blog posts, and backend functionality preserved.
