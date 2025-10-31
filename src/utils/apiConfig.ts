// API Configuration Utility
// Handles different base URLs for development and production

export const getApiBaseUrl = (): string => {
  // Use root path for both development and production (custom domain)
    return '/api';
};

export const getStaticDataUrl = (): string => {
  // Use root path for both development and production (custom domain)
    return '/data';
};

export const API_BASE_URL = getApiBaseUrl();
export const STATIC_DATA_URL = getStaticDataUrl();
