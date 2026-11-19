/** True when publishDate is today or earlier (UTC calendar day). */
export function isArticlePublished(publishDate: string, now: Date = new Date()): boolean {
  if (!publishDate) return true;
  const d = new Date(publishDate);
  if (Number.isNaN(d.getTime())) return true;
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const pubUtc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return pubUtc <= todayUtc;
}