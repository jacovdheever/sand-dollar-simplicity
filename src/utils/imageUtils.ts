/**
 * Image utility functions for handling image uploads with quality preservation
 */

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Convert a File to a high-quality base64 data URL
 * This preserves the original image quality without compression
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(`✅ Image processed: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) - Quality preserved`);
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Compress and resize an image while maintaining quality
 * This is useful for reducing file size without significant quality loss
 */
export const compressImage = (
  file: File, 
  options: ImageProcessingOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.9,
      format = 'jpeg'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      const mimeType = `image/${format}`;
      const dataURL = canvas.toDataURL(mimeType, quality);
      resolve(dataURL);
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Get image dimensions from a file
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Check if an image file is too large and needs compression
 */
export const shouldCompressImage = (file: File, maxSizeKB: number = 2000): boolean => {
  return file.size > maxSizeKB * 1024;
};

/**
 * Process an image file with quality preservation
 * Returns the best quality version based on file size
 */
export const processImageForUpload = async (
  file: File,
  options: ImageProcessingOptions = {}
): Promise<string> => {
  // For high-quality images, we want to preserve quality
  // Only compress if the file is very large (>5MB)
  const shouldCompress = file.size > 5 * 1024 * 1024;
  
  if (shouldCompress) {
    console.log('Large image detected, applying compression to reduce file size');
    return await compressImage(file, { ...options, quality: 0.95 });
  } else {
    console.log('Preserving original image quality');
    return await fileToDataURL(file);
  }
};

/**
 * Process an image with maximum quality preservation
 * This is the recommended function for project hero images
 */
export const processImageForProjectHero = async (file: File): Promise<string> => {
  // For project hero images, we want maximum quality
  // Only apply minimal compression for very large files (>10MB)
  const shouldCompress = file.size > 10 * 1024 * 1024;
  
  if (shouldCompress) {
    console.log('Very large hero image detected, applying minimal compression');
    return await compressImage(file, { 
      maxWidth: 2560, 
      maxHeight: 1440, 
      quality: 0.98,
      format: 'jpeg'
    });
  } else {
    console.log('Preserving maximum quality for hero image');
    return await fileToDataURL(file);
  }
};
