# LinkedIn Agent Setup Guide

This guide explains how to set up the LinkedIn Agent to automatically pull the latest posts from your LinkedIn company page and populate the LinkedIn carousel on your website.

## Overview

The LinkedIn Agent is a system that:
- Fetches the latest posts from your LinkedIn company page
- Automatically updates the LinkedIn carousel on your website
- Provides fallback posts when the API is unavailable
- Includes manual refresh functionality
- Auto-refreshes every 30 minutes

## Setup Instructions

### 1. LinkedIn API Setup

To use the LinkedIn API, you need to:

#### Step 1: Create a LinkedIn App
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Click "Create App"
3. Fill in the required information:
   - App name: "Sand Dollar Design Website"
   - LinkedIn Page: Select your company page
   - Privacy policy URL: Your website's privacy policy
   - App logo: Upload your company logo

#### Step 2: Request Permissions
1. In your app settings, go to "Auth" tab
2. Add the following OAuth 2.0 scopes:
   - `r_organization_social` - Read organization posts
   - `r_liteprofile` - Read basic profile information

#### Step 3: Generate Access Token
1. Go to the "Auth" tab in your LinkedIn app
2. Click "Generate a token"
3. Select the scopes you added
4. Copy the generated access token

### 2. Environment Configuration

Create a `.env` file in your project root (if it doesn't exist) and add:

```env
REACT_APP_LINKEDIN_ACCESS_TOKEN=your_access_token_here
```

**Important**: Never commit your access token to version control. Add `.env` to your `.gitignore` file.

### 3. Configuration File

The LinkedIn agent configuration is in `src/config/linkedin.ts`. You can modify:

- `companyId`: Your LinkedIn company ID (found in your company page URL)
- `maxPosts`: Maximum number of posts to fetch (default: 10)
- `updateInterval`: Auto-refresh interval in milliseconds (default: 30 minutes)
- `fallbackPosts`: Posts to show when API is unavailable

### 4. Usage

The LinkedIn Agent is automatically integrated into your website. It will:

1. **Initialize**: Load posts when the page loads
2. **Auto-refresh**: Update posts every 30 minutes
3. **Manual refresh**: Users can click the "Refresh" button
4. **Fallback**: Show static posts if API fails

## Features

### Automatic Updates
- Posts are automatically refreshed every 30 minutes
- No manual intervention required
- Graceful fallback to static posts if API fails

### Manual Refresh
- Users can manually refresh posts using the "Refresh" button
- Shows loading state during refresh
- Displays last update time

### Error Handling
- Shows error messages if API calls fail
- Falls back to static posts when needed
- Logs detailed error information for debugging

### Responsive Design
- Works on all screen sizes
- Mobile-friendly navigation
- Touch-friendly controls

## Troubleshooting

### Common Issues

#### 1. "LinkedIn access token not provided" Error
- Make sure you've added the access token to your `.env` file
- Restart your development server after adding the token
- Check that the token has the correct permissions

#### 2. "LinkedIn API error: 401" Error
- Your access token may have expired
- Generate a new access token from your LinkedIn app
- Update the token in your `.env` file

#### 3. "LinkedIn API error: 403" Error
- Your app may not have the required permissions
- Make sure you've added the `r_organization_social` scope
- Verify your app is approved for the required permissions

#### 4. Posts Not Updating
- Check the browser console for error messages
- Verify your LinkedIn company ID is correct
- Make sure your LinkedIn app has access to your company page

### Debug Mode

To enable debug logging, open your browser's developer console. The LinkedIn Agent will log:
- Initialization status
- API call results
- Error messages
- Auto-refresh activities

## API Limitations

### LinkedIn API Limits
- Rate limits apply to API calls
- Some posts may not be accessible via API
- Embedded posts require proper iframe permissions

### Fallback Strategy
- Static posts are used when API is unavailable
- Posts are cached to reduce API calls
- Manual refresh allows immediate updates

## Security Considerations

### Access Token Security
- Never expose your access token in client-side code
- Use environment variables for sensitive data
- Regularly rotate your access tokens
- Monitor API usage for unusual activity

### CORS and Embedding
- LinkedIn embeds may be blocked by some browsers
- Consider using LinkedIn's official embed codes
- Test on different browsers and devices

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your LinkedIn app configuration
3. Test with a fresh access token
4. Check LinkedIn's API documentation for updates

## Future Enhancements

Potential improvements to the LinkedIn Agent:

- **Analytics Integration**: Track post engagement metrics
- **Content Filtering**: Filter posts by type or content
- **Caching**: Implement more sophisticated caching
- **Real-time Updates**: WebSocket integration for live updates
- **Multiple Sources**: Support for other social media platforms

---

For technical support or questions about the LinkedIn Agent, please refer to the code documentation in the source files or contact your development team.
