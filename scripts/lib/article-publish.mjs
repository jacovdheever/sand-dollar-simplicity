/** @returns {boolean} true when publishDate is today or earlier (UTC calendar day). */
export function isPublishedByDate(publishDate, now = new Date()) {
  if (!publishDate) return true;
  const d = new Date(publishDate);
  if (Number.isNaN(d.getTime())) return true;
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const pubUtc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return pubUtc <= todayUtc;
}

export function generateSlug(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}