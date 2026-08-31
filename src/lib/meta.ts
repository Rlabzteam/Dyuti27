export interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
}

export function generatePageTitle(pageTitle: string): string {
  return `${pageTitle} | DYUTI 2027 | Rajagiri College of Social Sciences`;
}
