# Blog Setup Guide

## Overview
The blog has been set up with a dynamic structure that makes it easy to add your actual articles. Here's how to integrate your content:

## File Structure
```
src/
├── types/blog.ts              # TypeScript interfaces for blog posts
├── data/blogPosts.ts          # Your blog posts data (REPLACE THIS)
├── components/
│   ├── BlogPost.tsx           # Individual blog post component
│   ├── BlogFilters.tsx        # Search and filter functionality
│   └── BlogPostModal.tsx      # Full article modal view
└── pages/Blog.tsx             # Main blog page
```

## How to Add Your Articles

### 1. Replace the Sample Data
Edit `src/data/blogPosts.ts` and replace the sample posts with your actual articles:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'unique-id-1',
    title: 'Your Article Title',
    excerpt: 'Brief description of your article...',
    content: 'Full article content goes here...',
    author: 'Author Name',
    publishDate: '2024-01-15', // YYYY-MM-DD format
    category: 'design', // or 'ux', 'technology', 'strategy'
    tags: ['tag1', 'tag2', 'tag3'],
    featuredImage: '/path/to/image.jpg', // Optional
    readTime: 5, // Estimated reading time in minutes
    featured: true // Set to true for featured articles
  },
  // Add more articles...
];
```

### 2. Article Structure
Each blog post needs:
- **id**: Unique identifier
- **title**: Article title
- **excerpt**: Short description (2-3 sentences)
- **content**: Full article text
- **author**: Author name
- **publishDate**: Date in YYYY-MM-DD format
- **category**: One of: 'design', 'ux', 'technology', 'strategy'
- **tags**: Array of relevant tags
- **featuredImage**: Optional image path
- **readTime**: Estimated reading time in minutes
- **featured**: Boolean for featured articles

### 3. Categories
The blog supports 4 categories:
- **Design**: Design thinking, visual design, creative processes
- **UX**: User experience, usability, user-centered design
- **Technology**: Technical implementation, tools, development
- **Strategy**: Digital strategy, business planning, growth

### 4. Features Included
- ✅ **Search**: Search by title, content, or tags
- ✅ **Filtering**: Filter by category
- ✅ **Featured Posts**: Highlight important articles
- ✅ **Responsive Design**: Works on all devices
- ✅ **Modal View**: Full article view in modal
- ✅ **Tags**: Categorize articles with tags
- ✅ **Reading Time**: Estimated reading time
- ✅ **Author Info**: Author and publish date
- ✅ **Smooth Animations**: Scroll reveal effects

## Adding Images
1. Place images in the `public/` folder
2. Reference them with `/filename.jpg` in the `featuredImage` field
3. Recommended size: 800x400px for featured images

## Example Article
```typescript
{
  id: 'design-thinking-guide',
  title: 'Complete Guide to Design Thinking',
  excerpt: 'Learn how to implement design thinking methodologies in your organization to drive innovation and solve complex problems.',
  content: `Design thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success.

## What is Design Thinking?

Design thinking is a methodology used to solve complex problems and find desirable solutions for clients. It draws upon logic, imagination, intuition, and systemic reasoning to explore possibilities of what could be and to create desired outcomes that benefit the end user.

## The Five Stages of Design Thinking

1. **Empathize** - Understanding the human needs involved
2. **Define** - Re-framing and defining the problem in human-centric ways
3. **Ideate** - Creating many ideas in ideation sessions
4. **Prototype** - Adopting a hands-on approach in prototyping
5. **Test** - Developing a problem/solution fit

## Benefits of Design Thinking

- Encourages innovation and creativity
- Focuses on user needs and experiences
- Reduces risk of launching new products or services
- Promotes collaboration and teamwork
- Leads to better problem-solving

## Conclusion

Design thinking is not just a process but a mindset that can transform how organizations approach challenges and opportunities.`,
  author: 'Sand Dollar Design Team',
  publishDate: '2024-01-15',
  category: 'design',
  tags: ['design-thinking', 'innovation', 'methodology', 'ux'],
  featuredImage: '/design-thinking-article.jpg',
  readTime: 8,
  featured: true
}
```

## Next Steps
1. Download your articles from SharePoint
2. Format them according to the structure above
3. Replace the sample data in `blogPosts.ts`
4. Test the blog functionality
5. Add any additional categories if needed

The blog is now ready to showcase your professional content!
