interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png';
}

/**
 * Compresses an image file to reduce its size while maintaining acceptable quality
 * @param file The image file to compress
 * @param options Compression options
 * @returns Promise resolving to the compressed image as a data URL
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<string> => {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.6,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to specified format with reduced quality
        const compressedDataUrl = canvas.toDataURL(format, quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Estimates the size of a data URL in bytes
 * @param dataUrl The data URL to measure
 * @returns The estimated size in bytes
 */
export const getDataUrlSize = (dataUrl: string): number => {
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64 = dataUrl.split(',')[1];
  // Calculate the size of the base64 string
  return Math.ceil((base64.length * 3) / 4);
};

/**
 * Checks if a data URL is likely to exceed localStorage quota
 * @param dataUrl The data URL to check
 * @returns boolean indicating if the data URL is too large
 */
export const isDataUrlTooLarge = (dataUrl: string): boolean => {
  const size = getDataUrlSize(dataUrl);
  // localStorage typically has a 5-10MB limit, we'll use 4MB as a safe threshold
  return size > 4 * 1024 * 1024;
}; 