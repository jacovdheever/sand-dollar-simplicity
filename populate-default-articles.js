// Script to populate the file storage with default blog posts
// Run this in the browser console to save default articles to file storage

const populateDefaultArticles = async () => {
  try {
    // Default blog posts data
    const defaultArticles = [
      {
        id: '1',
        title: 'Design Thinking in the Digital Age',
        excerpt: 'Exploring how design thinking principles are evolving in our increasingly digital world and how businesses can leverage these methodologies.',
        content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
        author: 'Sand Dollar Design Team',
        publishDate: '2024-01-15',
        category: 'design',
        tags: ['design-thinking', 'digital-transformation', 'ux'],
        featuredImage: '/Sand Dollar Design-1.png',
        readTime: 5,
        featured: true
      },
      {
        id: '2',
        title: 'The Future of User Experience',
        excerpt: 'Predicting trends and innovations that will shape UX design in the coming years, from AI integration to immersive experiences.',
        content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
        author: 'Sand Dollar Design Team',
        publishDate: '2024-01-10',
        category: 'ux',
        tags: ['user-experience', 'future-trends', 'innovation'],
        featuredImage: '/Sand Dollar Design-2.png',
        readTime: 7,
        featured: true
      },
      {
        id: '3',
        title: 'Technology Implementation Best Practices',
        excerpt: 'A comprehensive guide to successfully implementing new technologies in your organization without disrupting existing workflows.',
        content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
        author: 'Sand Dollar Design Team',
        publishDate: '2024-01-05',
        category: 'technology',
        tags: ['technology', 'implementation', 'best-practices'],
        featuredImage: '/Sand Dollar Design-3.png',
        readTime: 6,
        featured: false
      },
      {
        id: '4',
        title: 'Digital Strategy for Modern Businesses',
        excerpt: 'How to develop and execute a digital strategy that drives real business results and competitive advantage.',
        content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
        author: 'Sand Dollar Design Team',
        publishDate: '2024-01-01',
        category: 'strategy',
        tags: ['digital-strategy', 'business', 'growth'],
        featuredImage: '/Sand Dollar Design-4.png',
        readTime: 8,
        featured: false
      }
    ];
    
    console.log(`Saving ${defaultArticles.length} default articles to file storage...`);
    
    // Save to file storage via API
    const response = await fetch('/api/save-articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defaultArticles),
    });
    
    if (response.ok) {
      console.log('✅ Default articles saved successfully to file storage!');
      console.log('Refresh the page to see the articles.');
    } else {
      console.error('❌ Failed to save default articles:', response.statusText);
    }
  } catch (error) {
    console.error('Error during population:', error);
  }
};

// Run population
populateDefaultArticles();

