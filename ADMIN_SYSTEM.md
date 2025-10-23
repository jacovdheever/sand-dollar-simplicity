# Admin System Documentation

## 🎯 Overview
The admin system allows authorized users to upload, manage, and publish blog articles directly through a web interface. It supports .docx file uploads with automatic parsing and content extraction.

## 🔐 Authentication
- **Admin Credentials:**
  - Email: `jaco@sanddollardesign.co.za`
  - Password: `SandDollarDesign@2025!`
- **Access:** Navigate to `/sanddollar-admin` or click the settings icon in the navbar (when logged in)

## 📁 Features

### 1. **Article Upload**
- **Drag & Drop Interface:** Upload .docx files directly
- **Automatic Parsing:** Extracts title, content, and metadata
- **Smart Excerpt Generation:** Creates excerpts from first 2 sentences
- **Reading Time Calculation:** Estimates reading time based on word count
- **Category Assignment:** Choose from Design, UX, Technology, Strategy
- **Tag Management:** Add comma-separated tags
- **Featured Articles:** Mark articles as featured
- **Image Support:** Optional featured image URLs

### 2. **Article Management**
- **Dashboard View:** See all articles in a table format
- **Statistics:** Total articles, featured count, monthly count, categories
- **Quick Actions:** View, Edit, Delete articles
- **Search & Filter:** Find articles by title, content, or tags
- **Status Tracking:** See which articles are featured vs. published

### 3. **Content Processing**
- **Word Document Support:** Handles .docx files up to 10MB
- **Text Extraction:** Converts Word documents to clean HTML/text
- **Metadata Extraction:** Automatically extracts titles and creates excerpts
- **Slug Generation:** Creates URL-friendly IDs for articles

## 🚀 How to Use

### Uploading Articles
1. **Login** to the admin system at `/sanddollar-admin`
2. **Click "Upload New Article"**
3. **Drag & drop** your .docx file or click to select
4. **Review** the automatically extracted content
5. **Fill in** additional details (author, category, tags, etc.)
6. **Click "Create Article"** to publish

### Managing Articles
1. **View Dashboard** to see all articles
2. **Use Actions** to view, edit, or delete articles
3. **Check Statistics** for content insights
4. **Filter/Search** to find specific articles

## 📊 Data Storage
- **Local Storage:** Articles are stored in browser localStorage
- **Persistence:** Articles persist between sessions
- **Backup:** Consider exporting articles for backup

## 🔧 Technical Details

### File Processing
- **Library:** Uses `mammoth` for .docx parsing
- **Format Support:** Microsoft Word .docx files
- **Size Limit:** 10MB maximum file size
- **Error Handling:** Graceful error messages for invalid files

### Security
- **Simple Authentication:** Basic email/password system
- **Session Management:** Uses localStorage for persistence
- **Admin Only:** Features only accessible to authenticated admins

### Integration
- **Blog Integration:** Articles automatically appear on the blog page
- **Real-time Updates:** Changes reflect immediately
- **Responsive Design:** Works on all device sizes

## 🎨 UI Components

### AdminLogin
- Clean, professional login interface
- Password visibility toggle
- Error handling and loading states
- Demo credentials display

### ArticleUpload
- Drag & drop file upload
- Real-time file processing
- Form validation
- Preview of extracted content

### AdminDashboard
- Statistics overview
- Article management table
- Quick actions and filters
- Responsive design

## 🔄 Workflow

1. **Author writes** article in Microsoft Word
2. **Admin uploads** .docx file through admin interface
3. **System parses** content and extracts metadata
4. **Admin reviews** and adjusts details
5. **Article publishes** to blog automatically
6. **Visitors read** on the public blog page

## 🚨 Important Notes

- **Backup:** Always backup your articles
- **File Format:** Only .docx files are supported
- **Size Limits:** Keep files under 10MB
- **Content Quality:** Review auto-extracted content before publishing
- **Security:** Change default admin credentials in production

## 🔮 Future Enhancements

- **Rich Text Editor:** In-browser article editing
- **Image Upload:** Direct image upload support
- **Bulk Operations:** Upload multiple articles at once
- **Advanced Analytics:** Reading statistics and engagement metrics
- **User Management:** Multiple admin users
- **API Integration:** Connect to external CMS or database

## 📞 Support

For technical issues or questions about the admin system, contact the development team or refer to the component documentation in the codebase.
