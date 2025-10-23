import mammoth from 'mammoth';

export interface ParsedArticle {
  title: string;
  content: string;
  excerpt: string;
  wordCount: number;
  images?: Array<{
    id: string;
    data: string; // base64 data URL
    alt?: string;
  }>;
}


export const parseDocxFile = async (file: File): Promise<ParsedArticle> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        
        // Store images for later use
        const images: Array<{ id: string; data: string; alt?: string }> = [];
        
        // Configure mammoth to convert images to base64
        const options = {
          arrayBuffer,
          convertImage: mammoth.images.imgElement(function(image: Record<string, unknown>) {
            return image.read("base64").then(function(imageBuffer: string) {
              const imageId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
              const dataUrl = `data:${image.contentType};base64,${imageBuffer}`;
              
              // Store image data
              images.push({
                id: imageId,
                data: dataUrl,
                alt: image.altText || `Image ${images.length + 1}`
              });
              
              // Return img element with data URL
              return {
                src: dataUrl,
                alt: image.altText || `Image ${images.length + 1}`
              };
            });
          })
        };
        
        // Convert to HTML to preserve formatting and images
        const result = await mammoth.convertToHtml(options);
        const htmlContent = result.value;
        
        // Also extract plain text for title and excerpt
        const textResult = await mammoth.extractRawText({ arrayBuffer });
        const plainText = textResult.value;
        
        // Extract title (first line or first sentence)
        const lines = plainText.split('\n').filter(line => line.trim().length > 0);
        const title = lines[0]?.trim() || 'Untitled Article';
        
        // Create excerpt (max 50 words)
        const words = plainText.split(/\s+/).filter(word => word.length > 0);
        let excerpt = '';
        
        if (words.length <= 50) {
          excerpt = plainText.trim();
        } else {
          // Take first 50 words and add ellipsis
          excerpt = words.slice(0, 50).join(' ') + '...';
        }
        
        // Clean up any trailing punctuation issues
        excerpt = excerpt.replace(/\s+\.\.\.$/, '...');
        
        // Clean up HTML content
        const content = htmlContent
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
        
        // Calculate word count from plain text
        const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
        
        resolve({
          title,
          content,
          excerpt,
          wordCount,
          images: images.length > 0 ? images : undefined
        });
      } catch (error) {
        reject(new Error('Failed to parse .docx file: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};


export const estimateReadingTime = (wordCount: number): number => {
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export const parseArticleFile = async (file: File): Promise<ParsedArticle> => {
  const fileExtension = file.name.toLowerCase().split('.').pop();
  
  switch (fileExtension) {
    case 'docx':
      return parseDocxFile(file);
    default:
      throw new Error(`Unsupported file type: ${fileExtension}. Please upload a .docx file.`);
  }
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
