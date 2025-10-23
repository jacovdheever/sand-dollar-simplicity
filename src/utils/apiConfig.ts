// API Configuration Utility
// Handles different base URLs for development and production

export const getApiBaseUrl = (): string => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Local development - use root path
    return '/api';
  } else {
    // Production - use repository path for GitHub Pages
    return '/sand-dollar-simplicity/api';
  }
};

export const getStaticDataUrl = (): string => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    // Local development - use root path
    return '/data';
  } else {
    // Production - use repository path for GitHub Pages
    return '/sand-dollar-simplicity/data';
  }
};

export const API_BASE_URL = getApiBaseUrl();
export const STATIC_DATA_URL = getStaticDataUrl();
