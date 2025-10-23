// Migration script to move articles from localStorage to file storage
// Run this in the browser console to migrate existing articles

const migrateArticles = async () => {
  try {
    // Get articles from localStorage
    const storedArticles = localStorage.getItem('sanddollar_blog_articles');
    if (storedArticles) {
      const articles = JSON.parse(storedArticles);
      console.log(`Found ${articles.length} articles in localStorage`);
      
      // Save to file storage via API
      const response = await fetch('/api/save-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articles),
      });
      
      if (response.ok) {
        console.log('✅ Articles migrated successfully to file storage!');
        console.log('You can now clear localStorage if you want:');
        console.log('localStorage.removeItem("sanddollar_blog_articles");');
      } else {
        console.error('❌ Failed to migrate articles:', response.statusText);
      }
    } else {
      console.log('No articles found in localStorage');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  }
};

// Run migration
migrateArticles();

