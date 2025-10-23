# How to Update LinkedIn Posts with Latest Content

## Quick Update Guide

To update the LinkedIn carousel with your latest posts, follow these steps:

### 1. Get the Latest LinkedIn Post IDs

1. Go to your LinkedIn company page: https://www.linkedin.com/company/sand-dollar-design/posts/?feedView=all
2. Find your latest posts
3. Click on a post to open it
4. Look at the URL - it will look like: `https://www.linkedin.com/company/sand-dollar-design/posts/1234567890123456789`
5. Copy the number at the end (e.g., `1234567890123456789`)

### 2. Update the Post IDs in the Code

1. Open the file: `src/components/Media.tsx`
2. Find the `mediaPosts` array (around line 10)
3. Update the post IDs in the `embedCode` and `url` fields

### Example Update:

**Before:**
```javascript
{
  id: 1,
  title: "Latest LinkedIn Post",
  excerpt: "View our latest LinkedIn post directly embedded below.",
  date: "Recent",
  platform: "LinkedIn",
  isEmbedded: true,
  embedCode: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7337588956743491584?collapsed=1" height="320" width="100%" frameborder="0" allowfullscreen="" title="Embedded post" style="width: 100%; height: 100%;"></iframe>',
  url: "https://www.linkedin.com/company/sand-dollar-design/posts/7337588956743491584"
}
```

**After (with new post ID):**
```javascript
{
  id: 1,
  title: "Latest LinkedIn Post",
  excerpt: "View our latest LinkedIn post directly embedded below.",
  date: "Recent",
  platform: "LinkedIn",
  isEmbedded: true,
  embedCode: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:NEW_POST_ID_HERE?collapsed=1" height="320" width="100%" frameborder="0" allowfullscreen="" title="Embedded post" style="width: 100%; height: 100%;"></iframe>',
  url: "https://www.linkedin.com/company/sand-dollar-design/posts/NEW_POST_ID_HERE"
}
```

### 3. Update Multiple Posts

You can update up to 5 posts in the `mediaPosts` array. Make sure to:
- Update both the `embedCode` and `url` fields
- Keep the same structure
- Use the latest post IDs from your LinkedIn page

### 4. Test the Changes

1. Save the file
2. The website will automatically refresh
3. Check the LinkedIn carousel to see your latest posts

## Current Post IDs

Here are the current post IDs being used:

1. `7337588956743491584` - Latest LinkedIn Post
2. `7302988189592424449` - LinkedIn Post 2
3. `7267589521410560002` - LinkedIn Post 3
4. `7252351107513937920` - LinkedIn Post 4
5. `7279793282883162112` - LinkedIn Post 5

## Troubleshooting

### If Posts Don't Show:
1. Check that the post ID is correct
2. Make sure the post is public
3. Verify the embed code format is correct

### If Embeds Don't Load:
1. LinkedIn embeds may be blocked by some browsers
2. Try refreshing the page
3. Check browser console for errors

## Future Enhancement

In the future, we can implement automatic LinkedIn API integration to fetch the latest posts without manual updates. This would require:
1. LinkedIn Developer App setup
2. API authentication
3. Automated post fetching

For now, this manual update process ensures you always have control over which posts are displayed.
