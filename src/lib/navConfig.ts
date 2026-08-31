export interface NavigationItem {
  label: string;
  path: string;
  exact?: boolean;
  description?: string;
}

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/', exact: true, description: 'Conference Overview & Key Highlights' },
  { label: 'Rajagiri', path: '/rajagiri', description: 'Host Institution Legacy & Accreditation' },
  { label: 'Call for Papers', path: '/call_for_papers', description: 'Tracks, Guidelines & CMT Submission' },
  { label: 'Attractions', path: '/attractions', description: 'Explore Kochi Tourism & Cultural Heritage' },
  { label: 'Travel', path: '/travel', description: 'Airport, Metro & Rail Connectivity Guide' },
  { label: 'Gallery', path: '/gallery', description: 'Historic DYUTI Conference Archive' },
  { label: 'Accommodation', path: '/accomodation', description: 'Hotels & Stay Near Rajagiri Campus' },
];
