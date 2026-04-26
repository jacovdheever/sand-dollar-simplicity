import { getAssetPath } from '@/lib/utils';

/** Resolve image files copied to public/images/pages (handles spaces in filenames). */
export function pageImageSrc(filename: string): string {
  const safe = filename.split('/').map((p) => encodeURIComponent(p)).join('/');
  return getAssetPath(`images/pages/${safe}`);
}
